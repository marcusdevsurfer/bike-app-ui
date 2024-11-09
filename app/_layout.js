import React from "react";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Layout() {
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            try {
                const session = await AsyncStorage.getItem('@session_key');
                if (!session) {
                    router.push('/auth');
                }
            } catch (e) {
                console.error('Failed to get session.', e);
            }
        };
        getSession();
    }, []);

    return (
        <View style={styles.container}>
            <Slot />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});