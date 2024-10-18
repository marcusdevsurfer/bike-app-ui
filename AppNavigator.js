import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BikesView } from './components/BikesView';
import { Home } from './components/Home';
import { BikesAppointmentsView } from './components/BikesAppointmentsView';
import { AddBikeForm } from './components/AddBikeFom';

const Stack = createNativeStackNavigator();

const SCREEN_NAMES = {
    HOME: 'Inicio',
    BIKES_VIEW: 'BikesView',
    BIKES_APPOINTMENTS_VIEW: 'BikesAppointmentsView',
    ADD_BIKE_FORM: 'AddBikeForm',
};

export const AppNavigator = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={SCREEN_NAMES.HOME} >

                <Stack.Screen
                    name={SCREEN_NAMES.HOME}
                    options={{
                        title: '',
                    }}
                    component={Home}
                />

                <Stack.Screen
                    name={SCREEN_NAMES.BIKES_VIEW}
                    options={{
                        title: '',
                    }}
                    component={BikesView}
                />

                <Stack.Screen
                    name={SCREEN_NAMES.BIKES_APPOINTMENTS_VIEW}
                    options={{
                        title: '',
                    }}
                    component={BikesAppointmentsView}
                />

                <Stack.Screen
                    name={SCREEN_NAMES.ADD_BIKE_FORM}
                    options={{
                        title: 'Nueva Bicicleta',
                    }}
                    component={AddBikeForm}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
};



