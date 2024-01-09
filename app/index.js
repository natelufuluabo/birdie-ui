import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import imageSource from '../assets/homscreen.png';
import { checkIfUserAuthenticated } from '../utils/logins';

export default function Home() {
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await checkIfUserAuthenticated();

      if (isAuthenticated) {
        console.log('User is authenticated');
      }
    };

    checkAuthentication();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Stay connected with your loved ones
          & chat with them anytime, anywhere!
        </Text>
      </View>
      <Link href='/signup' style={StyleSheet.buttonContainer} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%',
    paddingHorizontal: 20
  },
  image: {
    height: 450,
    width: 370
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6C63FF'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1.5
  },
  buttonContainer: {},
});
