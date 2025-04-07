export interface Chat {
    _id?: string;
    user: MiniUser;
    userType: 'AI' | 'user';
    message: Message;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Message {
    content: string;
    intent?: string;
    data?: {
        appointment: {
            appointmentType: string,
            status: string,
            patients: [
                {
                    slotId: string,
                    fullName: string,
                    phoneNumber: string,
                    dob: string,
                }
            ],
        }
    }
}

export interface MiniUser {
    id: string;
    name: string;
}

export interface ChatResponse {
    chats: Chat[]
}
