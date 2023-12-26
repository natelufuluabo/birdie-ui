const validateEmail = (text) => {
    if (text === '') return false;
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(text)) return true;
    return false;
};

const validatePassword = (text) => {
    // Password must be at least 8 characters, max 14 characters, with a mix of uppercase and lowercase letters, and at least 1 number
    if (text === '') return false;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
    if (passwordRegex.test(text)) return true;
    return false;
};

export const validateForm = (formData, errorsObject, setErrorsObject) => {
    const { username, email, password } = formData;
    if (!username) {
        setErrorsObject(prevState => ({ ...prevState, usernameError: 'Invalid username'}));
        setErrorsObject(prevState => ({ ...prevState, emailError: ''}));
        setErrorsObject(prevState => ({ ...prevState, passwordError: ''}));
        return false
    }
    if (!validateEmail(email)) {
        setErrorsObject(prevState => ({ ...prevState, usernameError: ''}));
        setErrorsObject(prevState => ({ ...prevState, emailError: 'Invalid Email'}));
        setErrorsObject(prevState => ({ ...prevState, passwordError: ''}));
        return false
    }
    if (!validatePassword(password)) {
        setErrorsObject(prevState => ({ ...prevState, usernameError: ''}));
        setErrorsObject(prevState => ({ ...prevState, emailError: ''}));
        setErrorsObject(prevState => ({ ...prevState, passwordError: 'Invalid password. Password must: \n - Be at least 8 and at most 14 characters. \n - Contain a mix of uppercase and lowercase letters. \n - Contain at least one digit'}));
        return false
    }
    return true;
}