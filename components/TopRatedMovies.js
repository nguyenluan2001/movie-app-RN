import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShowMovies from './ShowMovies';
import { axiosInstance } from '../utils/axios';

const TopRatedMovies = ({refs, navigation}) => {
  const [movies, setMovies] = useState(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(async () => {
    const movies = await axiosInstance.get('movie/top_rated', {
        params: {
            page: 1
        }
    })
    setMovies(movies.data.results)
    // console.log("movies", movies)
}, [])
const handleLoadMore = async () => {
  setIsLoadingMovie(true)
  const movies = await axiosInstance.get('movie/top_rated', {
      params: {
          page: page + 1
      }
  })
  setMovies((pre) => [...pre, ...movies.data.results])
  setPage((pre) => pre + 1)
  setTimeout(() => {
      setIsLoadingMovie(false)
  }, 0)
}
  return (
    <ScrollView ref={refs}>
      <ShowMovies title="Top rated" movies={movies} navigation={navigation} handleLoadMore={handleLoadMore} isLoadingMovie={isLoadingMovie}></ShowMovies>
    </ScrollView>
  )
}

export default TopRatedMovies

const styles = StyleSheet.create({})