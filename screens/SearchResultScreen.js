import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { Icon } from 'react-native-elements';
import MovieList from '../components/MovieList';
import MovieGrid from '../components/MovieGrid';
import ShowMovies from '../components/ShowMovies';

const SearchResultScreen = ({navigation, route}) => {
    const [movies, setMovies] = useState(null);
    const [layout, setLayout] = useState(1);
    const {genre_id, keyWord} = route.params;
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Search Result'
        })
    }, [navigation])
    useEffect(() => {
        const fetchMovies = async () => {
            try{
                let fetchedMovies = null;
                if(keyWord) {
                    console.log("keyWord", keyWord)
                    fetchedMovies = await axiosInstance.get(`/search/movie?query=${keyWord}`);
                    console.log("fetchedMovies", fetchedMovies.data.results)

                } 
                if(genre_id){
                    console.log("genre_id", genre_id)
                    fetchedMovies = await axiosInstance.get(`/discover/movie?with_genres=${genre_id}`);
                }
                setMovies(fetchedMovies.data.results)
            }catch(error) {
                return error;
            }
        }
        fetchMovies()
    }, [route])
    console.log("movies", movies)
  return (
    <>
        <ShowMovies movies={movies} navigation={navigation} title={keyWord && keyWord}></ShowMovies>
    </>
  )
}

export default SearchResultScreen