import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Link } from 'expo-router';
import imageSource from '../assets/signup.png';

export default function SignUp({ formData, setFormData }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Birdie</Text>
                <Text style={styles.text}>Get started with Birdie!</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        placeholder="Username"
                        value={formData.username}
                        rightIcon={<Icon name="user" size={24} color="#6C63FF" />}
                        onChangeText={(text) => setFormData(prevState => ({ ...prevState, username: text }))}
                        errorMessage={errorsObject.usernameError}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        placeholder="Email"
                        value={formData.email}
                        rightIcon={<Icon name="envelope" size={24} color="#6C63FF" />}
                        onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text }))}
                        errorMessage={errorsObject.emailError}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        placeholder="Password"
                        value={formData.password}
                        secureTextEntry
                        rightIcon={<Icon name="lock" size={24} color="#6C63FF" />}
                        onChangeText={(text) => setFormData(prevState => ({ ...prevState, password: text }))}
                        errorMessage={errorsObject.passwordError}
                    />
                </View>
                <Pressable style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                <View style={styles.textContainer2}>
                    <Text>Already have an account?</Text>
                    <Link href='/login' asChild>
                        <Text style={styles.linkText}>Sign in</Text>
                    </Link>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        height: '100%',
        gap: 20
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 200,
        width: '80%'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    },
    title: {
        fontSize: 50,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        color: '#6C63FF'
    },
    text: {
        fontSize: 18
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: 20,
        gap: 20,
        justifyContent: 'center',
    },
    inputContainer: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#6C63FF',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#6C63FF',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 30,
        width: '70%',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1.5
    },
    textContainer2: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        width: '100%'
    },
    linkText: {
        color: '#6C63FF',
        fontWeight: 'bold'
    }
})