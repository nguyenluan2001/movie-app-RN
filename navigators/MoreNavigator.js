import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import MoreScreen from '../screens/MoreScreen';
import LibraryScreen from '../screens/LibraryScreen';
const Stack = createNativeStackNavigator();

const MoreNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MoreIndex" component={MoreScreen} />
            <Stack.Screen name="Library" component={LibraryScreen} />
        </Stack.Navigator>
    )
}

export default MoreNavigator