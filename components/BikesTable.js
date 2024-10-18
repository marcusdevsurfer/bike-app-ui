import React from 'react';
import { FlatList, View } from 'react-native';
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
    }
];

export const BikesTable = () => {
    return (
        <View>
            <FlatList
                data={bicicles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <BikeItem bike={item} />
                )}
            />
        </View>
    )
}




