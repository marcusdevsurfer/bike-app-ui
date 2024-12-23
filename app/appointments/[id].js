import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable , Platform, Alert} from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from "@env";
import { MaterialIcons } from '@expo/vector-icons';
import { showAlert } from "../misc/util";
import { fetchUser, fetchRental, fetchBike, fetchStation } from "../misc/api";

const AppointmentDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [appointment, setAppointment] = useState(null);
    const [user, setUser] = useState(null);
    const [bike, setBike] = useState(null);
    const [station, setStation] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const rental = await fetchRental(id);
            setAppointment(rental);
            const user = await fetchUser(rental?.user);
            setUser(user);
            const bike = await fetchBike(rental?.bike);
            setBike(bike);
            const station = await fetchStation(rental?.stationStart);
            setStation(station);
        } catch (error) {
            console.error(error);
        }
    };

    const confirmDelete = () => {
        if (Platform.OS === 'web') {
            if (window.confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
                deleteRental(id);
            }
        } else {
            Alert.alert(
                'Confirmación',
                '¿Estás seguro de que deseas cancelar esta cita?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Aceptar', onPress: () => deleteRental(id) },
                ],
                { cancelable: false }
            );
        }
    };



    const deleteRental = async (id) => {
        try {
            const bikeUpdated = await fetch(`${API_URL}/bikes/${appointment?.bike}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: 'available',
                }),
            });

            if (bikeUpdated.ok) {
                const rentalDeleted = await fetch(`${API_URL}/rentals/${id}`, {
                    method: 'DELETE',
                });
                if (rentalDeleted.ok) {
                    showAlert('Cita cancelada', 'La cita ha sido cancelada con éxito.');
                    router.push('/appointments');
                }
            }
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
                <Pressable
                    style={[globalStyles.redButton]}
                    onPress={confirmDelete}
                >
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