import { GoogleGenAI } from '@google/genai';
import { Chat, Message } from '../models/chat.model';
import { User } from '../models/user.model';
import { Slot } from '../models/slot.model';
import { Appointment } from '../models/appointment.model';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const MODEL_NAME = 'gemini-2.0-flash';

export const generateAIResponse = async (chatHistory: Chat[], slots: Slot[], appointments: Appointment[], user?: User | null): Promise<Message> => {
    try {

        const messages = chatHistory.map(chat => ({
            role: chat.userType === 'user' ? 'user' : 'model',
            parts: [{ text: chat.message.content }]
        }));

        const response = await genAI.models.generateContent({
            model: MODEL_NAME,
            contents: messages,
            config: {
                temperature: 0.7,
                maxOutputTokens: 8000,
                systemInstruction: getInstruction(slots, appointments, user),
            }
        });

        const responseText = response.text || '';

        // Try extracting JSON part from mixed response text
        let parsedResponse: any = {};

        try {
            console.log("Response======>:", response);
            console.log("Response Test======>:", response.text);
            parsedResponse = extractFirstJSON(response.text);
            console.log("Parsed response:", parsedResponse);
        } catch (error) {
            console.error("Failed to parse JSON:", error);
            parsedResponse = { content: responseText };
        }

        return parsedResponse
    } catch (error) {
        console.error('❌ Error generating AI response:', error);
        throw new Error('Failed to generate AI response');
    }
};

