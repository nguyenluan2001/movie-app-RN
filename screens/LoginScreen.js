import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input } from 'react-native-elements'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getLoginUser } from '../redux/slices/user';

const schema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be more than 6 characters')
})
const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(null)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: schema,
    onSubmit: (values => {
      console.log("values", values)
      const { email, password } = values
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const userData = {
            apiKey: user.apiKey,
            displayName: user.displayName, 
            email: user.email, 
            phoneNumber: user.phoneNumber, 
            photoURL: user.phoneNumber,
            uid: user.uid
          }
          // console.log("userData", userData)
          dispatch(getLoginUser(userData))
          setLoginError(null)
          // formik.setFieldValue("email", '');
          // formik.setFieldValue("password", '');
          formik.resetForm();
          navigation.navigate("Home")
          // console.log("user", user)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoginError("Email or password is incorrect")
          console.log("error", error)
        });

    })

  })
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, [navigation])
  // useEffect(() => {
  //   if (formik.errors) {
  //     console.log("errors", formik.errors)
  //   }
  // }, [formik])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wp_form}>
        <Text style={styles.login}>Login</Text>
        <Input
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
          inputContainerStyle={styles.input}
          leftIconContainerStyle={styles.inputIcon}
          // onChangeText={(value) => setKeyWord(value)}
          value={formik.values.email}
          name="email"
          onChangeText={(value) => formik.setFieldValue('email', value)}
          errorMessage={!!formik?.errors?.email && formik?.errors?.email}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'feather', name: 'lock' }}
          inputContainerStyle={styles.input}
          leftIconContainerStyle={styles.inputIcon}
          name="Password"
          secureTextEntry={true}
          onChangeText={(value) => formik.setFieldValue('password', value)}
          errorMessage={!!formik?.errors?.password && formik?.errors?.password}
          value={formik.values.password}


        />
        <Text style={{color: 'red', marginLeft: 20}}>{!!loginError && loginError}</Text>
        <Text style={styles.forgotPass} >Forgot password?</Text>
        <View style={styles.wp_btn}>
          <Button title="Login" onPress={formik.handleSubmit} containerStyle={{...styles.loginBtn, marginRight: 10}}></Button>
          <Button title="Register" onPress={() => navigation.navigate('Register')} containerStyle={styles.loginBtn}></Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaf4fc',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  wp_form:{
    alignContent: 'center',
    paddingHorizontal: 30
  },
  login: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "black",
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 10,
    borderBottomColor: "white"
  },
  inputIcon: {
    color: '#a1a1a4',
    marginRight: 5
  },
  forgotPass:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: "#19b1d3",
    marginVertical: 10
  },  
  wp_btn:{
    flexDirection: "row",
    justifyContent: 'center',
  },
  loginBtn:{
    width: '30%',
    alignSelf:'center'
  }
})