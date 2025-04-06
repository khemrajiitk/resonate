export interface SignUpReq {
    email: string
    password: string
    name: string
    otp: string
    dob: string
}

export interface SignInReq {
    email: string
    password: string
}