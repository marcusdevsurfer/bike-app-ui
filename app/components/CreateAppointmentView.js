import React, { useState } from 'react'
import { Text, View, StyleSheet, Pressable, Platform } from 'react-native'
import { globalStyles, getInsets } from '../../styles/globalStyles';
import { HeaderNavigation } from './HeaderNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';

const TextInput = Platform.OS === 'web' ? require('react-native-web').TextInput : require('react-native').TextInput;

export const CreateAppointmentView = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(true);
    const [showTimePicker, setShowTimePicker] = useState(true);
    const [bike, setBike] = useState('');

    const createAppointment = () => {
        if (!name || !bike) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        alert(`Cita creada para ${name} el ${date.toLocaleDateString()} a las ${time.toLocaleTimeString()}`);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const formatDateForInput = (date) => {
        const pad = (num) => (num < 10 ? '0' + num : num);
        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        return `${year}-${month}-${day}`;
    };

    const formatTimeForInput = (time) => {
        const pad = (num) => (num < 10 ? '0' + num : num);
        const hours = pad(time.getHours());
        const minutes = pad(time.getMinutes());
        return `${hours}:${minutes}`;
    };

    return (
        <View style={[globalStyles.container, getInsets()]}>
            <HeaderNavigation />
            <View style={styles.sectionContainer}>
                <Text style={globalStyles.title}>Crear reservacion.</Text>
                <Text style={globalStyles.subtitle}>Agenda una nueva cita y disfruta del servicio totalmente gratuito.</Text>
            </View>
            <View style={styles.formContainer}>
                {/* Name input */}
                <Text style={globalStyles.text}>Ingresa tu nombre</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={globalStyles.input}
                    placeholder="ej. Juan Perez" />

                {/* Date and time input */}
                <Text style={globalStyles.text}>Selecciona la fecha de tu cita</Text>
                {Platform.OS === 'web' && (
                    <input
                        type="date"
                        value={formatDateForInput(date)}
                        onChange={(e) => setDate(new Date(e.target.value))}
                        style={globalStyles.input}
                    />
                )}
                {showDatePicker && Platform.OS !== 'web' && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                {/* Time input */}
                <Text style={globalStyles.text}>Selecciona la hora de tu cita</Text>
                {Platform.OS === 'web' && (
                    <input
                        type="time"
                        value={formatTimeForInput(time)}
                        onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':');
                            const newTime = new Date(time);
                            newTime.setHours(hours);
                            newTime.setMinutes(minutes);
                            setTime(newTime);
                        }}
                        style={globalStyles.input}
                    />
                )}
                {showTimePicker && Platform.OS !== 'web' && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}

                {/* Bike seleccion input */}
                <Text style={globalStyles.text}>Selecciona tu bicicleta</Text>
                <TextInput
                    value={bike}
                    onChangeText={setBike}
                    style={globalStyles.input}
                    placeholder="ej. Bicleta" />

                <Pressable
                    onPress={createAppointment}
                    style={globalStyles.button}
                >
                    <Text style={globalStyles.buttonText}>Crear</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    datePickerButton: {
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
    },
});


