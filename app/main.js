import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chats from '../screens/chats';
import Profile from '../screens/profile';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator initialRouteName='Chat'>
      <Tab.Screen name='Chats' component={Chats}/>
      <Tab.Screen name='Profile' component={Profile}/>
    </Tab.Navigator>
  );
}