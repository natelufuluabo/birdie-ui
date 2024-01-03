import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { app } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Chats() {
    const [userId, setUserId] = useState(null);
    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUserId(user.uid);
            else navigation.navigate('login');
        });
    }, []);
    return (
        <View>
            <Text>Chat Page</Text>
            <Text>{userId}</Text>
        </View>
    );
}