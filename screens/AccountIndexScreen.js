import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Button, Icon, Image } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();

const AccountIndexScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarVisible: false
    })
  }, [navigation])
  const handleLoginGoogle = () => {
  }
  const handleLoginFacebook = () => {
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My Movies</Text>
        <Text style={styles.subtitle}>Welcome back</Text>
        <LoginButton
          icon={
            <Image
              source={require("../assets/google-logo.png")}
              style={styles.logo}
            />
          }
          text="Login with Google"
          handleLogin={() => handleLoginGoogle()}
        />
        <LoginButton
          icon={
            <Image
              source={require("../assets/facebook-logo.png")}
              style={styles.logo}
            />
          } text="Login with Facebook"
          handleLogin={() => handleLoginFacebook()}
        />
        <LoginButton
          icon={
            <Icon
              name="envelope-o"
              type="font-awesome"
            ></Icon>
          }
          text="Login with Email"
          navigation={navigation}
          handleLogin = {() => navigation.navigate("Authentication", {screen: 'Login'})}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Text>Don't have account? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text
              style={{ color: '#49a8ea' }}
            >Register</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}
const LoginButton = ({ icon, text, navigation, handleLogin }) => {
  // const uri = "../assets/google-logo.png"
  return (
    <TouchableOpacity onPress={() => handleLogin()}>
      <View style={styles.loginBtn}>
        {icon}
        <Text style={styles.loginBtnText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}
export default AccountIndexScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: "center",
    flex: 1
  },
  content: {
    width: '80%'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#49a8ea',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 50,
    textAlign: 'center'
  },
  logo: {
    width: 25,
    height: 25,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
  },
  loginBtnText: {
    fontWeight: 'bold',
    marginLeft: 10
  }
})