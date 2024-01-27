import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { app } from '../../utils/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import imageSource from '../../assets/chats_empty.png';
import FloatingButton from '../../components/FloatingButton';

export default function Chats() {
    const [userId, setUserId] = useState(null);
    const auth = getAuth(app);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) setUserId(user.uid);
        });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>No Conversation</Text>
                <Text style={styles.paragraph}>You didn't make any conversations yet, please select username</Text>
            </View>
            <FloatingButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        height: '100%',
        gap: 15, 
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 350,
        width: '80%'
    },
    textContainer: {
        display: 'flex',
        flexDirection:'column',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center'
    },
    paragraph: {
        textAlign: 'center',
        color: '#7D7C7C'
    }
});