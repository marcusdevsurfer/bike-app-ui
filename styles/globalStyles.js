import { StyleSheet } from 'react-native';
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
        color: '#999', // Lighter gray color
        margin: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    infoText: {
        fontSize: 18,
        color: '#333',
        marginVertical: 10,
    },
    button: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    grayButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#b0b0b0', // Lighter gray color
        borderRadius: 8,
        alignItems: 'center',
    },
    redButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#dc3545',
        borderRadius: 8,
        alignItems: 'center',
    },
    strongBlueButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#0000ff', // Strong blue color
        borderRadius: 8,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
    }
});