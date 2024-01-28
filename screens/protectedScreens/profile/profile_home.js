import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import socket from '../../../utils/socketService';
import { app } from '../../../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import CustomHeader from '../../../components/CustomHeader';
import default_img from '../../../assets/profile_default.webp';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import getUser, { updateUserInFirebaseDatabase } from '../../../utils/logins';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decode } from 'base-64';

if(typeof atob === 'undefined') {
  global.atob = decode;
}

const uploadImageToFirebaseStorage = async (fileUri, userId) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `profileImages/${userId}/image.png`);

    try {
        const img = await fetch(fileUri);
        const bytes = await img.blob();

        const result = await uploadBytes(storageRef, bytes);
        const downloadUrl = await getDownloadURL(result.ref);

        return downloadUrl;
    } catch (error) {
        console.error('Error uploading image to Firebase Storage:', error.message);
    }
};

export default function ProfileHome() {
    const navigation = useNavigation();
    const [userId, setUserId] = useState(null);
    const auth = getAuth(app);
    const [userData, setUserData] = useState({
        email: '',
        sex: '',
        uid: '',
        username: '',
        profilePicLink: '',
        id: ''
    });

    const handleSignOut = async () => {
        await AsyncStorage.removeItem('userToken');
        await signOut(auth);
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            const imgUri = result.assets[0].uri
            const downloadUrl = await uploadImageToFirebaseStorage(imgUri, userId);
            const updatedUserData = { ...userData, profilePicLink: downloadUrl };
            const newUserData = await updateUserInFirebaseDatabase(userData.id, updatedUserData);
            setUserData(newUserData);
        } 
    };
    
    useEffect(() => {
        const fetchData = async () => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    const response = await getUser(user.uid);
                    setUserData(response);
                } else {
                    navigation.navigate('login');
                }
            });
        };

        fetchData();
    }, [userId, navigation, auth]);
    return (
        <View style={styles.container}>
            <CustomHeader title='Profile' showBackButton={false} />
            <View style={styles.imageContainer}>
                <Image source={{ uri: userData.profilePicLink || default_img }} style={styles.image} />
            </View>
            <View style={styles.headlineContainer}>
                <Text style={styles.usernameText}>{userData.username}</Text>
                <Pressable onPress={pickImageAsync}>
                    <Text style={styles.editText}>Edit photo</Text>
                </Pressable>
            </View>
            <View style={styles.navContainer}>
                <Pressable style={styles.navItem} onPress={() => navigation.navigate('profileDetails')}>
                    <View style={styles.navTextContainer}>
                        <FontAwesome name="user-circle" size={24} color="#6C63FF" />
                        <Text>Account Details</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color='#444' />
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => navigation.navigate('profileSettings')}>
                    <View style={styles.navTextContainer}>
                        <FontAwesome name="cog" size={24} color="#6C63FF" />
                        <Text>Settings</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color='#444' />
                </Pressable>
                <Pressable style={styles.navItem} onPress={() => navigation.navigate('profileContactus')}>
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
        gap: 20,
        alignItems: 'center',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 200,
        borderWidth: 2,
        borderColor: '#6C63FF'
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 200,
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
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 20,
    }
})