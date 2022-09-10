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
    const re = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    return re.test(name);
};

export const validateFile = (file: File) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    return allowedTypes.includes(file.type);
}

//check if the file is less than 2MB
export const validateFileSize = (file: File) => {
    return file.size <= 2097152;
}