const extractFirstJSON = (responseText?: string): any => {
    if (!responseText) return { content: '' };

    responseText = responseText.trim();
    let input = '';

    if (responseText.includes('```ts')) {
        input = responseText.split('```ts')[1] || '';
    } else if (responseText.includes('```json')) {
        input = responseText.split('```json')[1] || '';
    } else if (responseText.includes('```')) {
        input = responseText.split('```')[1] || '';
    } else {
        return {
            content: responseText.trim(),
            intent: 'Unknown',
        };
    }

    input = input.replace(/```/g, '').trim();

    try {
        // Some models return a JSON string as a string literal. Let's check and fix that.
        if (input.startsWith('"') || input.startsWith("'")) {
            // Try to remove the surrounding quotes and parse again
            const unquoted = input
                .replace(/^['"]/, '')
                .replace(/['"]$/, '')
                .replace(/\\"/g, '"') // Unescape escaped quotes
                .replace(/\\n/g, '') // Remove newlines
                .trim();

            console.log('Unquoted input:', unquoted);
            return JSON.parse(unquoted);
        }


        try {
            const fixed = input
                .replace(/(\w+):/g, '"$1":') // wrap unquoted keys
                .replace(/'/g, '"');         // replace single quotes with double quotes

            const parsed = JSON.parse(fixed);
            console.log(parsed);
            return parsed;
        } catch (error) {
            console.log("Input======>:", input);
            try {
                const fixed = input
                    .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":') // quote unquoted keys
                    .replace(/‘|’/g, "'") // replace curly quotes with straight single quotes
                    .replace(/“|”/g, '"') // replace curly double quotes
                    .replace(/'/g, '"');  // convert all single quotes to double quotes

                const parsed = JSON.parse(fixed);
                console.log(parsed);
                return parsed;
            } catch (error) {
                console.error("Invalid JSON:", error);
                return JSON.parse(input);
            }
        }
    } catch (err) {
        console.error("Failed to parse structured response:", err);
        return {
            content: input.trim(),
            intent: 'Unknown',
        };
    }
}


export const getInstruction = (slots: Slot[], appointments: Appointment[], user?: User | null): string => {
    const relativeDates = getRelativeDateStrings().join("\n");

    return `
      /** 
       * Role: You are a friendly, professional dental assistant chatbot specialized in managing patient queries, bookings, and support.
       * 
       * Goals:
       * 1. Assist patients with appointment bookings, rescheduling, or cancellations.
       * 2. Answer general inquiries like insurance, hours, or location.
       * 3. Detect and respond softly to any inappropriate or explicit content.
       * 4. Handle complex scenarios like family bookings and multiple appointment management.
       * 5. Localize the tone based on context (e.g., emergency vs. general inquiry).
       *
       * User Info:
       * - Name: ${user?.name}
       * - Email: ${user?.email}
       * - ID: ${user?._id?.toString()}
       * 
       * Input:
       * - A list of available \`Slot[]\`: ${JSON.stringify(slots, null, 2)}
       * - A list of existing \`Appointment[]\`: ${JSON.stringify(appointments, null, 2)}
       * 
        * Relative Dates:
        ${relativeDates}
        * Use these for interpreting user input like "tomorrow", "next Thursday", etc.
        * 
       * Output:
       * A single \`Message\` object:
       * 
       * \`\`\`ts
      export interface Message {
        content: string;
        intent?: string;
        data?: {
          appointment?: {
            appointmentType: AppointmentType;
            status: AppointmentStatus;
            patients: Array<{
              slotId: string;
              fullName: string;
              phoneNumber: string;
              dob: string;
            }>;
          };
          cancelledAppointmentId?: string;
        };
      }
      \`\`\`
      
       * Instructions:
       * 1. Understand Patient Intent:
       *   - Book, cancel, or reschedule appointment
       *   - Emergency booking
       *   - Family scheduling (multiple patients)
       *   - FAQs (hours, insurance, location, payment)
       *   - Inappropriate or unclear content → respond politely or ask for clarification
       *
       * 2. Appointment Logic:
       *   - Use available slots where \`isBooked: false\`
       *   - If cancelling, and no appointment exists → respond clearly
       *   - If cancelling and multiple appointments → ask for clarification
       *   - If valid appointment ID inferred → cancel it and respond with confirmation
       *   - For rescheduling, ask for preferred time if not provided
       *
       * 3. Tone & Localized Response:
       *   - Be friendly and natural
       *   - Adapt tone: calm for emergencies, casual for general queries
       *   - Offer alternate times if none available
       *
       * 4. FAQ Examples:
       *   - Hours: “We’re open 8 AM to 6 PM, Monday to Saturday.”
       *   - Location: “We’re located at [Your Clinic Address Here].”
       *   - Insurance: “We accept all major dental insurance providers.”
       *   - No insurance: “We offer self-pay options and membership plans.”
       *
       * 5. Safety:
       *   - If user says anything inappropriate or confusing, say: “Let’s keep things professional. How can I assist with your dental care today?”
       *
       * 6. Example Outputs:
       * - Appointment Booking:
       *   {
       *     content: "Hi Alex, I’ve scheduled your cleaning for 12th April at 10:00 AM. Let me know if you'd like to change it.",
       *     intent: "AppointmentBooking",
       *     data: {
       *       appointment: {
       *         appointmentType: AppointmentType.Cleaning,
       *         status: AppointmentStatus.Scheduled,
       *         patients: [
       *           {
       *             slotId: "6612f9f0b3a9452f7c123456",
       *             fullName: "Alex Harper",
       *             phoneNumber: "555-987-6543",
       *             dob: "1987-05-21"
       *           }
       *         ]
       *       }
       *     }
       *   }
       *
       * - Appointment Cancel Success:
       *   {
       *     content: "Your appointment on 10th April at 3:00 PM has been cancelled successfully. Let us know if you’d like to rebook.",
       *     intent: "CancelledSuccess",
       *     data: {
       *       cancelledAppointmentId: "6613e32f0297ab2fcd123456"
       *     }
       *   }
       *
       * - No appointments:
       *   {
       *     content: "It looks like you don’t have any appointments scheduled right now. Would you like me to help you book one?",
       *     intent: "AppointmentCancel"
       *   }
       *
       * - Multiple appointments found:
       *   {
       *     content: "You have more than one appointment. Could you please tell me which one you'd like to cancel?",
       *     intent: "AppointmentCancel"
       *   }
       */
    `;
};

const pad = (n: number) => (n < 10 ? `0${n}` : n);

const formatDateFull = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const formatDDMMYYYY = (date: Date): string => {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};

const getRelativeDateStrings = (): string[] => {
    const today = new Date();
    const results: string[] = [];

    for (let i = -5; i <= 10; i++) {
        const target = new Date(today);
        target.setDate(today.getDate() + i);

        const label =
            i === -1
                ? "yesterday"
                : i === 0
                    ? "today"
                    : i === 1
                        ? "tomorrow"
                        : i < 0
                            ? `${Math.abs(i)} day${Math.abs(i) > 1 ? "s" : ""} ago`
                            : `in ${i} day${i > 1 ? "s" : ""}`;

        results.push(`${label} (${formatDateFull(target)} | ${formatDDMMYYYY(target)})`);
    }

    return results;
};




