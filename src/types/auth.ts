export interface ILogInPayload {
    username: string,
    password: string,
}

export interface ISignUpPayload {
    name: string;
    username: string;
    password: string;
}

export interface ILogInResponse {
    access_token:string,
    refresh_token:string,
    token_type:string
}

export interface ISignUpResponse {
    id: string;
    name: string;
    username: string;
    // password: string;
    // novel_lists: string[];
    adminType: number;
}

export interface IUserInfoResponse {
    id: string;
    name: string;
    username: string;
    admin_type: number; // 0: normal user, 1: web admin, 2: system admin
    avatar: string;
}


