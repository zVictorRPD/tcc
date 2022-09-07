export interface ILoginCampsValidation {
    email: boolean;
    password: boolean;
}

export interface ISignupCampsValidation {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmationPassword: boolean;
}

export interface ISignupCamps {
    avatar: File | null;
    name: string;
    email: string | string[];
    password: string;
    confirmationPassword: string;
}

export interface IForgotCamps{
    email: string;
    token: string;
    password: string;
    confirmationPassword: string;
}

export interface IForgotCampsValidation{
    email: boolean;
    token: boolean;
    password: boolean;
    confirmationPassword: boolean;
}