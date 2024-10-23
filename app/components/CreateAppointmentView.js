import React from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalStyles } from '../../styles/globalStyles';
import { HeaderNavigation } from './HeaderNavigation';

export const CreateAppointmentView = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[globalStyles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <HeaderNavigation />
            <View style={styles.sectionContainer}>
                <Text style={globalStyles.title}>Crear</Text>
                <Text style={globalStyles.subtitle}>Agenda una nueva cita y disfruta del servicio totalmente gratuito.</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Name input */}
                <Text style={globalStyles.text}>Ingresa tu nombre</Text>
                <TextInput style={globalStyles.input} placeholder="ej. Juan Perez" />
                {/* Date input */}
                <Text style={globalStyles.text}>Selecciona la fecha y hora de tu cita</Text>
                <TextInput style={globalStyles.input} placeholder="ej. Dia / Mes / Año" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        padding: 20,
    },
    formContainer: {
        padding: 20,
    },
});


