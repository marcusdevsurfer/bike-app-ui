import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { HeaderNavigation } from './HeaderNavigation'
import { getInsets, globalStyles } from '../../styles/globalStyles'
import { MaterialIcons } from '@expo/vector-icons';
import { API_URL } from '@env';

export const UsersView = () => {
  //input find bar state
  const [input, setInput] = useState('')
  //users state
  const [users, setUsers] = useState([])
  // loading state
  const [loading, setLoading] = useState(true)

  //fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  //fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`)
      const data = await response.json()
      setUsers(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

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
          placeholder={'Buscar usuario'}
        />
      </View>
      {
        //if is loading show activity indicator else show flatlist
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
            renderItem={({ item }) => (<Text>{item.name} {item.lastName}</Text>)}
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
  findBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  searchIcon: {
    marginHorizontal: 5,
  },
  flatContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '',
    margin: 10,
    padding: 10
  }
})
