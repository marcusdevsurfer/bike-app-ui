import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from "@env";
import { MaterialIcons } from '@expo/vector-icons';

const AppointmentDetails = () => {

    const { id } = useLocalSearchParams();
    const [appointment, setAppointment] = useState(null);
    const [user, setUser] = useState(null);
    const [bike, setBike] = useState(null);
    const [station, setStation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rental = await fetchRental(id);
                setAppointment(rental);
                const user = await fetchUser(rental.user);
                setUser(user);
                const bike = await fetchBike(rental.bike);
                setBike(bike);
                const station = await fetchStation(rental.stationStart);
                setStation(station);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);


    const fetchRental = async (id) => {
        try {
            const response = await fetch(`${API_URL}/rentals/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUser = async (id) => {
        try {
            const response = await fetch(`${API_URL}/users/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error + "Error en fetchUser");

        }
    };

    const fetchBike = async (id) => {
        try {
            const response = await fetch(`${API_URL}/bikes/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }

    const fetchStation = async (id) => {
        try {
            const response = await fetch(`${API_URL}/stations/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }

    };

    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation path={'/appointments'} />
            <View style={styles.headerContainer}>
                <Text style={globalStyles.title}>Detalles de la cita</Text>
                <Text style={globalStyles.subtitle}>Revisa los detalles de la cita que has programado.</Text>
            </View>
            {
                appointment && user && bike && station ? (
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="date-range" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{new Date(appointment?.rentalStartTime).toLocaleDateString()}</Text>
                        <MaterialIcons name="person" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{user?.name}</Text>
                        <MaterialIcons name="directions-bike" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{bike?.serialNumber}</Text>
                        <MaterialIcons name="location-on" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{station?.name}</Text>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Cargando...</Text>
                )
            }
            <View style={styles.actionsContainer}>
                <Pressable style={[globalStyles.grayButton, { marginHorizontal: 10 }]}>
                    <Text style={globalStyles.buttonText}>
                        Editar cita
                    </Text>
                </Pressable>
                <Pressable style={[globalStyles.strongBlueButton, { marginHorizontal: 10 }]}>
                    <Text style={globalStyles.buttonText}>
                        Cancelar cita
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10
    },
    infoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
    },
});


export default AppointmentDetails;