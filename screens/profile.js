import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileHome from './profile_home';
import ProfileDetails from './profile_details';

export default function Profile() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={ProfileHome} />
            <Stack.Screen name='details' component={ProfileDetails} />
        </Stack.Navigator>
    );
}
