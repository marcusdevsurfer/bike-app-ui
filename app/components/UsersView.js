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
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={globalStyles.title}>Usuarios Registrados</Text>
        <Text style={globalStyles.subtitle}>Aqui se muestran los usuarios registrados en la aplicacion.</Text>
      </View>
      <FindBar value={input} setValue={setInput} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatContent: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    alignItems: Platform.OS === 'web' ? 'start' : 'center',
    justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
    flexWrap: Platform.OS === 'web' ? 'wrap' : 'nowrap',
    margin: 10,
    padding: 10
  }
})
