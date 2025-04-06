import { CacheKey } from "../enum/cache-key.enum"
import { Session } from "../model/session.model"
import { SignInRes } from "../response/auth.response"

const getSession = (): Session => {
    const session = JSON.parse(localStorage.getItem(CacheKey.USER_SESSION) || '{}') as Session
    return session
}

export const SecurityManager = {

    loggedIn: (): boolean => {
        let session = getSession()

        return session.isLoggedIn
    },

    setSession(session: Session) {
        localStorage.setItem(CacheKey.USER_SESSION, JSON.stringify(session))
    },

    async setSignInResponse(signInRes: SignInRes) {

        this.setSession({
            userId: signInRes.user.id,
            name: signInRes.user.name,
            isLoggedIn: true,
            authToken: signInRes.token,
            email: signInRes.user.email,
            verified: true
        } as Session);
    },

    updateAuthToken(authToken: string) {
        const session = getSession()
        session.authToken = authToken
        localStorage.setItem(CacheKey.USER_SESSION, JSON.stringify(session))
    },

    getAuthToken: (): string => {
        let session = getSession()
        return session.authToken
    },

    getUid: (): string => {
        let session = getSession()

        return session.userId
    },

    getName: (): string => {
        let session = getSession()

        return session.name
    },

    logout() {
        try {
            localStorage.removeItem(CacheKey.USER_SESSION)
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    },
}