import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, SafeAreaView, Pressable } from "react-native";
import { Link } from 'expo-router';
import SignUp from '../components/signup_main';


export default function Signup() {
    return (
        <SafeAreaView>
            <SignUp />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})