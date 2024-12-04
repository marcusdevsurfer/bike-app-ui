import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { API_URL } from "@env";
import { MaterialIcons } from '@expo/vector-icons';
import { showAlert } from "../misc/util";
import { fetchBike, fetchRentals, fetchStation } from "../misc/api";

const BikeDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [bike, setBike] = useState(null);
    const [station, setStation] = useState(null);
    const [rentals, setRentals] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bike = await fetchBike(id);
                setBike(bike);
                const station = await fetchStation(bike?.station);
                setStation(station);
                const rentals = await fetchRentals();
                const rentalsByBike = rentals.filter(rental => rental.bike == id)
                setRentals(rentalsByBike)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    const releaseBike = async (id) => {
        const updateBikeStatus = await fetch(`${API_URL}/bikes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'available',
            })
        });
        console.log(updateBikeStatus)
    }

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

            {
                bike && station ? (
                    <View style={styles.infoContainer}>
                        <Text style={globalStyles.title}>Detalles de la bicicleta</Text>
                        <Text style={globalStyles.subtitle}>Aqui podras observar detalles de la bicicleta</Text>
                        <MaterialIcons name="directions-bike" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{bike?.serialNumber}</Text>
                        <MaterialIcons name="location-on" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{station?.name}</Text>
                        <MaterialIcons name="info" size={24} color="#007bff" />
                        <Text style={globalStyles.infoText}>{showStatus(bike?.status)}</Text>
                        <View style={styles.actionsContainer}>
                            {
                                bike?.status === 'unavailable'
                                &&
                                <Pressable style={[globalStyles.grayButton, { marginHorizontal: 10 }]}>
                                    <Text
                                        style={globalStyles.buttonText}
                                        onPress={() => releaseBike(id)}
                                    >
                                        Liberar bicicleta
                                    </Text>
                                </Pressable>
                            }

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
                ) : (
                    <Text style={styles.loadingText}>Cargando...</Text>
                )
            }

            <View style={styles.infoContainer}>
                <View>
                    <Text style={globalStyles.title}>Historial de rentas</Text>
                    <Text style={globalStyles.subtitle}>Consulta los viajes realizados con esta bicicleta.</Text>
                </View>
                {
                    rentals.length > 0
                        ?
                        < FlatList
                            data={rentals}
                            keyExtractor={(rental) => rental._id}
                            renderItem={({ item }) => (
                                <View style={styles.rentalItem}>
                                    <MaterialIcons style={{ marginHorizontal: 10 }} name="date-range" size={24} color="#007bff" />
                                    <Text style={globalStyles.infoText}>
                                        {new Date(item.rentalStartTime).toLocaleDateString()}
                                    </Text>
                                    <Pressable style={styles.rentalButton} >
                                        <Text style={globalStyles.buttonText}>Ver detalles</Text>
                                    </Pressable>
                                </View>
                            )}
                        />
                        :
                        <Text style={globalStyles.subtitle}>No hay viajes registrados</Text>
                }
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
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
        marginVertical: 20
    },
    rentalsContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rentalItem: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rentalButton: {
        marginLeft: 20,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
    },
});

export default BikeDetails;