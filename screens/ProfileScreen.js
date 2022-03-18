import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, Dialog, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/user'
import { getAuth, updateProfile, signOut } from 'firebase/auth'

const ProfileScreen = ({ navigation }) => {
    const auth = getAuth();
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: ''
        },
        onSubmit: (values => {
            console.log("values", values)
            const { fullname, email } = values
            updateProfile(auth.currentUser, {
                displayName: fullname,
                email: email
            }).then(() => {
                dispatch(updateProfile({
                    displayName: fullname,
                    email: email
                }))

            }).catch((error) => {
                // An error occurred
                // ...
            });

        })

    })
    const [confirmLogout, setConfirmLogout] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'block' },
            headerRight: () => (
                <Button
                    onPress={formik.handleSubmit}
                    title="Save"
                    color="#fff"

                />
            ),

        })
    }, [navigation])
    useEffect(() => {
        if (user?.uid) {
            formik.setFieldValue("fullname", user.displayName)
            formik.setFieldValue("email", user.email)
        }
    }, [user])
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
        dispatch(logout());
    }
    return (
        <View style={styles.container}>
            <Input
                label="Fullname"
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                inputContainerStyle={styles.input}
                leftIconContainerStyle={styles.inputIcon}
                value={formik.values.fullname}
                // onChangeText={(value) => setKeyWord(value)}
                name="email"
                onChangeText={(value) => formik.setFieldValue('fullname', value)}
            />
            <Input
                label="Email"
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                inputContainerStyle={styles.input}
                leftIconContainerStyle={styles.inputIcon}
                value={formik.values.email}
                name="email"
                onChangeText={(value) => formik.setFieldValue('email', value)}
                disabled={true}
            />
            <Pressable style={styles.logoutContainer} onPress={() => setConfirmLogout(true)}>
                <Text style={styles.logoutText}>LOGOUT</Text>
            </Pressable>
            <Dialog
                isVisible={confirmLogout}
                onBackdropPress={() => setConfirmLogout(false)}
            >
                <Dialog.Title title="Are you sure to logout?" />
                <View style={styles.wp_btn}>
                    <Button title="CANCEL"
                        containerStyle={{ width: '40%', }}
                        buttonStyle={{ backgroundColor: '#f2f2f2' }}
                        titleStyle={{ color: 'black' }}
                        onPress={() => setConfirmLogout(false)}
                    ></Button>
                    <Button title="LOGOUT" containerStyle={{ width: '40%' }} onPress={() => handleLogout()}></Button>
                </View>
            </Dialog>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 20
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
    logoutContainer: {
        paddingVertical: 15,
        backgroundColor: 'white'
    },
    logoutText: {
        color: 'tomato',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    wp_btn: {
        flexDirection: 'row',
        justifyContent: 'space-around',

    }
})