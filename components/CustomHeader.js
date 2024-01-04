import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomHeader({ title, showBackButton = true }) {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.button} onPress={handleBackPress}>
          <Text style={styles.buttonText}>
            <Ionicons name="chevron-back" size={18} color='#444' />
            Back
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%'
  },
  button: {
    flex: 0,
    alignItems: 'center',
    position: 'absolute',
    left: 10
  },
  buttonText: { 
    fontSize: 18, 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#6C63FF',
  }
})