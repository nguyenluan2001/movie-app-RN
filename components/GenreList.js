import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const GenreList = ({genres, navigation}) => {
  return (
    <ScrollView>
     {
         genres &&
         genres?.map((genre, index) => (
             <TouchableOpacity key={index} onPress={() => navigation.navigate("SearchResult",{
                 genre_id: genre.id
             })}>
                 <Text style={styles.genreItem} >{genre?.name}</Text>
             </TouchableOpacity>
         ))
     }
    </ScrollView>
  )
}

export default GenreList

const styles = StyleSheet.create({
    genreItem:{
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    }
})