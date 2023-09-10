export interface IAuth {
    token: string
    setToken: (token: string) => void
    decodedToken: any
    setDecodedToken: (decodedToken: any) => void
}

export interface IsignIn {
    email: string,
    password: string,
}
export interface ILogClient extends IsignIn {
    confirm_password: string
}

export interface ISignUp extends IsignIn {
    username: string,
    roles: string
}
export interface ISignClient extends ISignUp {
    confirm_password: string
}


export interface IGetUsers {
    _id: string,
    roles: string,
    username: string,
    email: string
}

export interface IUser extends IGetUsers {};