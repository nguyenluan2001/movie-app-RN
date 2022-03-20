import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Button, Dialog, Image, Input } from 'react-native-elements'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/user'
import { getAuth, updateProfile, signOut } from 'firebase/auth'
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../utils/firebase'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";
import { updateProfile as updateProfileRedux } from '../redux/slices/user'
const ProfileScreen = ({ navigation }) => {
    const auth = getAuth();
    const [confirmLogout, setConfirmLogout] = useState(false);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: ''
        },
        onSubmit: (async (values) => {
            console.log("values", values)
            setIsLoading(true);
            const { fullname, email } = values
            let uploadUrl = null;
            if (image.name) {
                uploadUrl = await handleUploadImage(image);
                setImage({
                    uri: uploadUrl
                })
            }
            updateProfile(auth.currentUser, {
                displayName: fullname,
                photoURL: uploadUrl ?? image.uri
            }).then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Update successfully',
                });
                setIsLoading(false)
                dispatch(updateProfileRedux({
                    displayName: fullname,
                    photoURL: uploadUrl ?? image.uri
                }))
            }).catch((error) => {
                console.log("error", error)
                Toast.show({ 
                    type: 'error',
                    text1: 'Update fail',
                });
            });

        })

    })
 

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: { display: 'block' },
            headerRight: () => (
                <Button
                    onPress={() => formik.handleSubmit()}
                    title="Save"
                    color="#fff"
                    loading={isLoading}
                />
            ),

        })
    }, [navigation, isLoading])
    useEffect(() => {
        if (user?.uid) {
            formik.setFieldValue("fullname", user.displayName)
            formik.setFieldValue("email", user.email)
            setImage({
                uri: user?.photoURL
            })
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
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            let uriSplit = result.uri.split("/")
            console.log("uriSplit", uriSplit[uriSplit.length - 1])
            setImage({
                uri: result.uri,
                name: uriSplit[uriSplit.length - 1]
            });
        }
    };
    const handleUploadImage = async (image) => {
        console.log("image", image)
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image.uri, true);
            xhr.send(null);
        });
        const fileRef = ref(storage, image.name);
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        return await getDownloadURL(fileRef);
    }
    return (
        <View style={styles.container}>
            <Avatar
                size={70}
                source={image ? { uri: image?.uri } : {}}
                rounded
                icon={{ name: 'user', type: 'font-awesome' }}
                iconStyle={{ color: '#999999' }}
                containerStyle={{ backgroundColor: '#cfcfcf', alignSelf: 'center', marginBottom: 20 }}
                onPress={pickImage}
            >
                <Avatar.Accessory size={24} />
            </Avatar>
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