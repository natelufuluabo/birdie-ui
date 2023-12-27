import { validateEmail, validatePassword } from "./shared";

export const validateForm = (formData, setErrorsObject) => {
    const { username, email, password } = formData;
    if (!username) {
        setErrorsObject(prevState => ({ 
            ...prevState, usernameError: 'Invalid username',
            emailError: '',
            passwordError: ''
        }));
        return false
    }
    if (!validateEmail(email)) {
        setErrorsObject(prevState => ({ 
            ...prevState, usernameError: '',
            emailError: 'Invalid Email',
            passwordError: ''
        }));
        return false
    }
    if (!validatePassword(password)) {
        setErrorsObject(prevState => ({ 
            ...prevState, passwordError: 'Invalid password. Password must: \n - Be at least 8 and at most 14 characters. \n - Contain a mix of uppercase and lowercase letters. \n - Contain at least one digit',
            usernameError: '', emailError: ''
        }));
        return false
    }
    return true;
}

export const sendRequestToServer = async (formData, setErrorsObject, setFormData) => {
    try {
        const response = await fetch('http://192.168.4.93:3000/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            }),
        });

        if (!response.ok) {
            const json = await response.json();
            if (json.message === "The username is already in use by another account.") {
                setErrorsObject(prevState => ({ 
                    ...prevState, usernameError: json.message,
                    emailError: '',
                    passwordError: ''
                }));
                setFormData(prevState => ({
                    ...prevState, password: '',
                }));
                return false;
            }
            if (json.message === "The email address is already in use by another account.") {
                setErrorsObject(prevState => ({ 
                    ...prevState, usernameError: '',
                    emailError: json.message,
                    passwordError: ''
                }));
                setFormData(prevState => ({
                    ...prevState, password: '',
                }));
                return false;
            }
        }

        setErrorsObject(prevState => ({ 
            ...prevState, usernameError: '',
            emailError: '',
            passwordError: ''
        }));

        return true;

    } catch (error) {
        setErrorsObject(prevState => ({ 
            ...prevState, usernameError: '',
            emailError: '',
            passwordError: error.message
        }));
        setFormData(prevState => ({
            ...prevState, password: '',
        }));
        return false;
    }
}