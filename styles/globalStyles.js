import { StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const getInsets = () => {
    const insets = useSafeAreaInsets();
    return {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
    }
 }
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        margin: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    input: {
        width: Platform.OS === 'web' ? 400 : '80%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    }
});