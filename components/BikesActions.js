import React from "react";
import { useEffect, useState } from "react"
import { Text, StyleSheet, Pressable, TextInput, View } from "react-native"
import { useNavigation } from '@react-navigation/native';

export const BikesActions = () => {
    const navigation = useNavigation()
    const [text, setText] = useState('')

    useEffect(() => {
        console.log(text)
    }, [text])

    return (
        <View style={styles.sectionContainer}>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder={"Buscar"}
            />
            <Pressable onPress={() => navigation.navigate('AddBikeForm')} style={styles.button}>
                <Text style={styles.text}>Agregar nuevo</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    input: {
        height: 40,
        width: 180,
        padding: 10,
        borderWidth: '1px',
        borderRadius: '4px'
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: '6px'
    },
    text: {
        color: 'white'
    },
})