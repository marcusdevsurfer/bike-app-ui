import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export const UserCard = ({ user }) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <MaterialIcons name="person" size={40} color="#007bff" />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
                <Text style={styles.phone}>{user?.phone}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginRight: 15,
    },
    infoContainer: {
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: '#666',
    },
});
