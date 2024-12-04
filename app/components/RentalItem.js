import React from 'react'
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export const RentalItem = ({ rental }) => {

    
    return (
        <View style={styles.itemContainer}>
            <View style={styles.itemRow}>
                <MaterialIcons name="directions-bike" size={24} color="#007bff" />
                <Text style={styles.itemTitle}>Serial:</Text>
            </View>
            <View style={styles.itemRow}>
                <MaterialIcons name="event" size={24} color="#007bff" />
                <Text style={styles.itemText}> Fecha: {new Date(rental?.rentalStartTime).toLocaleDateString()} </Text>
            </View>
            <View style={styles.itemRow}>
                <MaterialIcons name="location-on" size={24} color="#007bff" />
                <Text style={styles.itemText}> Estación: {rental?.stationStart}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }).isRequired,
};