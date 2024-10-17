import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BikesView } from './components/BikesView';
import { Home } from './components/Home';
import { BikesAppointmentsView } from './components/BikesAppointmentsView';

const Stack = createNativeStackNavigator();
export const AppNavigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Inicio" >
                <Stack.Screen name="Inicio" options={{
                    title: '',
                }} component={Home} />

                <Stack.Screen name="BikesView" options={{
                    title: '',
                }} component={BikesView} />

                <Stack.Screen name="BikesAppointmentsView" options={{
                    title: '',
                }} component={BikesAppointmentsView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'white'
    },
});



