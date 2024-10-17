import { Text, SafeAreaView, Pressable, StyleSheet } from "react-native"
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.button} onPress={() => navigation.navigate('BikesView')}>
                <Text style={styles.text}>Administrar bicicletas</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('BikesAppointmentsView')}>
                <Text style={styles.text}>Citas</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    button: {
        flexGrow: 1,
        backgroundColor: 'black',
        padding: 30,
        margin: 10,
        borderRadius: '20px'
    },
    text: {
        color: 'white',
        fontSize: 22
    },
});