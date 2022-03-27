import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'

const MovieGridItem = ({ isSearch, movie, navigation }) => {
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate(isSearch? 'SearchMovieDetail':"MovieDetail", {
            movieId: movie.id,
            original_title: movie?.original_title
        })}>
            <Image
                style={styles.poster}
                source={
                    {
                        uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`,
                    }
                }
            ></Image>
            <Text style={styles.original_title} numberOfLines={1} ellipsizeMode='tail'>{movie?.original_title}</Text>
        </Pressable>
    )
}

export default MovieGridItem

const styles = StyleSheet.create({
    container:{
        flexBasis: '40%',
        flexWrap: 'wrap'
    },
    original_title:{
        fontSize: 20,
        fontWeight: 'bold',
        width: '100%'
    },
    poster: {
        width: '100%',
        height: 200,
        marginRight: 10,
        borderRadius: 10
    },
})