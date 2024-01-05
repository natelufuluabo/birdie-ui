import { validateEmail, validatePassword } from "./shared";
import { app } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, getDocs, where, query } from "firebase/firestore";

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

        return { ok: true, uid: userCredential.user.uid };
    } catch (error) {
        if (error.message === 'Firebase: Error (auth/invalid-credential).') return { ok: false, uid: undefined }; 
    }
}

export default async function getUser(uid) {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            const userData = querySnapshot.docs[0].data();
            return userData;
        }
    } catch (error) {
        console.log("Error checking user existence:", error);
    }
}
