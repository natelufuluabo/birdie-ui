import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import SignUp from '../components/signup_main';
import ConfirmationSignUp from '../components/confirmation_signup';


export default function Signup() {
    const [signUpSuccessfull, setSignUpSuccessfull] = useState(false);
    return (
        <SafeAreaView>
            { 
                signUpSuccessfull ? 
                <ConfirmationSignUp setSignUpSuccessfull={setSignUpSuccessfull} /> : 
                <SignUp setSignUpSuccessfull={setSignUpSuccessfull} /> 
            }
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})