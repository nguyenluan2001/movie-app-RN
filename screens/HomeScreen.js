import React, { useEffect, useLayoutEffect, useState, flushSync, useRef } from 'react'
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import MovieGrid from '../components/MovieGrid';
import MovieItem from '../components/MovieItem';
import MovieList from '../components/MovieList';
import ShowMovies from '../components/ShowMovies';
import { fetchMovieGenre, fetchTVGenre } from '../redux/slices/genre';
import { axiosInstance } from '../utils/axios'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase"
function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState(null);
    const [layout, setLayout] = useState(1);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [page, setPage] = useState(1)
    const [isLoadingMovie, setIsLoadingMovie] = useState(false);
    const ref = useRef();
    console.log("userState", user)
    const testFirebase = async () => {
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
                    onPress={() => testFirebase()}
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
    const handleLoadMore = async () => {
        setIsLoadingMovie(true)
        const movies = await axiosInstance.get('movie/popular', {
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
    const handleScrollTop = () => {
        ref.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }
    return (
        <View>
            <ScrollView ref={ref}>
                {/* <Text>{user?.email}</Text> */}
                <ShowMovies movies={movies} navigation={navigation} handleLoadMore={handleLoadMore} isLoadingMovie={isLoadingMovie}></ShowMovies>
            </ScrollView>
            <Pressable style={styles.scrollBtn} onPress={() => handleScrollTop()}>
                <Icon
                    name='upcircle'
                    type="ant-design"
                    color='#00aced'
                    containerStyle={{ fontSize: 30 }}
                    iconStyle={{ fontSize: 30 }}
                />
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    scrollBtn: {
        position: "absolute",
        bottom: 20,
        right: 20
    }
})
export default HomeScreen