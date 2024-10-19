import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const stations = [
    { id: "1", name: "Soriana" },
    { id: "2", name: "Capdam" },
    { id: "3", name: "Brisas" }
];


const BikeForm = () => {
    const [serialState, setSerialState] = useState('');
    const [modelState, setModelState] = useState('');
    const [selectedStation, setSelectedStation] = useState(null);

    const router = useRouter();

    useEffect(() => {
        console.log(`${serialState},${modelState}, ${selectedStation}`);
    }, [serialState, modelState]);

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

    const selectStation = (id) => {
        setSelectedStation(id);
    };

    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Añadir Bicicleta</Text>
            <TextInput
                style={styles.input}
                value={serialState}
                onChangeText={setSerialState}
                placeholder='Número de serial'
            />
            <TextInput
                style={styles.input}
                value={modelState}
                onChangeText={setModelState}
                placeholder='Modelo'
            />
            <FlatList
                data={stations}
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
            <View style={{
                flexDirection: 'row',
            }}>
                <Pressable style={[styles.cancelButton]} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => addBike()}>
                    <Text style={styles.buttonText}>Añadir</Text>
                </Pressable>
            </View>

        </View>
    );
}

export default function AddBike() {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <BikeForm />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    navigationButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginBottom: 20,
    },
    navigationButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    },
    item: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginVertical: 20,
        marginHorizontal: 10,
    },

    cancelButton: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    flatContent: {
        flexDirection: 'row',
    },
});