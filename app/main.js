import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Chats from '../screens/chats';
import Profile from '../screens/profile';
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const getIconName = (routeName, focused) => {
  if (routeName === 'Chats') {
    if (focused && Platform.OS === 'ios') return 'chatbubble';
    if (!focused && Platform.OS === 'ios') return 'chatbubble-outline';
    if (focused && Platform.OS === 'android') return 'chat';
    if (!focused && Platform.OS === 'android') return 'chat';
  } else if (routeName === 'Profile') {
    return focused ? 'person' : 'person-outline';
  }
};

const getIconColor = (routeName, focused) => {
  if (routeName === 'Chats') {
    return focused ? '#6C63FF' : '';
  } else if (routeName === 'Profile') {
    return focused ? '#6C63FF' : '';
  }
}

export default function Main() {
  const route = useRoute();
  const routeName = route.state ? route.state.routes[route.state.index].name : 'Chats';

  return (
    <Tab.Navigator 
      initialRouteName='Chat' 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF'
      }}
    >
      <Tab.Screen
        name='Chats'
        component={Chats}
        options={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={getIconName(route.name, focused)}
              size={size}
              color={getIconColor(route.name, focused)}
            />
          ),
        })}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={getIconName(route.name, focused)}
              size={size}
              color={getIconColor(route.name, focused)}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
