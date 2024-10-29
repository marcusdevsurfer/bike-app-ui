import React, { useEffect, useState } from "react";

import { View, StyleSheet, FlatList, Text, TextInput, Pressable, Platform, ActivityIndicator } from "react-native";
import { API_URL } from '@env';
import { MaterialIcons } from '@expo/vector-icons';
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
    return (
        <View style={styles.actionsContainer}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Buscar bicicleta"
                    placeholderTextColor="#666"
                />
            </View>
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
        textAlign: 'justify',
        justifyContent: 'center',
        alignItems: 'center',
    },

    actionsContainer: {
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 5,
    },
    searchContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,

    },
    tableContainer: {
        padding: 10,
        justifyContent: 'center',
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
    },
});