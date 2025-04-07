
import { CreateChatRequest } from "../request/chat.request"
import { ChatResponse } from "../response/chat.response"
import httpClient from "../util/http-client"

export const ChatService = {
    askQuestion: async (createChatRequest: CreateChatRequest): Promise<(ChatResponse | any)[]> => {
        let data
        let err
        try {
            const res = await httpClient.post(`/chats`, createChatRequest)
            data = res.data
        } catch (error: any) {
            err = error
        }
        return [data, err?.response]
    },
    getChats: async (userId: string): Promise<(ChatResponse | any)[]> => {
        let data
        let err
        try {
            const res = await httpClient.get(`/chats/${userId}`)
            data = res.data
        } catch (error: any) {
            err = error
        }
        return [data, err?.response]
    }
}