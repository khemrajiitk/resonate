export interface Session {
    userId: string
    name: string
    isLoggedIn: boolean
    authToken: string
    email: string
}