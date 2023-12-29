import React from 'react';
import { View, Text } from 'react-native';

export default function Main({ route }) {
  const { user_uid } = route.params;

  // Now, you can access the user data here
  console.log('User data in Main component:', user_uid);

  return (
    <View>
      <Text>Main Page</Text>
      {/* Render your main content here */}
    </View>
  );
}