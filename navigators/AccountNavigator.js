import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountIndexScreen from '../screens/AccountIndexScreen';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/ProfileScreen';
const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
    const user = useSelector(state => state.user)
    console.log("userAccount", user)
    return (
        <Stack.Navigator>
            {!user?.uid && <Stack.Screen name="AccountIndex" component={AccountIndexScreen} />}
            {user?.uid && <Stack.Screen name="Profile" component={ProfileScreen} />}
        </Stack.Navigator>
    )
}

export default AccountNavigator