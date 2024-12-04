import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { HeaderNavigation } from "./HeaderNavigation";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { Link } from "expo-router";
import { fetchRentals } from "../misc/api";
import { RentalItem } from "./RentalItem";

export default function AppointmentsView() {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState(new Date());

    useEffect(() => {
        const fetchData = async () => {
            const rentals = await fetchRentals();
            setRentals(rentals);
            setLoading(false);
        }
        fetchData()
    }, []);

    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <View style={styles.sectionContainer}>
                <Text style={globalStyles.title}>Citas Registradas</Text>
                <Text style={globalStyles.subtitle}>Estas son las citas registradas para el dia de hoy.</Text>
            </View>
            <View style={styles.rentalsContainer}>
                {
                    loading ? <ActivityIndicator size="large" color="#007bff" /> :
                        rentals.length > 0 ? (
                            <FlatList
                                data={rentals.filter(rental => new Date(rental.rentalStartTime).toLocaleDateString() === today.toLocaleDateString())}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) =>
                                    <Link style={{margin: 0, padding: 0}} href={`/appointments/${item._id}`}>
                                        <RentalItem rental={item} />
                                    </Link>}
                                contentContainerStyle={styles.listContent}
                            />
                        ) : (
                            <Text style={globalStyles.subtitle}>No hay citas para hoy.</Text>
                        )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 20,
        marginVertical: 10, 
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    listContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});