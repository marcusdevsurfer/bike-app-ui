import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la App de Bicicletas</Text>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('BikesView')}
            >
                <Text style={styles.buttonText}>Ver Bicicletas</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('AddBikeForm')}
            >
                <Text style={styles.buttonText}>Añadir Bicicleta</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 20,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});