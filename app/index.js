import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/index';
import Login from '../screens/login';
import Signup from '../screens/signup';
import Confirmation from '../screens/confirmation';
import Main from '../screens/protectedScreens/main';

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='signup' component={Signup} />
            <Stack.Screen name='confirmation' component={Confirmation} />
            <Stack.Screen name='main' component={Main} />
        </Stack.Navigator>
    );
}