import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import { useRouter } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles, getInsets } from '../styles/globalStyles';


export const Home = () => {
    const router = useRouter();
    return (
        <View style={[styles.container, getInsets()]}>
            <View style={styles.header}>
                <MaterialIcons style={styles.logo} name="pedal-bike" size={Platform.OS === 'web' ? 100 : 50} color="#007bff" />

                <Text style={styles.title}>Bienvenido a la App de Bicicletas</Text>
            </View>
            <View style={styles.dashboard}>
                <Pressable
                    style={styles.card}
                    onPress={() => router.push('/users')}
                >
                    <MaterialIcons name="people" size={40} color="#007bff" style={styles.cardIcon} />
                    <Text style={styles.cardText}>Usuarios</Text>
                </Pressable>
                <Pressable
                    style={styles.card}
                    onPress={() => router.push('/bikes')}
                >
                    <MaterialIcons name="directions-bike" size={40} color="#007bff" style={styles.cardIcon} />
                    <Text style={styles.cardText}>Ver Bicicletas</Text>
                </Pressable>
                <Pressable
                    style={styles.card}
                    onPress={() => router.push('/appointments')}
                >
                    <MaterialIcons name="event" size={40} color="#007bff" style={styles.cardIcon} />
                    <Text style={styles.cardText}>Citas</Text>
                </Pressable>
                {/* <Pressable
                    style={styles.card}
                    onPress={() => router.push('appointments/create-appointment')}
                >
                    <MaterialIcons name="add-circle" size={40} color="#007bff" style={styles.cardIcon} />
                    <Text style={styles.cardText}>Crear cita</Text>
                </Pressable> */}
                <Pressable
                    style={styles.card}
                    onPress={() => router.push('appointments/create-appointment-today')}
                >
                    <MaterialIcons name="add-circle" size={40} color="#007bff" style={styles.cardIcon} />
                    <Text style={styles.cardText}>Crear cita para hoy</Text>
                </Pressable>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>© 2024 Bike App. Todos los derechos reservados.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },

    logo: {
        margin: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    dashboard: {
        flex: 1,
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
        justifyContent: 'center',
        alignItems: Platform.OS === 'web' ? 'start' : 'center',
    },
    card: {
        width: Platform.OS === 'web' ? '22%' : '80%',
        margin: 10,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardIcon: {
        marginBottom: 10,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007bff',
        textAlign: 'center',
    },
    footer: {
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
});

export default Home;