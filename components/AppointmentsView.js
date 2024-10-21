import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const fetchAppointments = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', bikeSerial: '1234AB', date: '2024-10-22', time: '10:00 AM', station: 'Soriana' },
                { id: '2', bikeSerial: '5678CD', date: '2024-10-21', time: '11:00 AM', station: 'Capdam' },
                { id: '3', bikeSerial: '7678HG', date: '2024-10-21', time: '12:00 PM', station: 'Brisas' },
                { id: '4', bikeSerial: '7678HG', date: '2024-10-21', time: '12:00 PM', station: 'Brisas' },
                { id: '5', bikeSerial: '7678HG', date: '2024-10-21', time: '12:00 PM', station: 'Brisas' },]);
        }, 2000);
    });
};

const getTodayAppointments = (appointments) => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(appointment => appointment.date === today);
};

const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const AppointmentItem = ({ appointment }) => (
    <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
            <MaterialIcons name="directions-bike" size={24} color="#007bff" />
            <Text style={styles.itemTitle}>Serial: {appointment.bikeSerial}</Text>
        </View>
        <Text style={styles.itemText}><MaterialIcons name="event" size={16} color="#007bff" /> Fecha: {appointment.date}</Text>
        <Text style={styles.itemText}><MaterialIcons name="schedule" size={16} color="#007bff" /> Hora: {appointment.time}</Text>
        <Text style={styles.itemText}><MaterialIcons name="location-on" size={16} color="#007bff" /> Estación: {appointment.station}</Text>
    </View>
);

export default function AppointmentsView() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAppointments().then(data => {
            setAppointments(getTodayAppointments(data));
            setLoading(false);
        });
    }, []);

    const today = new Date().toISOString().split('T')[0];
    const formattedToday = formatDate(today);


    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#007bff" />
                    <Text style={styles.backButtonText}>Inicio</Text>
                </TouchableOpacity>
                <Text style={styles.bikeCount}>Bicicletas: {appointments.length}</Text>
            </View>
            <Text style={styles.title}>Citas Registradas</Text>
            <Text style={styles.subtitle}>Hoy es {formattedToday}. Mostrando citas para hoy.</Text>
            {
                loading ? <ActivityIndicator size="large" color="#007bff" /> :
                    appointments.length > 0 ? (
                        <FlatList
                            data={appointments}
                            renderItem={({ item }) => <AppointmentItem appointment={item} />}
                            keyExtractor={item => item.id}
                            horizontal={Platform.OS === 'web'}
                            contentContainerStyle={styles.listContent}
                        />
                    ) : (
                        <Text style={styles.noAppointmentsText}>No hay citas para hoy.</Text>
                    )}
        </View>
    );
}

AppointmentItem.propTypes = {
    appointment: PropTypes.shape({
        bikeSerial: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        station: PropTypes.string.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 18,
        color: '#007bff',
        marginLeft: 5,
    },
    bikeCount: {
        fontSize: 18,
        color: '#007bff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    listContent: {
        width: '100%',
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemContainer: {
        padding: 30,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    loadingText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
    noAppointmentsText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    },
});