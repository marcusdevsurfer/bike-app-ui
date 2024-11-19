import React, { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { showAlert } from "../misc/util";
import { MaterialIcons } from "@expo/vector-icons";
const Register = () => {
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

    const handleRegister = () => {
        if (validateForm()) {
            showAlert("Registro", `Nombre: ${name} ${lastname}, Email: ${email}, Password: ${password}`);
            console.log("Register", { name, lastname, email, password });
        }
    };

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