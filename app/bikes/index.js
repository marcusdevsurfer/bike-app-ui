import React from "react";
import { View, StyleSheet, FlatList, Text, TextInput, Pressable, Platform } from "react-native";
import { BikeItem } from "../../components/BikeItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const bikes = [
    { id: '1', serialNumber: '1234AB', model: "2022", status: "available", station: { name: "Soriana" } },
    { id: '2', serialNumber: '5678CD', model: "2023", status: "in use", station: { name: "Capdam" } },
    { id: '3', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
    { id: '4', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
    { id: '5', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
    { id: '6', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
    { id: '7', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
    { id: '8', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
    { id: '9', serialNumber: '7678HG', model: "2024", status: "in repair", station: { name: "Brisas" } },
];

const BikesTitle = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Registro de Bicicletas</Text>
        </View>
    );
}

const HomeButton = () => {
    const router = useRouter()
    return (
        <Pressable style={styles.homeButton} onPress={() => router.push('/')}>
            <Text style={styles.buttonText}>Inicio</Text>
        </Pressable>
    )
}

const BikesActions = () => {
    const router = useRouter()
    return (
        <View style={styles.actionsContainer}>
            <TextInput
                style={styles.input}
                placeholder="Buscar bicicleta"
            />
            <Pressable
                onPress={() => router.push('/add-bike')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Agregar nuevo</Text>
            </Pressable>
        </View>
    );
}
const BikesTable = () => {
    return (
        <FlatList
            data={bikes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BikeItem bike={item}
            />}
            contentContainerStyle={styles.tableContainer}
        />
    )
}

export default function BikesView() {
    const insets = useSafeAreaInsets()
    return (
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <HomeButton />
            <BikesTitle />
            <BikesActions />
            <BikesTable />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        width: '95%',
        margin: 'auto',
        padding: 20,
    },

    homeButton: {
        width: 'auto',
        padding: 10,
        backgroundColor: '#007bff',
        justifyContent: 'flex-start'
    },

    actionsContainer: {
        width: '95%',
        marginHorizontal: 'auto',
        marginTop: 10,
        marginBottom: 20,
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

    tableContainer: {
        width: '95%',
        marginVertical: 10,
        marginHorizontal: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        height: 40,
        width: Platform.OS === 'web' ? 400 : '50%',
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