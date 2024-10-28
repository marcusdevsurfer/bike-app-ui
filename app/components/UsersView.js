import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { HeaderNavigation } from './HeaderNavigation'
import { getInsets, globalStyles } from '../../styles/globalStyles'
import { MaterialIcons } from '@expo/vector-icons';

export const UsersView = () => {
  const [input, setInput] = useState('')
  return (
    <View style={[getInsets(), globalStyles.container]}>
      <HeaderNavigation />
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Usuarios Registrados</Text>
        <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
      </View>

      <View style={styles.findBarContainer}>
        <MaterialIcons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={globalStyles.input}
          onChangeText={setInput}
          value={input}
          placeholder='Buscar usuario'
        />
      </View>
      <Text>{input}</Text>
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
