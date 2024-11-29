import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { fetchStation } from '../misc/api';
import { showStatus } from '../misc/util';

export const BikeCard = ({ bike }) => {
    const [station, setStation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stationData = await fetchStation(bike?.station);
                setStation(stationData);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <Link href={`/bikes/${bike._id}`}>
            <View key={bike._id} style={styles.bikeItemContainer}>
                <View style={styles.bikeItemInformationContainer}>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="pedal-bike" size={25} color="#007bff" style={styles.icon} />
                        <Text style={styles.label}>Biclicleta:</Text>
                        <Text style={styles.value}>{bike?.serialNumber}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="info" size={25} color="#007bff" style={styles.icon} />
                        <Text style={styles.label}>Estado:</Text>
                        <Text style={styles.value}>{showStatus(bike?.status)}</Text>
                    </View>
                </View>
                <View style={styles.bikeItemLocationContainer}>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="location-on" size={25} color="#007bff" style={styles.icon} />
                        {!isLoading && <Text style={styles.value}>{station?.name}</Text>}
                    </View>

                </View>
            </View>
        </Link>
    );
};

BikeCard.propTypes = {
    bike: PropTypes.shape({
        _id: PropTypes.string,
        serialNumber: PropTypes.string,
        status: PropTypes.string,
        model: PropTypes.string,
    })
};

const styles = StyleSheet.create({
    bikeItemContainer: {
        width: '100%',
        padding: 20,
        marginBottom: 10,
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

    },
    bikeItemLocationContainer: {
        alignItems: 'flex-end',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 5,
    },
    value: {
        fontSize: 14,
        color: '#555',
    },
});

export default BikeCard;