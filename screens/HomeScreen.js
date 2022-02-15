import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useDispatch } from 'react-redux';
import MovieGrid from '../components/MovieGrid';
import MovieItem from '../components/MovieItem';
import MovieList from '../components/MovieList';
import { fetchMovieGenre, fetchTVGenre } from '../redux/slices/genre';
import { axiosInstance } from '../utils/axios'

function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState(null);
    const [layout, setLayout] = useState(1);
    const dispatch = useDispatch()
    useEffect(async () => {
        const movies = await axiosInstance.get('movie/popular', {
            params: {
                page: 1
            }
        })
        setMovies(movies.data.results)
        // console.log("movies", movies)
    }, [])
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         title: 'Home',
    //         headerRight: () => (
    //             <View 
    //                 style={{
    //                     marginRight: 10
    //                 }}
    //             >
    //                 <Icon
    //                     name='filter'
    //                     type='ant-design'
    //                     color='black'
    //                     onPress={() => console.log('hello')} />
    //             </View>
    //         )
    //     })
    // }, [navigation])
    useEffect(() => {
        dispatch(fetchMovieGenre());
        dispatch(fetchTVGenre());
    }, [])
    return (
        <ScrollView>
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingHorizontal: 5
                }}
            >
                <Icon
                    raised
                    name='menu'
                    type='entypo'
                    color={layout === 1 ? '#f50' : 'gray'}
                    onPress={() => setLayout(1)} />
                <Icon
                    raised
                    name='grid'
                    type='entypo'
                    color={layout === 2 ? '#f50' : 'gray'}
                    onPress={() => setLayout(2)} />
            </View>
            {layout === 1 && <MovieList movies={movies} navigation={navigation}></MovieList>}
            {layout === 2 && <MovieGrid movies={movies} navigation={navigation}></MovieGrid>}
        </ScrollView>
    )
}

export default HomeScreen