import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, TextInput, Alert } from 'react-native'
import { globalStyles, getInsets } from '../../styles/globalStyles';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { API_URL } from '@env';
import { fetchAndSetUsers, fetchAndSetStations, fetchAndSetBikes } from '../misc/api';
import { FindBar } from '../components/FindBar';
import { showAlert } from '../misc/util';

export default function CreateAppointmentToday() {
    const [stations, setStations] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [userSelected, setUserSelected] = useState(null);
    const [bikeSelected, setBikeSelected] = useState(null);
    const [inputUserName, setInputUserName] = useState('');

    useEffect(() => {
        fetchAndSetUsers(setUsers);
        fetchAndSetStations(setStations)
        fetchAndSetBikes(setBikes);
    }, []);

    const createAppointment = async () => {
        if (!userSelected || !selectedStation || !bikeSelected) {
            showAlert('Error', 'Por favor selecciona un usuario, estación y bicicleta.');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/rentals`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: userSelected,
                    bike: bikeSelected,
                    stationStart: selectedStation,
                    rentalStartTime: new Date(),
                })
            });
            const data = await response.json();
            clearSelections();
            Alert.alert('Cita Reservada', 'Tu cita ha sido reservada exitosamente.');
            console.log(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const clearSelections = () => {
        setSelectedStation(null);
        setUserSelected(null);
        setBikeSelected(null);
    }

    const filterBikes = (stationId) => {
        const filtered = bikes.filter(bike => bike.station === stationId && bike.status === 'available');
        setFilteredBikes(filtered);
    };

    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <View style={styles.sectionContainer}>
                <Text style={globalStyles.title}>Programar Cita</Text>
                <Text style={globalStyles.subtitle}>Reserva una cita para hoy y aprovecha nuestros servicios gratuitos.</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Fecha de Hoy:</Text>
                <Text style={styles.dateValue}>{new Date().toLocaleDateString()}</Text>
            </View>

            <View style={styles.userContainer}>
                <FindBar value={inputUserName} setValue={setInputUserName} />
                <FlatList
                    style={{ marginVertical: 10 }}
                    data={users.filter(user => inputUserName === '' ? users : user.name.toLowerCase().includes(inputUserName.toLowerCase()))}
                    keyExtractor={user => user._id}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Pressable
                            style={
                                [
                                    styles.userButton,
                                    userSelected === item._id && { backgroundColor: '#666' }
                                ]
                            }
                            onPress={() => setUserSelected(item._id)}
                        >
                            <Text
                                style={
                                    [
                                        styles.userButtonText,
                                        userSelected === item._id && { color: 'white' }
                                    ]
                                }
                            >
                                {item?.name}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>

            <View style={styles.stationsContainer}>
                <Text style={styles.dateText}>Selecciona una Estación:</Text>
                <FlatList
                    data={stations}
                    keyExtractor={item => item._id}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Pressable style={[
                            styles.stationButton,
                            selectedStation === item._id && styles.selectedStationButton
                        ]}
                            onPress={() => {
                                setSelectedStation(item._id);
                                filterBikes(item._id);
                            }}
                        >
                            <Text style={[
                                styles.stationButtonText,
                                selectedStation === item._id && styles.selectedStationButtonText
                            ]}>
                                {item?.name}
                            </Text>
                        </Pressable>
                    )}
                    contentContainerStyle={{ margin: 10 }}
                />
            </View>

            <View style={styles.bikesContainer}>
                <Text style={styles.dateText}>Escoge Bicicleta:</Text>
                {
                    <FlatList
                        data={filteredBikes}
                        keyExtractor={bike => bike._id}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.bikeButton, bikeSelected === item._id && styles.selectedBikeButton
                                ]}
                                onPress={() => setBikeSelected(item._id)}
                            >
                                <Text
                                    style={[
                                        styles.bikeButtonText,
                                        bikeSelected === item._id && styles.selectedBikeButtonText
                                    ]}
                                >
                                    {item?.serialNumber}
                                </Text>
                            </Pressable>
                        )}
                        contentContainerStyle={{ margin: 10 }}
                    />
                }
            </View>

            {/* Submit container */}
            <View style={styles.submitContainer}>
                <Pressable style={styles.submitButton}
                    onPress={createAppointment}
                >
                    <Text style={styles.submitButtonText}>Reservar Cita</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    dateContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 18,
        color: '#333',
    },
    dateValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007bff',
    },
    userContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userButton: {
        padding: 10,
        marginHorizontal: 3,
        backgroundColor: '#9999',
        borderRadius: 8,
    },
    userButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },

    stationsContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    stationButton: {
        padding: 10,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    selectedStationButton: {
        backgroundColor: '#007bff',
    },
    stationButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedStationButtonText: {
        color: '#fff',
    },

    bikesContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bikeButton: {
        padding: 10,
        marginHorizontal: 3,
        backgroundColor: '#9999',
        borderRadius: 8,
    },
    bikeButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedBikeButton: {
        backgroundColor: '#666',
    },
    selectedBikeButtonText: {
        color: '#fff',
    },

    submitContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 10,
    },
    submitButton: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});