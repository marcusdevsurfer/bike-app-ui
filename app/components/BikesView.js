import React, { useEffect, useState } from "react";

import { View, StyleSheet, FlatList, Text, TextInput, Pressable, Platform, ActivityIndicator } from "react-native";

import { useRouter } from "expo-router";
import PropTypes from 'prop-types';
import { API_URL } from '@env';

import { BikeItem } from "../../components/BikeItem";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { globalStyles, getInsets } from "../../styles/globalStyles";

const HeaderContainer = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={globalStyles.title}>Registro de Bicicletas</Text>
            <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
        </View>
    );
}

const BikesActions = () => {
    const router = useRouter()
    return (
        <View style={styles.actionsContainer}>
            <TextInput
                style={styles.input}
                placeholder="Buscar bicicleta"
            />
            <Pressable
                onPress={() => router.push('bikes/create-bike')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Agregar nuevo</Text>
            </Pressable>
        </View>
    );
}

const BikesTable = ({ bikes }) => {
    return (
        <FlatList
            data={bikes}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <BikeItem bike={item}
            />}
            contentContainerStyle={styles.tableContainer}
        />
    )
}

export const BikesView = () => {
    const [bikes, setBikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchBikes()
    }, [])

    const fetchBikes = async () => {
        try {
            const response = await fetch(`${API_URL}/bikes`)
            const data = await response.json()
            setBikes(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={[getInsets(), globalStyles.container]}>
            <HeaderNavigation />
            <HeaderContainer />
            <BikesActions />
            {
                isLoading
                    ?
                    <ActivityIndicator
                        size="large"
                        color="#007bff" />
                    :
                    <BikesTable bikes={bikes} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        padding: 20,
        fontSize: 35,
        fontWeight: 'bold',
        color: '#333',
    },

    actionsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    tableContainer: {
        width: '100%',
        padding: 20,
        marginVertical: 10,
        borderRadius: 5,
        elevation: 3,
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    },

    input: {
        height: 40,
        width: Platform.OS === 'web' ? 400 : '50%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        backgroundColor: '#f8f9fa',
    },
    button: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});