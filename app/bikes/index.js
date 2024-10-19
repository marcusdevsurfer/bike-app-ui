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
];

const BikesTitle = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Registro de Bicicletas</Text>
        </View>
    );
}

const BikesActions = () => {
    const router = useRouter()
    return (
        <View style={styles.sectionContainer}>
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
        <View style={styles.tableContainer}>
            <FlatList
                data={bikes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <BikeItem bike={item}
                />}
                contentContainerStyle={{
                    justifyContent: 'center',
                    flexDirection: Platform.OS === 'web' && 'row',
                    flexWrap: Platform.OS === 'web' && 'wrap',
                }}
            />
        </View>
    )
}

export default function BikesView() {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    return (
        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }
        }>
            <View style={{
                alignItems: 'flex-start',
            }}>
                <Pressable
                    style={{
                        padding: 10,
                        backgroundColor: '#007bff',
                    }}
                    onPress={() => router.push('/')}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>Inicio</Text>
                </Pressable>
            </View>
            <BikesTitle />
            <BikesActions />
            <BikesTable />
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        margin: 10,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tableContainer: {
        flex: 1,
        margin: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
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
    backButton: {

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});