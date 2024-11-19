import React, { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { showAlert } from "../misc/util";
import { MaterialIcons } from "@expo/vector-icons";
import {API_URL} from "@env"; 
import { useRouter } from "expo-router";  

const Register = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const validateForm = () => {
        if (!name || !lastname || !email || !password) {
            showAlert("Error", "Por favor, rellena todos los campos.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showAlert("Error", "Por favor, introduce un email válido.");
            return false;
        }
        return true;
    };

    const registerUser = async () => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${name.trim()} ${lastname.trim()}`,
                    email: email,
                    password: password,
                    role: 'user',
                    phone: '00000000'
                }),
            });
            if (response.ok) {
                clearForm();
                showAlert("Registro", "Usuario registrado correctamente");
            }
        } catch (error) {
            showAlert("Error", "Error al registrar el usuario");    
            console.error(error + "Error al registrar el usuario");
        }
    }

    const handleRegister = () => {
        if (validateForm()) {
            registerUser();
            router.push('/auth');
        }
    };

    const clearForm = () => {
        setName("");
        setLastname("");
        setEmail("");
        setPassword("");
    }

    return (
        <View style={[globalStyles.container, getInsets(), styles.contentCentered]}>
            <MaterialIcons name="person-add" size={60} color="#007bff" />
            <Text style={globalStyles.title}>Registro</Text>
            <Text style={globalStyles.subtitle}>Crea una nueva cuenta</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Apellidos"
                value={lastname}
                onChangeText={setLastname}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Pressable style={globalStyles.button} onPress={handleRegister}>
                <Text style={globalStyles.buttonText}>
                    Registrar
                </Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    contentCentered: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Register;