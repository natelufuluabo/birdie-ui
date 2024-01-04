import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    // You can customize the route name as needed
    navigation.navigate('Home');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={{ fontSize: 18, marginRight: 10 }}>{'< Back'}</Text>
        </TouchableOpacity>
      )}
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
