import { validateEmail, validatePassword } from "./shared";
import { app } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, updateDoc, getDocs, where, query, doc, getDoc } from "firebase/firestore";

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
            const userData = { id: querySnapshot.docs[0].id , ...querySnapshot.docs[0].data()};
            return userData;
        }
    } catch (error) {
        console.log("Error checking user existence:", error);
    }
}

export const updateUserInFirebaseDatabase = async (userId, updatedUserData) => {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', userId);

    try {
        // Get the current user data from Firestore
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const currentUserData = userDoc.data();

            // Merge the updated data with the existing user data
            const newUserData = { ...currentUserData, ...updatedUserData };

            // Update the user in Firestore
            await updateDoc(userDocRef, newUserData);
            
            return newUserData;
        } else {
            console.error('User not found in Firestore');
            // throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error updating user in Firestore:', error.message);
        throw error;
    }
};