import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Icon, Overlay } from 'react-native-elements'
import { Dimensions } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const LibraryMovieItem = ({ movie, navigation }) => {
    const [visible, setVisible] = useState(false);
    const handleRemoveMovie = async () => {
        await deleteDoc(doc(db, "favoriteMovies", movie.uid));
        Toast.show({
            type: 'success',
            text1: 'Remove successfully',
        });
    }
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => navigation.navigate('MovieDetail', {
                movieId: movie.id,
                original_title: movie?.original_title
            })}
        >
            <View style={styles.content}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
                    style={styles.poster}
                ></Image>
                <View style={styles.wp_title}>
                    <Text style={styles.original_title}>{movie?.original_title}</Text>
                    <Icon
                        name="more-vert"
                        type="material-icons"
                        onPress={() => setVisible(true)}
                    ></Icon>
                </View>
            </View>
            <Overlay
                isVisible={visible}
                onBackdropPress={() => setVisible(pre => !pre)}
                overlayStyle={styles.overlay}
                backdropStyle={{ flex: 1 }}
            >
                <Button
                    title="REMOVE FROM LIBRARY"
                    containerStyle={{ marginBottom: 10 }}
                    onPress={() => handleRemoveMovie()}
                />
                <Button
                    title="CANCEL"
                    buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
                    onPress={() => setVisible(false)}
                />
            </Overlay>
        </TouchableOpacity>
    )
}

export default LibraryMovieItem

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        width: windowWidth,
    },
    content: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 10,
    },
    poster: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 10
    },
    wp_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    original_title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    overlay: {
        width: '80%',
        paddingVertical: 20,
    }
})