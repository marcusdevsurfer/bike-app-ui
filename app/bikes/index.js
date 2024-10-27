import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, TextInput, Pressable, Platform, ActivityIndicator, TouchableOpacity } from "react-native";
import { BikeItem } from "../../components/BikeItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { API_URL } from '@env';

const Header = () => {
    const router = useRouter()
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.push('/')}
            >
                <MaterialIcons name="arrow-back" size={24} color="#007bff" />
                <Text style={styles.backButtonText}>Inicio</Text>
            </TouchableOpacity>
        </View>
    )
}

const BikesTitle = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Registro de Bicicletas</Text>
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

BikesTable.propTypes = {
    bikes: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        serialNumber: PropTypes.string.isRequired,
        model: PropTypes.string,
        status: PropTypes.string.isRequired,
    }))
};


export default function BikesView() {
    const insets = useSafeAreaInsets()
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
        <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <Header />
            <BikesTitle />
            {isLoading ? <ActivityIndicator size="large" color="#007bff" />
                :
                <>
                    <BikesActions />
                    <BikesTable bikes={bikes} />
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        margin: 'auto',
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
    },

    titleContainer: {
        width: '100%'
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