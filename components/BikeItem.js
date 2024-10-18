import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const BikeItem = ({ bike }) => {
    return (
        <View style={styles.bikeItemContainer}>
            <View style={styles.bikeItemInformationContainer}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.value}>{bike?.status}</Text>
                <Text style={styles.label}>Modelo:</Text>
                <Text style={styles.value}>{bike?.model}</Text>
            </View>
            <View style={styles.bikeItemLocationContainer}>
                <Text style={styles.label}>Estación:</Text>
                <Text style={styles.value}>{bike?.station.name}</Text>
            </View>
        </View>
    );
};

BikeItem.propTypes = {
    bike: PropTypes.shape({
        serialNumber: PropTypes.string,
        status: PropTypes.string,
        model: PropTypes.string,
        station: PropTypes.shape({
            name: PropTypes.string
        })
    })
};

const styles = StyleSheet.create({
    bikeItemContainer: {
        padding: 15,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bikeItemInformationContainer: {
        flex: 1,
        marginRight: 10,
    },
    bikeItemLocationContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
});