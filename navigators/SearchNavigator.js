import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import SearchMovieDetail from '../screens/SearchMovieDetail';
const Stack = createNativeStackNavigator();

const SearchNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SearchIndex" component={SearchScreen} />
            <Stack.Screen name="SearchResult" component={SearchResultScreen} />
            <Stack.Screen name="SearchMovieDetail" component={SearchMovieDetail} />
        </Stack.Navigator>
    )
}

export default SearchNavigator