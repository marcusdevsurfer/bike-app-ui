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
    const [today] = useState(new Date());

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const rentals = await fetchRentals();
        const rentalsByToday = rentals.filter(rental => new Date(rental.rentalStartTime).toLocaleDateString() === today.toLocaleDateString());
        setRentals(rentalsByToday);
        setLoading(false);
    }
    
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
                                data={rentals}
                                keyExtractor={item => item._id}
                                renderItem={({ item }) =>
                                    <Link style={{ margin: 0, padding: 0 }} href={`/appointments/${item._id}`}>
                                        <RentalItem rental={item} />
                                    </Link>}
                                contentContainerStyle={styles.listContent}
                            />
                        ) : (
                            <Text style={styles.message}>No hay citas para hoy.</Text>
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
    listContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
    }
});