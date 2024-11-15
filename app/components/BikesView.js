import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, TextInput, Platform, ActivityIndicator, Pressable } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { BikeItem } from "../../components/BikeItem";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { globalStyles, getInsets } from "../../styles/globalStyles";
import { router } from "expo-router";
import { fetchAndSetBikes } from "../misc/api";

const HeaderContainer = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={globalStyles.title}>Registro de Bicicletas</Text>
            <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
        </View>
    );
}

const FindBar = ({ value, setValue }) => {
    return (
        <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
            <TextInput
                style={styles.input}
                placeholder="Buscar bicicleta"
                placeholderTextColor="#666"
                value={value}
                onChangeText={setValue}
            />
        </View>

    );
}

export const BikesView = () => {
    const [bikes, setBikes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        fetchAndSetBikes(setBikes)
        setIsLoading(false)
    }, [])

    return (
        <View style={[getInsets(), globalStyles.container]}>
            <HeaderNavigation />
            <Pressable
                onPress={() => router.push('/bikes/create-bike')}
                style={styles.button}>
                <Text style={globalStyles.buttonText}>Nuevo</Text>
            </Pressable>
            <HeaderContainer />
            <FindBar value={inputValue} setValue={setInputValue} />
            {
                isLoading
                    ?
                    <ActivityIndicator
                        size="large"
                        color="#007bff" />
                    :
                    <FlatList
                        data={bikes.filter((bike) => bike.serialNumber.includes(inputValue))}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <BikeItem bike={item}
                        />}
                        contentContainerStyle={styles.flatContainer}
                    />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        backgroundColor: '#007bff',
    },
    headerContainer: {
        textAlign: 'justify',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    searchContainer: {
        width: '80%',
        marginHorizontal: 'auto',
        paddingVertical: 10,
        paddingHorizontal: 20,
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
        height: 30,
        fontSize: 16,
    },
    flatContainer: {
        padding: 5,
        justifyContent: 'center',
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    },
});