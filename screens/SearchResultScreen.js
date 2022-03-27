import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import { Icon } from 'react-native-elements';
import MovieList from '../components/MovieList';
import MovieGrid from '../components/MovieGrid';
import ShowMovies from '../components/ShowMovies';

const SearchResultScreen = ({ navigation, route }) => {
    const [movies, setMovies] = useState(null);
    const [layout, setLayout] = useState(1);
    const { genre_id, keyWord } = route.params;
    const [page, setPage] = useState(1);
    const [isLoadingMovie, setIsLoadingMovie] = useState(false);
    const ref = useRef();
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Search Result'
        })
    }, [navigation])
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let fetchedMovies = null;
                if (keyWord) {
                    console.log("keyWord", keyWord)
                    fetchedMovies = await axiosInstance.get(`/search/movie?query=${keyWord}`);
                    console.log("fetchedMovies", fetchedMovies.data.results)

                }
                if (genre_id) {
                    console.log("genre_id", genre_id)
                    fetchedMovies = await axiosInstance.get(`/discover/movie?with_genres=${genre_id}`);
                }
                setMovies(fetchedMovies.data.results)
            } catch (error) {
                return error;
            }
        }
        fetchMovies()
    }, [route])
    // console.log("movies", movies)
    const handleLoadMore = async () => {
        try {
            setIsLoadingMovie(true)
            let fetchedMovies = null;
            if (keyWord) {
                console.log("keyWord", keyWord)
                fetchedMovies = await axiosInstance.get(`/search/movie`, {
                    params: {
                        page: page + 1,
                        query: keyWord
                    }
                });
                console.log("fetchedMovies", fetchedMovies.data.results)

            }
            if (genre_id) {
                console.log("genre_id", genre_id)
                fetchedMovies = await axiosInstance.get(`/discover/movie`, {
                    params: {
                        page: page + 1,
                        with_genres: genre_id
                    }
                });
            }
            setMovies((pre) => [...pre, ...fetchedMovies.data.results])
            setPage((pre) => pre + 1)
            setTimeout(() => {
                setIsLoadingMovie(false)
            }, 0)
        } catch (error) {
            return error;
        }

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
                <ShowMovies movies={movies} navigation={navigation} title={keyWord && keyWord} isLoadingMovie={isLoadingMovie} handleLoadMore={handleLoadMore} isSearch={true}></ShowMovies>
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
export default SearchResultScreen