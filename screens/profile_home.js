import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import socket from '../utils/socketService';
import { app } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import CustomHeader from '../components/CustomHeader';
import default_img from '../assets/profile_default.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getUser from '../utils/logins';

export default function ProfileHome() {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const auth = getAuth(app);
    const handleSignOut = async () => {
        socket.disconnect();
        await signOut(auth);
    }
    async function fetchUserData() {
        setUserData(await getUser(userId));
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUserId(user.uid);
            else navigation.navigate('login');
        });
        fetchUserData();
        console.log(userData)
    }, [userId]);
    return (
        <View style={styles.container}>
            <CustomHeader title='Profile' showBackButton={false} />
            <View style={styles.imageContainer}>
                <Image source={default_img} style={styles.image} />
            </View>
            <View style={styles.headlineContainer}>
                <Text style={styles.usernameText}>{userData.username}</Text>
                <Pressable>
                    <Text style={styles.editText}>Edit photo</Text>
                </Pressable>
            </View>
            <View style={styles.navContainer}>
                <Pressable style={styles.navItem} onPress={() => navigation.navigate('details')}>
                    <View style={styles.navTextContainer}>
                        <FontAwesome name="user-circle" size={24} color="#6C63FF" />
                        <Text>Account Details</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color='#444' />
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => navigation.navigate('settings')}>
                    <View style={styles.navTextContainer}>
                        <FontAwesome name="cog" size={24} color="#6C63FF" />
                        <Text>Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color='#444' />
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => navigation.navigate('contactus')}>
                    <View style={styles.navTextContainer}>
                        <FontAwesome name="phone" size={24} color="#6C63FF" />
                        <Text>Contact Us</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color='#444' />
                </Pressable>
            </View>
            <Pressable onPress={handleSignOut}>
                <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 20
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 200
    },
    headlineContainer :{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 15,
        alignItems: 'center'
    },
    usernameText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#444'
    },
    editText: {
        color:'#6C63FF'
    },
    navContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        paddingHorizontal: 30,
    },
    navItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    navTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    logoutText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 20,
    }
})