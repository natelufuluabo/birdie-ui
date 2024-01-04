export const validateEmail = (text) => {
    if (text === '') return false;
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(text)) return true;
    return false;
};

export const validatePassword = (text) => {
    // Password must be at least 8 characters, max 14 characters, with a mix of uppercase and lowercase letters, and at least 1 number
    if (text === '') return false;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
    if (passwordRegex.test(text)) return true;
    return false;
};