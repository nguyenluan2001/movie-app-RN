import { View, Text, Touchable, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getYearRelease, getLanguage } from '../utils/lib';
import { useSelector } from 'react-redux';
const MovieItem = ({ movie, navigation }) => {
    const movieGenres = useSelector((state) => state.genre.movieGenres);
    const [genres, setGenres] = useState(null);

    useEffect(() => {
        if (movieGenres && movie) {
            let filterGenres = movieGenres.filter((item) => movie.genre_ids.includes(item.id))
            setGenres(filterGenres)
        }
    }, [movieGenres, movie])
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', {
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
            </TouchableOpacity>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('MovieDetail', {
                            movieId: movie.id,
                            original_title: movie?.original_title
                        })}>
                            <Text style={styles.title}>{movie?.original_title}</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text>{movie?.release_date ? getYearRelease(movie?.release_date) : "N/A"} | </Text>
                        <Text>{movie?.original_language ? getLanguage(movie?.original_language) : "N/A"}</Text>
                    </View>
                    {genres && <View style={styles.listGenres}>
                        {genres?.map((item, index) => <View style={styles.genreItem} key={index}>
                            <Text style={{ color: 'white' }}  >{item.name}</Text>
                        </View>)}
                    </View>}
                </View>
                <View style={styles.vote}>
                    <Text style={styles.voteText}>{movie?.vote_average}</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap'
    },
    poster: {
        width: 150,
        height: 200,
        marginRight: 10,
        borderRadius: 10
    },
    listGenres: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    genreItem: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: 15,
        marginRight: 5,
        marginBottom: 5
    },
    vote: {
        backgroundColor: '#82c596',
        width: 100,
        paddingVertical: 5,
        borderRadius: 20,
    },
    voteText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
});
export default MovieItem