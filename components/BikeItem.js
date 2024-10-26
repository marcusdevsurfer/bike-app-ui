import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export const BikeItem = ({ bike }) => {
    return (
        <View key={bike._id} style={styles.bikeItemContainer}>
            <View style={styles.bikeItemInformationContainer}>
                <Text style={styles.label}>Estado:</Text>
                <Text style={styles.value}>{bike?.status}</Text>
                <Text style={styles.label}>Modelo:</Text>
                <Text style={styles.value}>{bike?.model}</Text>
            </View>
            <View style={styles.bikeItemLocationContainer}>
                <Text style={styles.label}>Serial number:</Text>
                <Text style={styles.value}>{bike?.serialNumber}</Text>
                {/* <Text style={styles.label}>Estación:</Text>
                <Text style={styles.value}>{bike?.station.name}</Text> */}
            </View>
        </View>
    );
};

BikeItem.propTypes = {
    bike: PropTypes.shape({
        _id: PropTypes.string,
        serialNumber: PropTypes.string,
        status: PropTypes.string,
        model: PropTypes.string,

    })
};

const styles = StyleSheet.create({
    bikeItemContainer: {
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bikeItemInformationContainer: {
        marginRight: 30,
    },
    bikeItemLocationContainer: {
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