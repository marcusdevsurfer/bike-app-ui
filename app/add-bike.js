import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { globalStyles } from '../styles/globalStyles';
import { HeaderNavigation } from './components/HeaderNavigation';
const stations = [
    { id: "1", name: "Soriana" },
    { id: "2", name: "Capdam" },
    { id: "3", name: "Brisas" }
];

const BikeForm = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [serialState, setSerialState] = useState('');
    const [modelState, setModelState] = useState('');
    const [selectedStation, setSelectedStation] = useState(null);

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
                    <Pressable style={[styles.cancelButton]} onPress={() => router.push('/')}>
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

export default function AddBike() {
    return (
        <BikeForm />
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