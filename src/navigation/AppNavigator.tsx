import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import MovieDetails from '../screens/MovieDetails';
import Profile from '../screens/Profile';
import Watchlist from '../screens/Watchlist';
import NavigatorDrawer from '../screens/NavigatorDrawer';

const Stack = createStackNavigator();

const AppNavigator = () => (

    <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">

            <Stack.Screen 
                name="LoginScreen" 
                component={Login} 
                options={{headerShown: false,gestureEnabled:false}}/>
            <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false,gestureEnabled:false}} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
            <Stack.Screen name="Profile" component={Profile} options={{headerShown: false,gestureEnabled:false}} />
            <Stack.Screen name="Watchlist" component={Watchlist} />
            <Stack.Screen name="NavigatorDrawer" component={NavigatorDrawer} options={{headerShown: false,gestureEnabled:false}} />

        </Stack.Navigator>

    </NavigationContainer>

)

export default AppNavigator;