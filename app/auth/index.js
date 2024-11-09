import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
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
        // Here you can add your own login logic.
        if (userInput) {
            saveSession(userInput);
            router.push('/');   
        } else {
            alert('Por favor, ingresa tus credenciales.');
        }
    };

    return (
        <View style={[globalStyles.container, getInsets(), { justifyContent: 'center', alignItems: 'center' }]}>
            <View>
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

        </View>
    );
}