import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountIndexScreen from '../screens/AccountIndexScreen';
import { useSelector } from 'react-redux';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createNativeStackNavigator();

const AuthenticateNavigator = () => {
    const user = useSelector(state => state.user)
    console.log("userAccount", user)
    return (
        <Stack.Navigator>
            {/* {!user?.uid && <Stack.Screen name="AccountIndex" component={AccountIndexScreen} />} */}
            {/* {user?.uid && <Stack.Screen name="Profile" component={ProfileScreen} />} */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default AuthenticateNavigator;