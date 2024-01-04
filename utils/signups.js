import { validateEmail, validatePassword } from "./shared";
import { app } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

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
    if (await userExist(formData.username)) {
        setErrorsObject(prevState => ({ 
            ...prevState, usernameError: 'username already in use',
            emailError: '',
            passwordError: ''
        }));
        setFormData(prevState => ({
            ...prevState, password: '',
        }));
        return false;
    }
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
        setErrorsObject(prevState => ({ 
            ...prevState, usernameError: '',
            emailError: '',
            passwordError: ''
        }));

        return true;
    } catch (error) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
            setErrorsObject(prevState => ({ 
                ...prevState, usernameError: '',
                emailError: 'email already in use',
                passwordError: ''
            }));
            setFormData(prevState => ({
                ...prevState, password: '',
            }));
            return false;
        }
    }
}

async function saveUserToFireStore(userData) {
    const db = getFirestore(app);
    try {
        await addDoc(collection(db, "users"), { ...userData });
    } catch (error) {
        console.log("Error adding document: ", error);
    }
}

async function userExist(username) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("username", "==", username));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) return true;
        else return false;
    } catch (error) {
        console.log("Error checking user existence:", error);
    }
}