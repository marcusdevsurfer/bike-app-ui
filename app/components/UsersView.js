import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native'
import { HeaderNavigation } from './HeaderNavigation'
import { FindBar } from './FindBar'
import { getInsets, globalStyles } from '../../styles/globalStyles'
import { UserCard } from './UserCard';
import { fetchAndSetUsers } from '../misc/api'

export const UsersView = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAndSetUsers(setUsers)
    setLoading(false)
  }, [])

  return (
    <View style={[getInsets(), globalStyles.container]}>
      <HeaderNavigation />
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Usuarios Registrados</Text>
        <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
      </View>
      <FindBar placeholder={'Introduzca el nombre del usuario'} value={input} setValue={setInput} />
      {
        loading ?
          <ActivityIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="large" />
          :
          <FlatList
            data={users.filter(user => user.name.toLowerCase().includes(input.toLowerCase()))}
            renderItem={({ item }) => (<UserCard user={item} />)}
            contentContainerStyle={styles.flatContent}
          />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatContent: {
    padding: 5,
    justifyContent: 'center',
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
  }
})
