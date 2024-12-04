import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderNavigation } from "./HeaderNavigation";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { Link } from "expo-router";
import PropTypes from 'prop-types';
import { fetchRentals } from "../misc/api";

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
};

export default function AppointmentsView() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            const rentals = await fetchRentals();
            setRentals(rentals);
            setLoading(false);
        }
        fetchData()
    }, []);

    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <View style={styles.sectionContainer}>
                <Text style={globalStyles.title}>Citas Registradas</Text>
                <Text style={globalStyles.subtitle}>Estas son las citas registradas para el dia de hoy.</Text>
            </View>
            <View style={styles.rentalsContainer}>
                {
                    loading ? <ActivityIndicator size="large" color="#007bff" /> :
                        rentals.length > 0 ? (
                            <FlatList
                                data={rentals.filter(rental => new Date(rental.rentalStartTime).toLocaleDateString() === today.toLocaleDateString())}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) =>
                                    <Link href={`/appointments/${item._id}`}>
                                        <AppointmentItem appointment={item} />
                                    </Link>}
                                contentContainerStyle={styles.listContent}
                            />
                        ) : (
                            <Text style={globalStyles.subtitle}>No hay citas para hoy.</Text>
                        )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 20,
        marginVertical: 10, 
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    listContent: {
        justifyContent: 'center',
        alignItems: 'center',
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


AppointmentItem.propTypes = {
    appointment: PropTypes.shape({
        rentalStartTime: PropTypes.string.isRequired,
        stationStart: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
    }).isRequired,
};