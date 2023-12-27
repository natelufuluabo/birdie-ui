import React, { useState, useRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { 
    StyleSheet, View, Text, Pressable, Image, SafeAreaView, 
    TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard 
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import imageSource from '../assets/login.png';
import { validateForm } from '../utils/logins';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    });
    const [errorsObject, setErrorsObject] = useState({
        usernameError: '',
        emailError: '',
        passwordError: ''
    });
    const passwordRef = useRef(null);
    const handleSingIn = async () => {
        // Implement your sigin logic here
        if (validateForm(formData, setErrorsObject)) {
            console.log(formData);
        } else {
            console.log(errorsObject)
            console.log(formData)
        }
    };
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.image} />
                </View>
                <Text style={styles.headline}>Connect with friends and family!</Text>
                <KeyboardAvoidingView behavior='padding'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.formContainer}>
                            <View style={styles.formSection}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        inputMode='email'
                                        returnKeyType='next'
                                        returnKeyLabel='Next'
                                        onSubmitEditing={() => {
                                            passwordRef.current.focus();
                                        }}
                                        blurOnSubmit={false}
                                        autoComplete='email'
                                        autoCorrect
                                        keyboardType='email-address'
                                        placeholder="Email"
                                        value={formData.email}
                                        onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text.toLowerCase() }))}
                                    />
                                    <Icon name="envelope" size={24} color="#6C63FF" />
                                </View>
                                <Text style={styles.errorText}>{errorsObject.emailError}</Text>
                            </View>
                            <View style={styles.formSection}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        inputMode='text'
                                        ref={passwordRef}
                                        returnKeyType='next'
                                        returnKeyLabel='go'
                                        onSubmitEditing={async () => {
                                            await handleSingIn();
                                        }}
                                        blurOnSubmit={false}
                                        placeholder="Password"
                                        value={formData.password}
                                        secureTextEntry
                                        onChangeText={(text) => setFormData(prevState => ({ ...prevState, password: text }))}
                                    />
                                <Icon name="lock" size={24} color="#6C63FF" />
                            </View>
                            <Text style={styles.errorText}>{errorsObject.passwordError}</Text>
                        </View>
                            <Pressable style={styles.button} onPress={async () => await handleSingIn()}>
                                <Text style={styles.buttonText}>Sign In</Text>
                            </Pressable>
                            <View style={styles.textContainer2}>
                                <Text>Need an account?</Text>
                                <Link href='/signup' asChild>
                                    <Text style={styles.linkText}>Sign up</Text>
                                </Link>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
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
        width: '95%'
    },
    headline: {
        fontSize: 18,
        color: '#6C63FF',
        fontWeight: 'bold'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 15,
        gap: 20,
        justifyContent: 'center',
    },
    formSection: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#6C63FF',
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        gap: 5
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: '#6C63FF'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    errorText: {
        color: '#6C63FF',
        fontWeight: 'bold'
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 20,
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