import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MovieItem from './MovieItem'

const MovieList = ({movies, navigation}) => {
  return (
    <View style={styles.container}>
        {
                movies && (
                    movies?.map((movie) => <MovieItem movie={movie} key={movie?.id} navigation={navigation}></MovieItem>)
                )
            }
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding: 20
    }
})
export default MovieList