import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from "expo-router";

export const Home = () => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido a la App de Bicicletas</Text>
            <Pressable
                style={styles.button}
                onPress={() => router.push('/bikes')}
            >
                <Text style={styles.buttonText}>Ver Bicicletas</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => router.push('/appointments')}
            >
                <Text style={styles.buttonText}>Citas</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => router.push('appointments/create-appointment')}
            >
                <Text style={styles.buttonText}>Crear cita</Text>
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