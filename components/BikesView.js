import { BikesTable } from "./BikesTable"
import { Text, StyleSheet, View } from "react-native"
import { BikesActions } from "./BikesActions"
export const BikesView = () => {
    return (
        <View>
            <Text style={styles.title}>Registro de Bicicletas</Text>
            <BikesActions />
            <BikesTable />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        margin: 10
    }
})