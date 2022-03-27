import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MovieItem from './MovieItem'

const MovieList = ({movies, navigation, isSearch}) => {
  return (
    <View style={styles.container}>
        {
                movies && (
                    movies?.map((movie, index) => <MovieItem isSearch={isSearch} movie={movie} key={`${movie?.id}_${index}`} navigation={navigation}></MovieItem>)
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