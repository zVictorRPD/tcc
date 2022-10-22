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

//check if the file is less than 1MB
export const validateFileSize = (file: File) => {
    return file.size <= 1048576;
}

export const validateSubjectCode = (code: string) => {
    //check if the code is 2 letters and 3 numbers
    const re = /^[a-zA-Z]{2}[0-9]{3}$/;
    return re.test(code);
};