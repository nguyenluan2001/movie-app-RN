import { FlatList, Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, Button, Input, Overlay } from 'react-native-elements'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { getLoginUser } from '../redux/slices/user';

const schema = Yup.object().shape({
    fullname: Yup.string().required("Fullname is required"),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be more than 6 characters')
})
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Take a picture',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Choose from gallery',
    }
];
const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loginError, setLoginError] = useState(null);
    const [visible, setVisible] = useState(false);
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: (values => {
            console.log("values", values)
            const { email, password } = values
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    let userData = {
                        apiKey: user.apiKey,
                        displayName: values.fullname,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        photoURL: user.phoneNumber,
                        uid: user.uid
                    }
                    // console.log("userData", userData)
                    updateProfile(user, {
                        displayName: values.fullname
                    }).then(() => {
                        dispatch(getLoginUser(userData))
                        setLoginError(null)
                        navigation.navigate("Home")

                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
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
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    // useEffect(() => {
    //   if (formik.errors) {
    //     console.log("errors", formik.errors)
    //   }
    // }, [formik])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wp_form}>
                <Text style={styles.login}>Register</Text>
                <Avatar
                    size={64}
                    rounded
                    icon={{ name: 'user', type: 'font-awesome' }}
                    iconStyle={{ color: '#999999' }}
                    containerStyle={{ backgroundColor: '#cfcfcf', alignSelf: 'center', marginBottom: 20 }}
                    onPress={() => setVisible(true)}
                >
                    <Avatar.Accessory size={24} />
                </Avatar>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View
                        style={{ height: "40%", width: '100%' }}
                    >
                        <Text style={{ fontSize: 20 }}>Set your avatar</Text>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ width: 300, padding: 10 }}>
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </Overlay>
                <Input
                    placeholder='Fullname'
                    leftIcon={{ type: 'feather', name: 'user' }}
                    inputContainerStyle={styles.input}
                    leftIconContainerStyle={styles.inputIcon}
                    // onChangeText={(value) => setKeyWord(value)}
                    name="fullname"
                    onChangeText={(value) => formik.setFieldValue('fullname', value)}
                    errorMessage={!!formik?.errors?.fullname && formik?.errors?.fullname}
                />
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    inputContainerStyle={styles.input}
                    leftIconContainerStyle={styles.inputIcon}
                    // onChangeText={(value) => setKeyWord(value)}
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

                />
                <Text style={{ color: 'red', marginLeft: 20 }}>{!!loginError && loginError}</Text>
                <Text style={styles.forgotPass} >Forgot password?</Text>
                <View style={styles.wp_btn}>
                    <Button title="Login" onPress={() => navigation.navigate("Login")} containerStyle={{ ...styles.loginBtn, marginRight: 10 }}></Button>
                    <Button title="Register" onPress={formik.handleSubmit} containerStyle={styles.loginBtn}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eaf4fc',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    wp_form: {
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
    forgotPass: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: "#19b1d3",
        marginVertical: 10
    },
    wp_btn: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    loginBtn: {
        width: '30%',
        alignSelf: 'center'
    }
})