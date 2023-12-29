import { validateEmail, validatePassword } from "./shared";
import { app } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const validateForm = (formData, setErrorsObject) => {
    const { email, password } = formData;
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

export const loginUser = async(email, password) => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    
        const signedInUser = userCredential.user;
    
        console.log('User signed in successfully:', signedInUser);
    } catch (error) {
        if (error.message === 'Firebase: Error (auth/invalid-credential).') return false 
    }
}