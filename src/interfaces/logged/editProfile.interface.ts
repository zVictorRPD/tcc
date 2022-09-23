export interface IEditProfile {
    avatar: File | null;
    name: string;
    password: string;
    confirmationPassword: string;
}

export interface IEditProfileValidation {
    avatar: boolean;
    name: boolean;
    password: boolean;
    confirmationPassword: boolean;
}