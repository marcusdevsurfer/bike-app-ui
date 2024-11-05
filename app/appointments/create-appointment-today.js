import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native'
import { globalStyles, getInsets } from '../../styles/globalStyles';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { API_URL } from '@env';

export default function CreateAppointmentToday() {
    const [stations, setStations] = useState({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        fetchStations();    
    }, []);

    useEffect(() => {
        if (selectedStation == null) {
            return;
        }
    }, [selectedStation]);

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
    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <View style={styles.sectionContainer}>
                <Text style={globalStyles.title}>Programar Cita</Text>
                <Text style={globalStyles.subtitle}>Reserva una cita para hoy y aprovecha nuestros servicios gratuitos.</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>Fecha de Hoy:</Text>
                <Text style={styles.dateValue}>{currentDate.toLocaleDateString()}</Text>
            </View>
            <View style={styles.stationsContainer}>
                <Text style={styles.dateText}>Estaciones:</Text>
                <FlatList
                    data={stations}
                    keyExtractor={item => item._id}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Pressable style={[
                            styles.stationButton,
                            selectedStation === item && styles.selectedStationButton
                        ]}
                            onPress={() => setSelectedStation(item)}
                        >
                            <Text style={[
                                styles.stationButtonText,
                                selectedStation === item && styles.selectedStationButtonText
                            ]}>
                                {item?.name}
                            </Text>
                        </Pressable>
                    )}
                    contentContainerStyle={{ margin: 10 }}
                />
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
    submitButton: {
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});