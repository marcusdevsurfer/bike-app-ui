import React from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const BikesActions = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.sectionContainer}>
            <TextInput
                style={styles.input}
                placeholder="Buscar bicicleta"
            />
            <Pressable
                onPress={() => navigation.navigate('AddBikeForm')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Agregar nuevo</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        height: 40,
        width: 180,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#f8f9fa',
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});