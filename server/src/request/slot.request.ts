import { z } from 'zod';

const TIME_FORMAT_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;
const DATE_FORMAT_REGEX = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;  // dd/mm/yyyy format

export const slotTimeSchema = z.string().regex(TIME_FORMAT_REGEX, {
  message: 'Time must be in HH:mm format',
});

export const slotDateSchema = z.string().regex(DATE_FORMAT_REGEX, {
  message: 'Date must be in dd/mm/yyyy format',
});

// Helper function to get the day of the week
const getDayOfWeek = (dateStr: string): string => {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day); // month - 1 because months are 0-based in JavaScript
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek[date.getDay()];  // Get day of the week
};

// Helper function to validate if time starts at 00 or 30 minutes
const isStartTimeValid = (time: string): boolean => {
  const [hours, minutes] = time.split(':').map(Number);
  return minutes === 0 || minutes === 30;  // Valid if minutes are 00 or 30
};

export const createSlotSchema = z
  .object({
    date: slotDateSchema,
    startTime: slotTimeSchema.refine((time) => isStartTimeValid(time), {
      message: 'Start time must be at :00 or :30 minute of any hour',
    }),
    endTime: slotTimeSchema,
  })
  .refine((data) => {
    const [startHour, startMin] = data.startTime.split(':').map(Number);
    const [endHour, endMin] = data.endTime.split(':').map(Number);

    const start = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    const isWithinWorkingHours = start >= 8 * 60 && end <= 18 * 60;
    const isThirtyMinuteSlot = end - start === 30;

    return isWithinWorkingHours && isThirtyMinuteSlot;
  }, {
    message: 'Slot must be within 08:00 - 18:00 and exactly 30 minutes long',
    path: ['endTime'], // To attach error to endTime field
  })
  .transform((data) => ({
    ...data,
    day: getDayOfWeek(data.date),  // Automatically set the day based on the date
  }));

export const updateSlotSchema = z.object({
  startTime: slotTimeSchema.optional(),
  endTime: slotTimeSchema.optional(),
  isBooked: z.boolean().optional(),
  date: slotDateSchema.optional(),
});

// Now, the CreateSlotRequest includes `day`
export type CreateSlotRequest = z.infer<typeof createSlotSchema>;
export type UpdateSlotRequest = z.infer<typeof updateSlotSchema>;
