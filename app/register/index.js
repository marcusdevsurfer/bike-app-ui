import React, { useState } from "react"
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { showAlert } from "../misc/util";
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const validateForm = () => {
        if (!username || !email || !password) {
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
            showAlert("Registro", `Usuario: ${username}, Email: ${email}, Password: ${password}`);
            console.log("Register", { username, email, password });
        }
    };

    return (
        <View style={[globalStyles.container, getInsets(), styles.contentCentered]}>
            <Text style={globalStyles.title}>Register</Text>
            <TextInput
                style={globalStyles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={globalStyles.input}
                placeholder="Password"
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