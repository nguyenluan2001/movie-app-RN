import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, ScrollView, Pressable } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import MovieGrid from '../components/MovieGrid';
import MovieItem from '../components/MovieItem';
import MovieList from '../components/MovieList';
import ShowMovies from '../components/ShowMovies';
import { fetchMovieGenre, fetchTVGenre } from '../redux/slices/genre';
import { axiosInstance } from '../utils/axios'
import { collection, addDoc } from "firebase/firestore"; 
import {db} from "../utils/firebase"
function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState(null);
    const [layout, setLayout] = useState(1);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    console.log("userState", user)
    const testFirebase = async() => {
        console.log("begin")
        const docRef = await addDoc(collection(db, "favoriteMovies"), {
            name: "Spider man",
          });
          console.log("Document written with ID: ", docRef.id);
          
    }
    useEffect(async () => {
        const movies = await axiosInstance.get('movie/popular', {
            params: {
                page: 1
            }
        })
        setMovies(movies.data.results)
        // console.log("movies", movies)
    }, [])
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Home',
            headerRight: () => (
                <Pressable 
                    style={{
                        marginRight: 10
                    }}
                    onPress={() =>testFirebase()} 
                >
                    <Icon
                        name='user-circle-o'
                        type='font-awesome'
                        color='black'
                        size={30}
                        />
                </Pressable>
            )
        })
    }, [navigation])
    useEffect(() => {
        dispatch(fetchMovieGenre());
        dispatch(fetchTVGenre());
    }, [])

    return (
        <>
        <Text>{user?.email}</Text>
            <ShowMovies movies={movies} navigation={navigation}></ShowMovies>
        </>
    )
}

export default HomeScreen