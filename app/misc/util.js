import { Platform, Alert } from "react-native"


export const showAlert = (title, message) => {  
    if (Platform.OS === 'web') {
        alert(`${title}: ${message}`);
    } else {
        Alert.alert(title, message);
    }
}

export const showStatus = (status) => {
    switch (status) {
        case 'available':
            return 'Disponible';
        case 'unavailable':
            return 'En uso';
        case 'maintenance':
            return 'En mantenimiento';
        default:
            return 'Desconocido';
    }
}