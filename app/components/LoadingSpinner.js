import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

export const LoadingSpinner = () => {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator
                style={{ marginTop: 50 }}
                size="large"
                color="#007bff" />
        </View>

    )
}
const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
