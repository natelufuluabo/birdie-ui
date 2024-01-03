import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chats from '../components/chats';
import Profile from '../components/profile';

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator initialRouteName='Chat'>
      <Tab.Screen name='Chat' component={Chats}/>
      <Tab.Screen name='Profile' component={Profile}/>
    </Tab.Navigator>
  );
}