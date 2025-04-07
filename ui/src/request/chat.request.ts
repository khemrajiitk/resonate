export interface CreateChatRequest {
    user: {
      id: string;
      name: string;
    };
    userType: 'AI' | 'user';
    message: {
      content: string;
      data: Record<string, any>; // Use specific types instead of `any` if the structure of `data` is known
    };
  }