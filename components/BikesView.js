import React from "react";
import { BikesTable } from "./BikesTable";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import { BikesActions } from "./BikesActions";

export const BikesView = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro de Bicicletas</Text>
            <View style={styles.actionsContainer}>
                <BikesActions />
            </View>
            <View style={styles.tableContainer}>
                <BikesTable />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 35,
        margin: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    actionsContainer: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tableContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});