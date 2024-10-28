import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { HeaderNavigation } from './HeaderNavigation'
import { getInsets, globalStyles } from '../../styles/globalStyles'
export const UsersView = () => {
  return (
    <View style={[getInsets(), globalStyles.container]}>
      <HeaderNavigation />
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Usuarios Registrados</Text>
        <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
      </View>
      <View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
