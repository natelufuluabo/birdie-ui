import CustomHeader from '../../components/CustomHeader';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileContactUs() {
    return (
        <View style={styles.container}>
            <CustomHeader title="Contact Us" />
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>CONTACT</Text>
                <View style={styles.sectionSection}>
                    <Text style={styles.sectionTextContainer}>Address</Text>
                    <Text style={styles.sectionTextContainer}>Longueuil, QC</Text>
                </View>
                <View style={styles.sectionSection}>
                    <Text style={styles.sectionTextContainer}>Email us</Text>
                    <Text style={styles.sectionTextContainer}>info@birdie.ca</Text>
                </View>
            </View>
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
        paddingVertical: 10,
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
})