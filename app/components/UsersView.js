import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native'
import { HeaderNavigation } from './HeaderNavigation'
import { getInsets, globalStyles } from '../../styles/globalStyles'
import { MaterialIcons } from '@expo/vector-icons';

export const UsersView = () => {
  const [input, setInput] = useState('')
  return (
    <View style={[getInsets(), globalStyles.container]}>
      <HeaderNavigation />
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Usuarios Registrados</Text>
        <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
      </View>
      {/* Find Bar */}
      <View style={styles.findBarContainer}>
        <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={globalStyles.input}
          onChangeText={setInput}
          value={input}
          placeholder='Buscar usuario'
        />
      </View>
      {/* Items (Users) */}
      <FlatList
        data={[
          { key: '1', name: 'Juan', email: 'Perez', password: '',role: 'admin', phone: '', membershipStatus: 'active', createdAt: '' },]}
        renderItem={({ item }) => (<Text>{item.name} {item.lastName}</Text>)}
        contentContainerStyle={{ flex: 1, backgroundColor : '', margin: 10, padding: 10 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  findBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  searchIcon: {
    marginHorizontal: 5,
  }
})
