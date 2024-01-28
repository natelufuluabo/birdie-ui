import CustomHeader from '../../../components/CustomHeader';
import { View, Text, Pressable, StyleSheet } from 'react-native'; 

export default function ProfileDetails() {
    return (
        <View style={styles.container}>
            <CustomHeader title="Account Details" />
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>PUBLIC PROFILE</Text>
                <View style={styles.sectionSection}>
                    <Text style={styles.sectionTextContainer}>Username</Text>
                    <Text></Text>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>PRIVATE DETAILS</Text>
                <View style={styles.sectionSection}>
                    <Text style={styles.sectionTextContainer}>Email</Text>
                    <Text></Text>
                </View>
            </View>
            <Pressable style={styles.deleteButton}>
                <Text style={styles.deleteText}>Delete Account</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 30
    },
    sectionContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    sectionTitle: {
        color: '#7D7C7C',
        marginLeft: 15,
        marginBottom: 10,
        fontSize: 16
    },
    sectionSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderTopWidth: .2,
        borderTopColor: '#7D7C7C',
        borderBottomWidth: .2,
        borderBottomColor: '#7D7C7C',
    },
    sectionTextContainer: {
        fontSize: 16,
        color: '#444'
    },
    deleteText: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold'
    },
    deleteButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
