import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import socket from '../utils/socketService';
import { app } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function ProfileHome() {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const auth = getAuth(app);
    const handleSignOut = async () => {
        socket.disconnect();
        await signOut(auth);
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) setUserId(user.uid);
        else navigation.navigate('login');
        });
    }, []);
    return (
        <View>
            <Text>My Profile</Text>
            <Pressable onPress={() => navigation.navigate('details')}>
                <Text>Account Details</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('settings')}>
                <Text>Settings</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('contactus')}>
                <Text>Contact Us</Text>
            </Pressable>
            <Pressable onPress={handleSignOut}>
                <Text>signOut</Text>
            </Pressable>
        </View>
    );
}