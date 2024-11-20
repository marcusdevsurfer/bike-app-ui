import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { HeaderNavigation } from "../components/HeaderNavigation";

const AppointmentDetails = () => {
    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <View style={styles.headerContainer}>
                <Text style={globalStyles.title}>Detalles de la cita</Text>
                <Text style={globalStyles.subtitle}>Revisa los detalles de la cita que has programado.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: 'center',
        marginBottom: 10
    }
});


export default AppointmentDetails;