import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, Platform, ActivityIndicator, Pressable } from "react-native";
import { BikeItem } from "../../components/BikeItem";
import { HeaderNavigation } from "../components/HeaderNavigation";
import { FindBar } from "../components/FindBar";
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
    flatContainer: {
        padding: 5,
        justifyContent: 'center',
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    },
});