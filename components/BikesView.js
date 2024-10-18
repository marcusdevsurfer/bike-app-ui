import React from "react";
import { BikesTable } from "./BikesTable";
import { Text, StyleSheet, View, Platform } from "react-native";
import { BikesActions } from "./BikesActions";

export const BikesView = () => {

    return (
        <View contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Registro de Bicicletas</Text>
            </View>
            <View style={styles.actionsContainer}>
                <BikesActions />
            </View>
            <BikesTable />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
    },

    titleContainer: {
        width: '95%',
        marginBottom: 5,
        padding: 15,
        alignItems: Platform.OS == 'ios' && 'center'
    },

    actionsContainer: {
        width: '95%',
        margin: 'auto',
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
});