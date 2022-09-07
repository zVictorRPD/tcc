export const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validatePassword = (password: string) => {
    return password.length >= 8;
};

export const validateConfirmationPassword = (password: string, confirmationPassword: string) => {
    return password === confirmationPassword;
};

export const validateName = (name: string) => {
    //regex to validate name
    const re = /^[a-zA-Z ]{2,30}$/;
    return re.test(name);
};
