import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Button, Input } from 'react-native-elements'
import { useGenres } from '../hooks/useGenres'
import { axiosInstance } from '../utils/axios'
import GenreList from '../components/GenreList'

const SearchScreen = ({ navigation }) => {
  const [genres, setGenres] = useState(null);
  const [keyWord, setKeyWord] = useState(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Search'
    })
  }, [navigation])
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await axiosInstance.get(`/genre/movie/list`)
        setGenres(fetchedGenres.data.genres)
      } catch (error) {
        return error;
      }
    }
    fetchGenres()
  }, [])
  return (
    <View style={styles.container}>
      <Input
        placeholder='Search'
        leftIcon={{ type: 'font-awesome', name: 'search' }}
        inputContainerStyle={styles.input}
        leftIconContainerStyle={styles.inputIcon}
        onChangeText={(value) => setKeyWord(value)}
      />
      {!!keyWord && <Button title="Search" containerStyle={{ marginBottom: 15 }} onPress={() => {
        navigation.navigate("SearchResult", {
          keyWord
        })
      }}></Button>}
      {genres && <GenreList genres={genres} navigation={navigation}></GenreList>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderBottomColor: "white"
  },
  inputIcon: {
    color: '#a1a1a4'
  }
})
export default SearchScreen