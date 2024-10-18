import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList, Pressable, Alert } from 'react-native';

const stations = [
    { id: "1", name: "Soriana" },
    { id: "2", name: "Capdam" },
    { id: "3", name: "Brisas" }
];

export const AddBikeForm = () => {
    const [selectedStation, setSelectedStation] = useState(null);
    const [serialState, setSerialState] = useState('');
    const [modelState, setModelState] = useState('');

    useEffect(() => {
        console.log(`${serialState},${modelState}, ${selectedStation}`);
    }, [serialState, modelState]);

    const selectStation = (id) => {
        setSelectedStation(id);
    };

    const isFormValid = () => {
        return serialState.trim() !== '' && modelState.trim() !== '' && selectedStation !== null;
    };

    const addBike = () => {
        const bike = {
            serial: serialState,
            model: modelState,
            station: selectedStation,   
        }  
        if (!isFormValid()) {
            Alert.alert('Error', 'Todos los campos son requeridos');
            return;
        }
        Alert.alert('Bicicleta añadida', 'Bicicleta añadida correctamente');    
        console.log('Bike added:', bike);
        clearForm();
    };   

    const clearForm = () => {
        setSerialState('');
        setModelState('');
        setSelectedStation(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Añadir Bicicleta</Text>
            <TextInput style={styles.input} value={serialState} onChangeText={setSerialState} placeholder='Número de serial' />
            <TextInput style={styles.input} value={modelState} onChangeText={setModelState} placeholder='Modelo' />
            <View style={styles.flatContainer}>
                <FlatList
                    style={styles.flat}
                    data={stations}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Pressable
                            style={[
                                styles.item,
                                selectedStation === item.id && styles.selectedItem
                            ]}
                            onPress={() => selectStation(item.id)}
                        >
                            <Text style={[
                                styles.itemText,
                                selectedStation === item.id && styles.selectedItemText
                            ]}>{item.name}</Text>
                        </Pressable>
                    )}
                    contentContainerStyle={styles.flatContent}
                />
            </View>
            <Pressable style={styles.button} onPress={() => addBike()}>
                <Text style={styles.buttonText}>Añadir</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        margin: 10,
        padding: 10,
        height: 40,
        width: 250,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    flatContainer: {
        width: '100%',
        alignItems: 'center',
    },
    flat: {
        marginTop: 20,
    },
    flatContent: {
        justifyContent: 'center',
    },
    item: {
        padding: 10,
        marginHorizontal: 10,
        fontSize: 18,
        height: 44,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    selectedItem: {
        backgroundColor: '#007bff',
    },
    itemText: {
        color: '#000',
    },
    selectedItemText: {
        color: '#fff',
    },
});