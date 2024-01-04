import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileHome from './profile_home';
import ProfileDetails from './profile_details';
import ProfileSettings from './profile_settings';
import ProfileContactUs from './profile_contactus';

export default function Profile() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Home' component={ProfileHome} />
            <Stack.Screen name='details' component={ProfileDetails} />
            <Stack.Screen name='settings' component={ProfileSettings} />
            <Stack.Screen name='contactus' component={ProfileContactUs} />
        </Stack.Navigator>
    );
}
