import { StyleSheet, View, Text, Image,Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import imageSource from '../assets/successImg.png';

export default function Confirmation() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Registration successful!</Text>
                <Text style={styles.paragraph}>We're thrilled to welcome you to our messaging community! Thank you for creating an account and initiating your journey toward connecting and communicating through our app.</Text>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('login')}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        gap: 20,
        paddingHorizontal: 20,
        paddingTop: 40,
        backgroundColor: '#fff'
    },
    image: {
        height: 400,
        width: 400
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6C63FF'
    },
    paragraph: {
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 14
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 20,
        width: '100%',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.5
    },
})