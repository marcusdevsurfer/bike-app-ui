import React from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { BikeItem } from './BikeItem';


const bicicles = [
    {
        id: '1',
        serialNumber: 'YGYU22',
        model: "2020",
        status: "available",
        station: {
            id: "1",
            name: "Soriana"
        }
    },
    {
        id: '2',
        serialNumber: 'IJUHT5',
        model: "2019",
        status: "available",
        station: {
            id: "2",
            name: "Capdam"
        }
    },
    {
        id: '3',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
    {
        id: '4',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
    {
        id: '5',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
    {
        id: '6',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
    {
        id: '7',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
    {
        id: '8',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
    {
        id: '9',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    }, {
        id: '10',
        serialNumber: '7678HG',
        model: "2024",
        status: "in repair",
        station: {
            id: "3",
            name: "Brisas"
        }
    },
];

export const BikesTable = () => {
    return (
        <FlatList
            style={styles.flat}
            data={bicicles}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <BikeItem bike={item} />
            )}
            numColumns={Platform.OS === 'web' ? 5 : 1}
            contentContainerStyle={{
                justifyContent: 'center',
                alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
            }
            }
        />
    )
}

const styles = StyleSheet.create({
    flat: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

