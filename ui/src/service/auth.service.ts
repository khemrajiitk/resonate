
import { SignInReq, SignUpReq } from "../request/auth.request"
import { SignInRes } from "../response/auth.response"
import httpClient from "../util/http-client"

export const AuthService = {
    signUp: async (signUpReq: SignUpReq): Promise<(SignInRes | any)[]> => {
        let data
        let err
        try {
            const res = await httpClient.post(`/auth/signup`, signUpReq)
            data = res.data
        } catch (error: any) {
            err = error
        }
        return [data, err?.response]
    },
    signIn: async (signInReq: SignInReq): Promise<(SignInRes | any)[]> => {
        let data
        let err
        try {
            const res = await httpClient.post(`/auth/login`, signInReq)
            data = res.data
        } catch (error: any) {
            err = error
        }
        return [data, err?.response]
    }
}