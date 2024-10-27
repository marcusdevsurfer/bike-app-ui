import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { globalStyles } from '../../styles/globalStyles';
import { HeaderNavigation } from '../components/HeaderNavigation';
import { API_URL } from '@env';

export default function CreateBike() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [serialState, setSerialState] = useState('');
    const [modelState, setModelState] = useState('');
    const [selectedStation, setSelectedStation] = useState(null);
    const [stations, setStations] = useState([]);

    useEffect(() => {
        fetchStations();
    }, []);

    const fetchStations = async () => {
        try {
            const response = await fetch(`${API_URL}/stations`);
            const data = await response.json();
            setStations(data);
        } catch (error) {
            console.error('Error fetching stations:', error);
        }
    }

    const isFormValid = () => {
        return serialState.trim() !== '' && modelState.trim() !== '' && selectedStation !== null;
    };

    const addBike = async () => {
        const bike = {
            serialNumber: serialState,
            model: modelState,
            status: 'available',
            station: selectedStation,
        }
        if (!isFormValid()) {
            Alert.alert('Error', 'Todos los campos son requeridos');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/bikes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bike),
            });
            if (response.status !== 201) {
                throw new Error('Error adding bike');
            }
            Alert.alert('Bicicleta añadida', 'Bicicleta añadida correctamente');
            console.log('Bike added:', bike);
            clearForm();
        } catch (error) {
            console.error('Error adding bike:', error);
            Alert.alert('Error', 'Error añadiendo bicicleta');
        }
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
        <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <HeaderNavigation />
            <View style={styles.titleContainer}>
                <Text style={globalStyles.title}>Añadir Bicicleta</Text>
                <Text style={globalStyles.subtitle}>Añade una nueva bicicleta a el registro.</Text>
            </View>
            <View style={styles.formContainer}>

                <Text style={globalStyles.text}>Numero de serial</Text>
                <TextInput
                    style={globalStyles.input}
                    value={serialState}
                    onChangeText={setSerialState}
                    placeholder="ej. 0987AS" />

                <Text style={globalStyles.text}>Modelo</Text>
                <TextInput
                    style={globalStyles.input}
                    value={modelState}
                    onChangeText={setModelState}
                    placeholder="ej. 2020" />

                <FlatList
                    data={stations}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Pressable
                            style={[
                                styles.item,
                                selectedStation === item._id && styles.selectedItem
                            ]}
                            onPress={() => selectStation(item._id)}
                        >
                            <Text style={[
                                styles.itemText,
                                selectedStation === item._id && styles.selectedItemText
                            ]}>{item.name}</Text>
                        </Pressable>
                    )}
                    contentContainerStyle={styles.flatContent}
                />
                <View style={styles.submitActionsContainer}>
                    <Pressable style={[styles.cancelButton]} onPress={() => router.push('/bikes')}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => addBike()}>
                        <Text style={styles.buttonText}>Añadir</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    submitActionsContainer: {
        flexDirection: 'row'
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