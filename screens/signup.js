import React, { useState, useRef } from 'react';
import { 
    StyleSheet, View, Text, Pressable, Image, ActivityIndicator, 
    TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard 
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import imageSource from '../assets/signup.png';
import { useNavigation } from '@react-navigation/native';
import { validateForm, createUser } from '../utils/signups';

export default function SignUp() {
    const navigation = useNavigation();
    const [isLoading, setLoadingState] = useState(false);
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
        setLoadingState(true);
        if (!validateForm(formData, setErrorsObject)) {
            setLoadingState(false);
            return
        }
        if (await createUser(formData, setErrorsObject, setFormData)) {
            setLoadingState(false);
            navigation.navigate('confirmation');
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
                                    onChangeText={(text) => setFormData(prevState => ({ ...prevState, username: text.toLowerCase() }))}
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
                            { isLoading && <ActivityIndicator size={24} color="#fff" /> }
                        </Pressable>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View style={styles.textContainer2}>
                <Text>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('login')}>
                    <Text style={styles.linkText}>Sign in</Text>
                </Pressable>
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
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 20,
        width: '55%',
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