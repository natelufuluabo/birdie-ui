import React from 'react';
import { Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabBarIcon = ({ name, size, color }) => {
  if (Platform.OS === 'ios') {
    return <Ionicons name={name} size={size} color={color} />;
  } else if (Platform.OS === 'android') {
    return <MaterialIcons name={name} size={size} color={color} />;
  }
};

export default TabBarIcon;
