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
            <View style={styles.tableContainer}>
                <BikesTable />
            </View>
        </View>
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
        fontWeight: 'bold',
        color: '#333',
    },
    titleContainer: {
        width: '95%',
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 5,
        margin: 'auto',
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
    },
    tableContainer: {
        width: '95%',
        margin: 'auto',
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