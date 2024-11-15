import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export const FindBar = ({placeholder = 'Buscar', value, setValue }) => {
    return (
        <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#666"
                value={value}
                onChangeText={setValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        marginBottom: Platform.OS === 'web' ? 20 : 10,  
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
    }
})


