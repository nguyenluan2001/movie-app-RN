import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountIndexScreen from '../screens/AccountIndexScreen';
const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AccountIndex" component={AccountIndexScreen} />
            {/* <Stack.Screen name="MovieDetail" component={MovieDetailScreen} /> */}
        </Stack.Navigator>
    )
}

export default AccountNavigator