import React, { useState, useRef } from 'react';
import { 
    StyleSheet, View, Text, Pressable, Image,
    TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard 
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import imageSource from '../assets/signup.png';
import { validateForm, sendRequestToServer } from '../utils/signups';

export default function SignUp() {
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

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignUp = async () => {
        // Implement your signup logic here
        // You can access the validated email, password, and username from state
        if (!validateForm(formData, setErrorsObject)) return
        if (await sendRequestToServer(formData, setErrorsObject, setFormData)) {
            console.log('success')
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Birdie</Text>
                <Text style={styles.text}>Get started with Birdie!</Text>
            </View>
            <KeyboardAvoidingView behavior='padding'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formContainer}>
                        <View style={styles.formSection}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    inputMode='text'
                                    returnKeyType='next'
                                    returnKeyLabel='Next'
                                    onSubmitEditing={() => {
                                        emailRef.current.focus();
                                    }}
                                    blurOnSubmit={false}
                                    placeholder="Username"
                                    value={formData.username}
                                    onChangeText={(text) => setFormData(prevState => ({ ...prevState, username: text }))}
                                    errorMessage={errorsObject.usernameError}
                                />
                                <Icon name="user" size={24} color="#6C63FF" />
                            </View>
                            <Text style={styles.errorText}>{errorsObject.usernameError}</Text>
                        </View>
                        <View style={styles.formSection}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    inputMode='email'
                                    ref={emailRef}
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
                                    onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text }))}
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
                                        await handleSignUp();
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
                        <Pressable style={styles.button} onPress={async () => await handleSignUp()}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View style={styles.textContainer2}>
                <Text>Already have an account?</Text>
                <Link href='/login' asChild>
                    <Text style={styles.linkText}>Sign in</Text>
                </Link>
            </View>
        </View>
    );
};

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
        height: 200,
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