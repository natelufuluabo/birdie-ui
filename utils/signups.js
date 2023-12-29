import { validateEmail, validatePassword } from "./shared";
import { REACT_APP_REGISTER_ENPOINT } from "@env";
import { app } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

export const createUser = async (formData, setErrorsObject, setFormData) => {
    const auth = getAuth(app);
    try {
        const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = result.user;
        const userData = { 
            uid: user.uid, 
            username: formData.username,
            email: formData.email
        };
        await saveUserToFireStore(userData);
    } catch (error) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            setErrorsObject(prevState => ({ 
                ...prevState, usernameError: '',
                emailError: 'email already in use',
                passwordError: ''
            }));
            // setFormData(prevState => ({
            //     ...prevState, password: '',
            // }));
            return false;
        }
    }
    // if (result.user) return true
    // return false
}

async function saveUserToFireStore(userData) {
    const db = getFirestore(app);
    try {
        await addDoc(collection(db, "users"), { ...userData });
    } catch (error) {
        console.log("Error adding document: ", error);
    }
}

export const sendRequestToServer = async (formData, setErrorsObject, setFormData) => {
    try {
        const response = await fetch(`${REACT_APP_REGISTER_ENPOINT}`, {
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