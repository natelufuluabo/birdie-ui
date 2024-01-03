import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { app } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default function Main() {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);
  const auth = getAuth(app);
  const handleSignOut = async () => {
    await signOut(auth);
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
      else navigation.navigate('login')
    });
  }, []);
  return (
    <View>
      <Text>Main Page</Text>
      <Text>{userId}</Text>
      <Pressable onPress={handleSignOut}>
        <Text>signOut</Text>
      </Pressable>
    </View>
  );
}