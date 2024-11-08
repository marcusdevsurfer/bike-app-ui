import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, TextInput } from 'react-native'
import { globalStyles, getInsets } from '../../styles/globalStyles';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { API_URL } from '@env';

export default function CreateAppointmentToday() {
    const [stations, setStations] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredBikes, setFilteredBikes] = useState([]);
    const [selectedStation, setSelectedStation] = useState(null);
    const [inputUserName, setInputUserName] = useState(''); 


    useEffect(() => {
        fetchUsers();   
        fetchStations();
        fetchBikes();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await fetch(`${API_URL}/stations/`)
            const data = await response.json();
            setStations(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users/`)
            const data = await response.json();
            setUsers(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchBikes = async () => {
        try {
            const response = await fetch(`${API_URL}/bikes/`)
            const data = await response.json();
            setBikes(data);
        }
        catch (error) {
            console.error(error);
        }
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


            {/* User container */}
            <View style={styles.userContainer}>
                <TextInput onChangeText={setInputUserName} placeholder='Escribe tu nombre' style={globalStyles.input}></TextInput>
                <FlatList
                        data={users.filter(user => inputUserName === '' ? users : user.name.toLowerCase().includes(inputUserName.toLowerCase()))}  
                        keyExtractor={user => user._id}
                        horizontal={true}   
                        renderItem={({ item }) => (
                            <Pressable
                                style={
                                    {
                                        padding:10,
                                        marginHorizontal: 3,
                                        backgroundColor: '#9999',
                                        borderRadius: 10,
                                    }
                                }
                            >
                                <Text>
                                    {item?.name}
                                </Text>
                            </Pressable>
                        )}
                        contentContainerStyle={{ padding: 10 }}
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
                <Text style={styles.dateText}>Bicicletas:</Text>
                {
                    <FlatList
                        data={filteredBikes}
                        keyExtractor={bike => bike._id}
                        renderItem={({ item }) => (
                            <Pressable>
                                <Text>
                                    {item?.serialNumber}
                                </Text>
                            </Pressable>
                        )}
                        contentContainerStyle={{ padding: 10 }}
                    />
                }
            </View>

            {/* Submit container */}
            <View style={styles.submitContainer}>
                <Pressable style={styles.submitButton}
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
        padding: 20,
    },
    dateContainer: {
        marginBottom: 20,
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
        marginBottom: 20,
        alignItems: 'center',
    },
    stationsContainer: {
        marginBottom: 20,
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
        marginBottom: 20,
        alignItems: 'center',
    },
    submitContainer: {
        alignItems: 'center',
        marginBottom: 20,
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