import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from "@env";
import { MaterialIcons } from '@expo/vector-icons';
import { showAlert } from "../misc/util";
import { fetchBike, fetchStation } from "../misc/api";

const BikeDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [bike, setBike] = useState(null);
    const [station, setStation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bike = await fetchBike(id);
                setBike(bike);
                const station = await fetchStation(bike?.station);
                setStation(station);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const deleteBike = async (id) => {
        try {
            const response = await fetch(`${API_URL}/bikes/${id}`, {
                method: 'DELETE',
            });
            const json = await response.json();
            if (json.message === 'Bike deleted successfully') {
                showAlert('Exito', 'La bicicleta ha sido eliminada correctamente.');
                router.replace('/bikes');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const showStatus = (status) => {
        switch (status) {
            case 'available':
                return 'Disponible';
            case 'unavailable':
                return 'No disponible';
            case 'maintenance':
                return 'En mantenimiento';
            default:
                return 'Desconocido';
        }
    }
    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation path={'/bikes'} />
            <View style={styles.headerContainer}>
                <Text style={globalStyles.title}>Detalles de la bicicleta</Text>
                <Text style={globalStyles.subtitle}>Aqui podras observar detalles de la bicicleta</Text>
            </View>
            {
                bike && station ? (
                    <View style={styles.infoContainer}>
                        <MaterialIcons name="directions-bike" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{bike?.serialNumber}</Text>
                        <MaterialIcons name="location-on" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{station?.name}</Text>
                        <MaterialIcons name="info" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{showStatus(bike?.status)}</Text>
                    </View>
                ) : (
                    <Text style={styles.loadingText}>Cargando...</Text>
                )
            }
            <View style={styles.actionsContainer}>
                <Pressable style={[globalStyles.grayButton, { marginHorizontal: 10 }]}>
                    <Text style={globalStyles.buttonText}>
                        Editar
                    </Text>
                </Pressable>
                <Pressable
                    style={[globalStyles.strongBlueButton, { marginHorizontal: 10 }]}
                    onPress={() => deleteBike(id)}
                >
                    <Text style={globalStyles.buttonText}>
                        Eliminar
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

export default BikeDetails;