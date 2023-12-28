import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import SignUp from '../screens/signup_main';
import ConfirmationSignUp from '../screens/confirmation_signup';


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