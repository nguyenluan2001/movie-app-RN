import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MovieGridItem from './MovieGridItem'

const MovieGrid = ({movies, navigation}) => {
  return (
    <View style={styles.container}>
        {
                movies && (
                    movies?.map((movie) => <MovieGridItem movie={movie} key={movie?.id} navigation={navigation}></MovieGridItem>)
                )
            }
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
})
export default MovieGrid