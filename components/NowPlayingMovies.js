import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ShowMovies from './ShowMovies';
import { axiosInstance } from '../utils/axios';

const NowPlayingMovies = ({refs, navigation}) => {
  const [movies, setMovies] = useState(null);
  const [isLoadingMovie, setIsLoadingMovie] = useState(false);
  const [page, setPage] = useState(1)

  useEffect(async () => {
    const movies = await axiosInstance.get('movie/now_playing', {
        params: {
            page: 1
        }
    })
    setMovies(movies.data.results)
    // console.log("movies", movies)
}, [])
const handleLoadMore = async () => {
  setIsLoadingMovie(true)
  const movies = await axiosInstance.get('movie/now_playing', {
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
      <ShowMovies title="Now playing" movies={movies} navigation={navigation} handleLoadMore={handleLoadMore} isLoadingMovie={isLoadingMovie}></ShowMovies>
    </ScrollView>
  )
}

export default NowPlayingMovies

const styles = StyleSheet.create({})