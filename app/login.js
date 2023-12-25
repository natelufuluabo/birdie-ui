import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import imageSource from '../assets/login.png';

export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const handleSingIn = () => {
        // Implement your sigin logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.image} />
                </View>
                <Text style={styles.headline}>Connect with friends and family!</Text>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder="Email"
                            rightIcon={<Icon name="envelope" size={24} color="#6C63FF" />}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            rightIcon={<Icon name="lock" size={24} color="#6C63FF" />}
                            onChangeText={(text) => setPassword(text)}
                            errorMessage={errorMessage}
                        />
                    </View>
                    <Pressable style={styles.button} onPress={handleSingIn}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                    <View style={styles.textContainer2}>
                        <Text>Need an account?</Text>
                        <Link href='/signup' asChild>
                            <Text style={styles.linkText}>Sign up</Text>
                        </Link>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        height: '100%',
        gap: 20
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 300,
        width: '80%'
    },
    headline: {
        fontSize: 18,
        color: '#6C63FF'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: 'center',
    },
    inputContainer: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#6C63FF',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        width: '70%',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.5
    },
    textContainer2: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        width: '100%'
    },
    linkText: {
        color: '#6C63FF',
        fontWeight: 'bold'
    }
})