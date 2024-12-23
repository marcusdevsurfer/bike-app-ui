import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export const HeaderNavigation = ({ path }) => {
    const router = useRouter()
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push(path ? path : '/')}
            >
                <MaterialIcons name="arrow-back" size={24} color="#007bff" />
                <Text style={styles.backButtonText}></Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 18,
        color: '#007bff',
        marginLeft: 5,
    }
});