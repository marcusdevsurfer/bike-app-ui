import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderNavigation } from "./HeaderNavigation";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { API_URL } from '@env';

const AppointmentItem = ({ appointment }) => {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemHeader}>
                <MaterialIcons name="directions-bike" size={24} color="#007bff" />
                <Text style={styles.itemTitle}>Serial:</Text>
            </View>
            <Text style={styles.itemText}><MaterialIcons name="event" size={16} color="#007bff" /> Fecha: {new Date(appointment?.rentalStartTime).toLocaleDateString()} </Text>
            <Text style={styles.itemText}><MaterialIcons name="schedule" size={16} color="#007bff" /> Hora: {new Date(appointment?.rentalStartTime).toLocaleTimeString()}</Text>
            <Text style={styles.itemText}><MaterialIcons name="location-on" size={16} color="#007bff" /> Estación: {appointment?.stationStart}</Text>
        </View>
    )
}
    ;

export default function AppointmentsView() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState(new Date());

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        try {
            const response = await fetch(`${API_URL}/rentals`);
            const data = await response.json();
            setRentals(data);
            setLoading(false);
        } catch (error) { console.log(error); }

    }

    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <Text style={globalStyles.title}>Citas Registradas</Text>
            {
                loading ? <ActivityIndicator size="large" color="#007bff" /> :
                    rentals.length > 0 ? (
                        <FlatList
                            data={rentals.filter(rental => new Date(rental.rentalStartTime).toLocaleDateString() === today.toLocaleDateString())}
                            keyExtractor={item => item._id}
                            renderItem={({ item }) => <AppointmentItem appointment={item} />}
                            contentContainerStyle={styles.listContent}
                        />
                    ) : (
                        <Text style={globalStyles.subtitle}>No hay citas para hoy.</Text>
                    )}
        </View>
    );
}


const styles = StyleSheet.create({
    bikeCount: {
        fontSize: 18,
        color: '#007bff',
    },
    itemContainer: {
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    listContent: {
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'no-wrap',
        justifyContent: 'center',
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    itemText: {
        fontSize: 16,
        marginVertical: 2,
    },
});