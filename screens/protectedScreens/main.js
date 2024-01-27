import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Chats from './chats/chats';
import Profile from './profile/profile';
import TabBarIcon from '../../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const getIconName = (routeName, focused) => {
  if (routeName === 'chats') {
    if (focused && Platform.OS === 'ios') return 'chatbubble';
    if (!focused && Platform.OS === 'ios') return 'chatbubble-outline';
    if (focused && Platform.OS === 'android') return 'chat';
    if (!focused && Platform.OS === 'android') return 'chat';
  } else if (routeName === 'profile') {
    return focused ? 'person' : 'person-outline';
  }
};

const getIconColor = (routeName, focused) => {
  if (routeName === 'chats') {
    return focused ? '#6C63FF' : '';
  } else if (routeName === 'profile') {
    return focused ? '#6C63FF' : '';
  }
}

export default function Main() {
  const route = useRoute();
  const routeName = route.state ? route.state.routes[route.state.index].name : 'chats';

  return (
    <Tab.Navigator 
      initialRouteName='chats' 
      screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: '#6C63FF'
      }}
    >
      <Tab.Screen
        name='chats'
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
        name='profile'
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
