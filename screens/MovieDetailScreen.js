import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { Button, Icon, Image } from 'react-native-elements';
import { getLanguage, truncateText } from '../utils/lib';
import Carousel from 'react-native-snap-carousel';
import ModalCustom from '../components/ModalCustom';
import moment from 'moment';
import YoutubePlayer from 'react-native-youtube-iframe';
import Loading from '../components/Loading';
import LottieView from 'lottie-react-native';
import { collection, addDoc, getDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
// import { doc, onSnapshot, collection, query, where } from "firebase/firestore";

import { db } from "../utils/firebase";
import { useSelector } from 'react-redux';
import SnackBar from 'react-native-snackbar-component'
import { isEmpty } from "lodash";

const MovieDetailScreen = ({ navigation, route }) => {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [choosedPerson, setChoosedPerson] = useState(null);
  const [notAllowLike, setNotAllowLike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { movieId, original_title } = route.params;
  const user = useSelector(state => state.user)
  useLayoutEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await axiosInstance.get(`/movie/${movieId}`)
        const fetchedCredits = await axiosInstance.get(`/movie/${movieId}/credits`)
        const fetchedvideos = await axiosInstance.get(`/movie/${movieId}/videos`)
        const fetchedRelatedMovies = await axiosInstance.get(`/movie/${movieId}/similar`, {
          page: 100
        })
        // console.log('movie', fetchedMovie.data)
        navigation.setOptions({
          title: original_title,
          backgroundColor: 'white'
        })
        if (fetchedMovie) setMovie(fetchedMovie.data)
        else setMovie(null)
        if (fetchedCredits) setCredits(fetchedCredits.data)
        else setCredits(null)
        if (fetchedvideos) setVideos(fetchedvideos.data.results)
        else setVideos(null)
        if (fetchedRelatedMovies) setRelatedMovies(fetchedRelatedMovies.data.results)
        else setRelatedMovies(null)
      } catch (error) {
        console.log("error", error.message)
      }
    }
    fetchMovie()
  }, [navigation, route])
  useEffect(() => {
    // const getFavoriteMovie = async () => {
    //   const favoriteMoviesRef = collection(db, "favoriteMovies");
    //   const q = query(favoriteMoviesRef, where("id", "==", movieId), where("user_id", "==", user?.uid ?? ""));
    //   const querySnapshot = await getDocs(q);

    //   querySnapshot.forEach((doc) => {
    //     const data = doc.data();
    //     console.log("data", data)
    //     if (parseInt(data.id) === parseInt(movieId)) setIsLiked(true)
    //     else setIsLiked(false)
    //   });
    // }
    // getFavoriteMovie()

    let unsub;
    if (user) {
      const q = query(collection(db, "favoriteMovies"), where("user_id", "==", user?.uid));

      unsub = onSnapshot(q, (querySnapshot) => {
        console.log(querySnapshot?.[0]?.data())
        let favoriteMovies = [];
        querySnapshot.forEach((doc) => {
          console.log("doc", doc.data())
          favoriteMovies.push(doc.data())
        });
        let likedMovie = favoriteMovies?.some((item) => parseInt(item.id) === parseInt(movieId))
        console.log("likedMovie", likedMovie)
        if (likedMovie) setIsLiked(true)
        else setIsLiked(false)
      });

    }
    return unsub;
  }, [navigation])
  useEffect(() => {
    const unsubcribe = setTimeout(() => {
      if (notAllowLike) setNotAllowLike(false);
    }, 1000)
    return unsubcribe;
  }, [notAllowLike])
  const handleChoosePerson = async (person) => {
    let fetchedPerson = await axiosInstance.get(`/person/${person.id}`)
    setChoosedPerson(fetchedPerson.data)
    setModalVisible(true)
  }
  // if (!movie) return <Text>Loading....</Text>
  if (!movie) return <Loading></Loading>
  return (
    <View>
      <ScrollView style={{ backgroundColor: 'white', }}>
        <HeroSection movie={movie} setOpenTrailer={setOpenTrailer} isLiked={isLiked} setIsLiked={setIsLiked} user={user} setNotAllowLike={setNotAllowLike}></HeroSection>
        <View style={styles.container}>
          <RelateInformation movie={movie}></RelateInformation>
          <Overview movie={movie}></Overview>
          <MainCast casts={credits?.cast} handleChoosePerson={handleChoosePerson}></MainCast>
          <MainCrewTeam crews={credits?.crew} handleChoosePerson={handleChoosePerson}></MainCrewTeam>
          <Companies companies={movie?.production_companies}></Companies>
          <RelatedMovies movies={relatedMovies} navigation={navigation}></RelatedMovies>
        </View>

        <ModalCustom modalVisible={openTrailer} setModalVisible={setOpenTrailer}>
          <ScrollView>
            {videos &&
              videos?.map((video, index) => (
                <View key={index}>
                  <YoutubePlayer
                    height={300}
                    videoId={video?.key}
                  />
                </View>
              ))
            }
          </ScrollView>
        </ModalCustom>
        <ModalCustom modalVisible={modalVisible} setModalVisible={setModalVisible}>
          <ScrollView
            style={{
              marginBottom: 20
            }}
          >
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${choosedPerson?.profile_path}`
                }}
                style={{
                  width: 150,
                  height: 200,
                  borderRadius: 10
                }}
              >
              </Image>
              <View
                style={{
                  paddingLeft: 10,
                  flex: 1
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    marginBottom: 5
                  }}
                >{choosedPerson?.name}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'gray',
                    marginBottom: 5
                  }}
                >{choosedPerson?.known_for_department}</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'gray',
                    marginBottom: 5
                  }}
                >{moment().year() - moment(choosedPerson?.birthday).year()} years</Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'gray'
                  }}
                >{choosedPerson?.place_of_birth}</Text>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  marginBottom: 5
                }}
              >Biography</Text>
              <Text>{choosedPerson?.biography}</Text>
            </View>
          </ScrollView>
        </ModalCustom>
      </ScrollView>
      <SnackBar
        visible={notAllowLike}
        textMessage="PLEASE LOGIN!"
        actionHandler={() => navigation.navigate("Authentication", { screen: 'Login' })}
        actionText="LOGIN"
        autoHidingTime={1000}
      // distanceCallback = {() => setNotAllowLike(pre => !pre)}
      />

    </View>
  )
}
const HeroSection = ({ movie, setOpenTrailer, isLiked, setIsLiked, user, setNotAllowLike }) => {
  const [isLiking, setIsLiking] = useState(false);
  const handleLikeMovie = () => {
    if (!user?.uid) {
      setNotAllowLike(true)
      return false;
    } else {
      setIsLiking(true)
      addDoc(collection(db, "favoriteMovies"), {
        id: movie.id,
        original_title: movie.original_title,
        poster_path: movie.poster_path,
        user_id: user?.uid
      }).then(async (docRef) => {
        setIsLiking(false)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const fetchedData = docSnap.data()
          if (parseInt(fetchedData.id) === parseInt(movie.id)) {
            setIsLiked(true)
          }
        } else {
          // doc.data() will be undefined in this case
          setIsLiked(false)
          console.log("No such document!");
        }
        // console.log("Document written with ID: ", docRef);
      });
    }
  }
  return (
    <View>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`
        }}
        style={{
          width: '100%',
          height: 200
        }}
      ></Image>
      <Text style={styles.movieTitle}>{movie?.original_title}</Text>
      <Pressable style={styles.likeBtn} onPress={() => handleLikeMovie()}>
        {isLiking && <LottieView
          style={{ height: 100 }}
          source={require('../assets/animations/heart-beat.json')}
          autoPlay
          speed={1.5}
        />}
        {!isLiking && !isLiked && <Icon
          name='hearto'
          type="ant-design"
          iconStyle={{ color: 'red' }}
        ></Icon>}
        {isLiked && <Icon
          name='heart'
          type="ant-design"
          iconStyle={{ color: 'red' }}
        ></Icon>}
      </Pressable>

      <Pressable style={styles.playBtn} onPress={() => setOpenTrailer(true)}>
        <LottieView
          style={{ height: 100 }}
          source={require('../assets/animations/play-button.json')}
          autoPlay
          speed={1.5}
        />
      </Pressable>
    </View>
  )
}
const RelateInformation = ({ movie }) => {
  return (
    <View style={styles.relateInfoContainer}>
      <View style={{
        flex: 1, paddingRight: 10,
      }}>
        <Text style={styles.relateInfoTitle}>Duration</Text>
        <Text style={styles.relateInfoText}>{movie?.runtime}m</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          borderLeftWidth: 1,
          borderRightWidth: 1,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.relateInfoTitle}>Genre</Text>
        <View>
          <Text style={styles.relateInfoText}>{
            movie?.genres.map((item) => item.name).join(', ')
          }</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}>
        <Text style={styles.relateInfoTitle}>Language</Text>
        <Text style={styles.relateInfoText}>{getLanguage(movie?.original_language)}</Text>
      </View>
    </View>
  )
}
const Overview = ({ movie }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const numWords = movie?.overview?.split(" ").length;
  return (
    <View>
      <Text style={styles.relateInfoTitle}>Overview</Text>
      {!isReadMore && <Text style={styles.relateInfoText}>
        {
          numWords > 25
            ? truncateText(movie?.overview, 25)
            : movie?.overview
        }
      </Text>}
      {isReadMore && <Text style={styles.relateInfoText}>{movie?.overview}</Text>}
      {numWords > 25 && (<View
        style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Button
          title="Read more"
          buttonStyle={{
            backgroundColor: 'rgba(78, 116, 289, 1)',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 'auto'
          }}
          icon={() => (
            <Icon
              name={isReadMore ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              type="material-icons"
              color="white"
            ></Icon>
          )}
          iconRight={true}
          onPress={() => setIsReadMore(pre => !pre)}
        ></Button>
      </View>)}
    </View>
  )
}
const MainCast = ({ casts, handleChoosePerson }) => {
  const [carousel, setCarousel] = useState(null);
  const renderItem = ({ item, index }) => {
    return (
      <CastItem cast={item} handleChoosePerson={handleChoosePerson} key={index}></CastItem>
    );
  }
  return (
    <View
      style={{
        marginTop: 30
      }}
    >
      <Text style={styles.relateInfoTitle}>Main cast</Text>
      <ScrollView horizontal={true}>
        {
          casts &&
          casts?.map((cast, index) => (
            <CastItem cast={cast} handleChoosePerson={handleChoosePerson} key={index}></CastItem>
          ))
        }
      </ScrollView>
    </View>
  )
}
const CastItem = ({ cast, handleChoosePerson }) => {
  return (
    <View
      style={{
        marginRight: 15,
        width: 200,
        paddingHorizontal: 20,
        backgroundColor: 'whitesmoke',
      }}
    >
      <Pressable
        onPress={() => handleChoosePerson(cast)}
      >
        <View
          style={{
            borderRadius: 5,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={styles.castName}>{cast.name}</Text>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${cast?.profile_path}`
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50
            }}
          >
          </Image>
          <Text style={styles.castName}>{cast?.character}</Text>
        </View>
      </Pressable >
    </View>
  )
}
const MainCrewTeam = ({ crews, handleChoosePerson }) => {
  const [carousel, setCarousel] = useState(null);
  const renderItem = ({ item, index }) => {
    return (
      <CrewItem crew={item} handleChoosePerson={handleChoosePerson} key={index}></CrewItem>
    );
  }
  return (
    <View
      style={{
        marginTop: 30
      }}
    >
      <Text style={styles.relateInfoTitle}>Main crews</Text>
      <ScrollView horizontal={true}>
        {
          crews &&
          crews?.map((crew, index) => (
            <CrewItem crew={crew} handleChoosePerson={handleChoosePerson} key={index}></CrewItem>
          ))
        }
      </ScrollView>
    </View>
  )
}
const CrewItem = ({ crew, handleChoosePerson }) => {
  return (
    <View
      style={{
        marginRight: 15,
        width: 200,
        paddingHorizontal: 20,
        backgroundColor: 'whitesmoke',
      }}
    >
      <Pressable
        onPress={() => handleChoosePerson(crew)}
      >
        <View
          style={{
            backgroundColor: 'whitesmoke',
            borderRadius: 5,
            height: 250,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={styles.castName}>{crew.name}</Text>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${crew?.profile_path}`
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50
            }}
          >
          </Image>
          <Text style={styles.castName}>{crew?.department}</Text>
        </View>
      </Pressable>
    </View>
  )
}
const Companies = ({ companies }) => {
  return (
    <View
      style={{
        marginTop: 30
      }}
    >
      <Text style={styles.relateInfoTitle}>Companies</Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: 400,
          marginTop: 10
        }}
      >
        {
          companies?.map((company, index) => (
            <View
              style={{
                flexBasis: 200,
                marginBottom: 10
              }}
              key={index}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${company?.logo_path}`
                }}
                style={{
                  height: 40,
                }}
                resizeMode="contain"
              ></Image>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{company?.name}</Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}
const RelatedMovies = ({ movies, navigation }) => {
  return (
    <View>
      <Text style={styles.relateInfoTitle}>Related Movies</Text>
      <ScrollView horizontal={true}>
        {
          movies &&
          movies?.map((movie, index) => (
            <MovieItem movie={movie} navigation={navigation} key={index}></MovieItem>
          ))
        }
      </ScrollView>
    </View>
  )
}
const MovieItem = ({ movie, navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.push('MovieDetail', {
        movieId: movie.id,
        original_title: movie?.original_title
      })}
      style={{
        marginRight: 15,
        width: 200,
        paddingHorizontal: 20,
        backgroundColor: 'whitesmoke',
      }}
    >
      <View
        style={{
          backgroundColor: 'whitesmoke',
          borderRadius: 5,
          height: 250,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 30
        }}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
          }}
          style={{
            width: 200,
            height: 200,
          }}
        >
        </Image>
        <Text style={styles.castName}>{movie?.original_title}</Text>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  movieTitle: {
    position: "absolute",
    bottom: 20,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20
  },
  playBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    bottom: -25
  },
  likeBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 10,
    bottom: -30
  },
  container: {
    padding: 20,
    flex: 1
  },
  relateInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  relateInfoTitle: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  relateInfoText: {
    fontSize: 20,
    color: 'gray'
  },
  castName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  }
})
export default MovieDetailScreen