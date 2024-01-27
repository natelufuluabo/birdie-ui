import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileHome from './profile_home';
import ProfileDetails from './profile_details';
import ProfileSettings from './profile_settings';
import ProfileContactUs from './profile_contactus';

export default function Profile() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName='profileHome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='profileHome' component={ProfileHome} />
            <Stack.Screen name='profileDetails' component={ProfileDetails} />
            <Stack.Screen name='profileSettings' component={ProfileSettings} />
            <Stack.Screen name='profileContactus' component={ProfileContactUs} />
        </Stack.Navigator>
    );
}
