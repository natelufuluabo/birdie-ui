import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import SignUp from '../components/signup_main';
import ConfirmationEmail from '../components/confirmation_email';


export default function Signup() {
    const [signUpSuccessfull, setSignUpSuccessfull] = useState(true);
    return (
        <SafeAreaView>
            { signUpSuccessfull ? <ConfirmationEmail setSignUpSuccessfull={setSignUpSuccessfull} /> : <SignUp /> }
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})