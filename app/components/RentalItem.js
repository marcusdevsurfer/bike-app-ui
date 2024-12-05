import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { fetchBike, fetchStation } from '../misc/api';
export const RentalItem = ({ rental }) => {

    const [bike, setBike] = useState(null);
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);   


    useState(() => {
        const fetchData = async () => {
            const bike = await fetchBike(rental?.bike);
            setBike(bike);
            const station = await fetchStation(rental?.stationStart);
            setStation(station);
            setLoading(false);  
        }
        fetchData();
    }, []);

    return (
        loading ? <ActivityIndicator style={{marginVertical: 20}} size="large" color="#007bff" /> :
            <View style={styles.itemContainer}>
                <View style={styles.itemRow}>
                    <MaterialIcons name="directions-bike" size={30} color="#007bff" />
                    <Text style={styles.itemTitle}>Serial: {bike?.serialNumber}</Text>
                </View>
                <View style={styles.itemRow}>
                    <MaterialIcons name="event" size={30} color="#007bff" />
                    <Text style={styles.itemText}> Fecha: {new Date(rental?.rentalStartTime).toLocaleDateString()} </Text>
                </View>
                <View style={styles.itemRow}>
                    <MaterialIcons name="location-on" size={30} color="#007bff" />
                    <Text style={styles.itemText}> Estación: {station?.name}</Text>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        width: Platform.OS === 'web' ? 350 : 300,
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
    itemRow: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitle: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemText: {
        marginLeft: 5,
        fontSize: 16,
    },
});


RentalItem.propTypes = {
    rental: PropTypes.shape({
        rentalStartTime: PropTypes.string.isRequired,
        stationStart: PropTypes.string.isRequired,
        bike: PropTypes.string.isRequired,
    }).isRequired,
};