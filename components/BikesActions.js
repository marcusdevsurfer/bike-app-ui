import { useEffect, useState } from "react"
import { Text, StyleSheet, Pressable, TextInput, View } from "react-native"

export const BikesActions = () => {
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
            <Pressable style={styles.button}>
                <Text style={styles.text}>Agregar</Text>
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
        padding: 8,
        backgroundColor: 'black',
        borderRadius: '4px'
    },
    text: {
        color: 'white'
    },
})