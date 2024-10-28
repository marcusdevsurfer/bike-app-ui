import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { HeaderNavigation } from './HeaderNavigation'
import { getInsets, globalStyles } from '../../styles/globalStyles'
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
})
