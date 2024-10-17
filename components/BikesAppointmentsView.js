import { View, Text, StyleSheet } from "react-native"

export const BikesAppointmentsView = () => {
    return (
        <View>
            <Text style={styles.title}>
                Citas Registradas
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        margin: 10
    }
})