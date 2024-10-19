import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PropTypes from 'prop-types';

const appointments = [
    { id: '1', bikeSerial: '1234AB', date: '2023-10-01', time: '10:00 AM', station: 'Soriana' },
    { id: '2', bikeSerial: '5678CD', date: '2023-10-02', time: '11:00 AM', station: 'Capdam' },
    { id: '3', bikeSerial: '7678HG', date: '2023-10-03', time: '12:00 PM', station: 'Brisas' },
];

const AppointmentItem = ({ appointment }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Serial: {appointment.bikeSerial}</Text>
        <Text style={styles.itemText}>Fecha: {appointment.date}</Text>
        <Text style={styles.itemText}>Hora: {appointment.time}</Text>
        <Text style={styles.itemText}>Estación: {appointment.station}</Text>
    </View>
);
export default function AppointmentsView() {
    const insets = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <Text style={[styles.title, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>Citas Registradas</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <AppointmentItem appointment={item} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}

AppointmentItem.propTypes = {
    appointment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        bikeSerial: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        station: PropTypes.string.isRequired,
    }).isRequired,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContent: {
        width: '100%',
    },
    itemContainer: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
});
