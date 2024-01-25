import { validateEmail, validatePassword } from "./shared";
import { app } from "./firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, updateDoc, getDocs, where, query, doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_APP_SIGN_IN_TOKEN_CREATION_ENDPOINT } from "@env";

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

export const createCustomToken = async (userId) => {
    try {
      const response = await fetch(`${REACT_APP_SIGN_IN_TOKEN_CREATION_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId
        }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('Error triggering Cloud Function:', error);
    }
};

export const loginUser = async(email, password) => {
    const auth = getAuth(app);
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const response = { ok: true, uid: userCredential.user.uid };

        return response;
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

export const storeUserToken = async (token) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (e) {
        console.log('Error storing user token:', e);
    }
};

export const getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (e) {
      console.log('Error getting user token:', e);
      return null;
    }
};

export const checkIfUserAuthenticated = async () => {
    const userToken = await getUserToken();
    return !!userToken;
};