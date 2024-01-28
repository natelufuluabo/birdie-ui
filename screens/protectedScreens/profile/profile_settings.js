import React, { useState } from 'react';
import CustomHeader from '../../../components/CustomHeader';
import { View, Text, Pressable, Switch, StyleSheet } from 'react-native'; 

export default function ProfileSettings() {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };
    return (
        <View style={styles.container}>
            <CustomHeader title="Settings" />
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>GENERAL</Text>
                <View style={styles.sectionSection}>
                    <Text style={styles.sectionTextContainer}>Allow Push Notifications</Text>
                    <Switch
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.sectionSection}>
                    <Text style={styles.sectionTextContainer}>Enable Face ID/Touch ID</Text>
                    <Switch
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
            <Pressable style={styles.saveButton}>
                <Text style={styles.saveText}>Save</Text>
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
    saveText: {
        fontSize: 16,
        color: '#6C63FF',
        fontWeight: 'bold'
    },
    saveButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})