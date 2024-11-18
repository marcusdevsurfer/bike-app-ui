import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { showAlert } from "../misc/util";
import { MaterialIcons } from '@expo/vector-icons';

export default function AuthIndex() {
    const [userInput, setUserInput] = useState('');
    const router = useRouter();

    const saveSession = async (value) => {
        try {
            await AsyncStorage.setItem('@session_key', value);
        } catch (e) {
            console.error('Failed to save session.', e);
        }
    };

    const handleLogin = () => {
        if (userInput) {
            saveSession(userInput);
            showAlert('Bienvenido', 'Has iniciado sesión correctamente.');
            router.push('/');
        } else {
            showAlert('Error', 'Por favor, ingresa un usuario o correo electrónico');
        }
    };

    return (
        <View style={[globalStyles.container, getInsets(), styles.container]}>
            <MaterialIcons name="person" size={60} color="#007bff" />
            <Text style={globalStyles.title}>Iniciar sesión</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Usuario o correo electronico"
                value={userInput}
                onChangeText={setUserInput}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Contraseña"
            >
            </TextInput>

            <Pressable
                style={globalStyles.button}
                onPress={handleLogin}
            >
                <Text style={globalStyles.buttonText}>
                    Entrar
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%'
    }
});