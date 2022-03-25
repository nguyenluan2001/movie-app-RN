import React, { useEffect, useLayoutEffect, useState, flushSync, useRef } from 'react'
import { Text, View, ScrollView, Pressable, StyleSheet } from 'react-native'
import { Avatar, Button, Icon, Tab, TabView } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import MovieGrid from '../components/MovieGrid';
import MovieItem from '../components/MovieItem';
import MovieList from '../components/MovieList';
import ShowMovies from '../components/ShowMovies';
import { fetchMovieGenre, fetchTVGenre } from '../redux/slices/genre';
import { axiosInstance } from '../utils/axios'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase"
import MostPopularMovies from '../components/MostPopularMovies';
import TopRatedMovies from '../components/TopRatedMovies';
import NowPlayingMovies from '../components/NowPlayingMovies';
import UpcomingMovies from '../components/UpcomingMovies';
function HomeScreen({ navigation }) {
    const [movies, setMovies] = useState(null);
    const [layout, setLayout] = useState(1);
    const [index, setIndex] = useState(0)
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
                    <Avatar
                        size={40}
                        source={user?.photoURL ? { uri: user.photoURL } : {}}
                        rounded
                        icon={{ name: 'user', type: 'font-awesome' }}
                        iconStyle={{ color: '#999999' }}
                        containerStyle={{ backgroundColor: '#cfcfcf', alignSelf: 'center', marginBottom: 20 }}
                    >
                    </Avatar>
                </Pressable>
            )
        })
    }, [navigation, user])
    useEffect(() => {
        dispatch(fetchMovieGenre());
        dispatch(fetchTVGenre());
    }, [])
    const handleScrollTop = () => {
        ref.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }
    return (
        <View style={{ flex: 1 }}>
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'black',
                    height: 3,
                }}
                containerStyle={{height: 50, borderBottomWidth: 1}}
            >
                <Tab.Item
                    title="Most popular"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    buttonStyle={{backgroundColor:'white'}}
                    containerStyle={{backgroundColor: 'white', borderBottomWidth: 0.5}}
                />
                <Tab.Item
                    title="Top rated"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    buttonStyle={{backgroundColor:'white'}}
                    containerStyle={{backgroundColor: 'white', borderBottomWidth: 0.5}}
                />
                <Tab.Item
                    title="Now playing"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    buttonStyle={{backgroundColor:'white'}}
                    containerStyle={{backgroundColor: 'white', borderBottomWidth: 0.5}}
                />
                <Tab.Item
                    title="Upcoming"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    buttonStyle={{backgroundColor:'white'}}
                    containerStyle={{backgroundColor: 'white', borderBottomWidth: 0.5}}
                />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring" >
                <TabView.Item style={{ width: '100%' }}>
                    <MostPopularMovies refs={ref} navigation={navigation}></MostPopularMovies>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <TopRatedMovies refs={ref} navigation={navigation}></TopRatedMovies>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <NowPlayingMovies refs={ref} navigation={navigation}></NowPlayingMovies>
                </TabView.Item>
                <TabView.Item style={{ width: '100%' }}>
                    <UpcomingMovies refs={ref} navigation={navigation}></UpcomingMovies>
                </TabView.Item>
            </TabView>
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