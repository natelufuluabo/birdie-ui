import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import imageSource from '../assets/signup.png';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);

    const validateEmail = (text) => {
        // You can use a regular expression for basic email validation
        const emailRegex = /\S+@\S+\.\S+/;
        setIsValidEmail(emailRegex.test(text));
        setEmail(text);
    };

    const validatePassword = (text) => {
        // Password must be at least 8 characters, max 14 characters, with a mix of uppercase and lowercase letters, and at least 1 number
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,14}$/;
        setIsValidPassword(passwordRegex.test(text));
        setPassword(text);
    };

    const handleSignUp = () => {
        // Implement your signup logic here
        // You can access the validated email, password, and username from state
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Username:', username);
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Birdie</Text>
                    <Text style={styles.text}>Get started with Birdie!</Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder="Username"
                            rightIcon={<Icon name="user" size={24} color="#6C63FF" />}
                            onChangeText={(text) => setUsername(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder="Email"
                            rightIcon={<Icon name="envelope" size={24} color="#6C63FF" />}
                            onChangeText={validateEmail}
                            errorMessage={isValidEmail ? null : 'Invalid email address'}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Input
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            rightIcon={<Icon name="lock" size={24} color="#6C63FF" />}
                            onChangeText={validatePassword}
                            errorMessage={isValidPassword ? null : 'Invalid password'}
                        />
                    </View>
                    <Pressable style={styles.button} onPress={handleSignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
                    <View style={styles.textContainer2}>
                        <Text>Already have an account</Text>
                        <Link href='/sigin' asChild>
                            <Text style={styles.linkText}>Sign in</Text>
                        </Link>
                    </View>
                </View>
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
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
        height: 180,
        width: '80%'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#6C63FF'
    },
    text: {
        fontSize: 18
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