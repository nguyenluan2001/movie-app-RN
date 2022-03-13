import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'

const AccountIndexScreen = ({navigation}) => {
  return (
    <View>
      <Text>AccountIndexScreen</Text>
      <Button title="Login" onPress={() => navigation.navigate("Login")}></Button>
    </View>
  )
}

export default AccountIndexScreen

const styles = StyleSheet.create({})