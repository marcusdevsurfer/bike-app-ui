import React from "react";
import { StyleSheet, View, Text } from "react-native"
import PropTypes from 'prop-types';

export const BikeItem = ({ bike }) => {
    return (
        <View style={styles.bikeItemContainer}>
            <View style={styles.bikeItemInformationContainer} >
                <Text style={styles?.bikeItemTitle}>{`SN: ${bike?.serialNumber}`}</Text>
                <Text>{`Estado: ${bike?.status}`}</Text>
                <Text>{`Modelo: ${bike?.model}`}</Text>
            </View>
            <View style={styles.bikeItemLocationContainer}>
                <Text>Estacion</Text>
                <Text>{bike?.station.name}</Text>
            </View>
        </View>
    )
}

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
        padding: 10,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: '4px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'gray',
    },
    bikeItemInformationContainer: {
        display: "flex",
        alignContent: 'center'
    },

    bikeItemLocationContainer: {
        display: "flex",
        alignContent: 'center',
        justifyContent: 'center'
    },

    bikeItemTitle: {
        fontSize: 18,
    }
});