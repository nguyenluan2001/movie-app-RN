import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { Button, Icon, Image } from 'react-native-elements';
import { getLanguage, truncateText } from '../utils/lib';
import Carousel from 'react-native-snap-carousel';
import ModalCustom from '../components/ModalCustom';
import moment from 'moment';
import YoutubePlayer from 'react-native-youtube-iframe';
const MovieDetailScreen = ({ navigation, route }) => {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [openTrailer, setOpenTrailer] = useState(false);
  const [choosedPerson, setChoosedPerson] = useState(null);
  const { movieId, original_title } = route.params;
  useLayoutEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetchedMovie = await axiosInstance.get(`/movie/${movieId}`)
        const fetchedCredits = await axiosInstance.get(`/movie/${movieId}/credits`)
        const fetchedvideos = await axiosInstance.get(`/movie/${movieId}/videos`)
        console.log('movie', fetchedMovie.data)
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
      } catch (error) {
        console.log("error", error.message)
      }
    }
    fetchMovie()
  }, [navigation, route])
  const handleChoosePerson = async (person) => {
    let fetchedPerson = await axiosInstance.get(`/person/${person.id}`)
    setChoosedPerson(fetchedPerson.data)
    setModalVisible(true)
  }
  if (!movie) return <Text>Loading....</Text>
  return (
    <ScrollView style={{ backgroundColor: 'white', }}>
      <HeroSection movie={movie} setOpenTrailer={setOpenTrailer}></HeroSection>
      <View style={styles.container}>
        <RelateInformation movie={movie}></RelateInformation>
        <Overview movie={movie}></Overview>
        <MainCast casts={credits?.cast} handleChoosePerson={handleChoosePerson}></MainCast>
        <MainCrewTeam crews={credits?.crew} handleChoosePerson={handleChoosePerson}></MainCrewTeam>
        <Companies companies={movie?.production_companies}></Companies>
      </View>

      <ModalCustom modalVisible={openTrailer} setModalVisible={setOpenTrailer}>
        <ScrollView>
          {videos &&
            videos?.map((video) => (
              <YoutubePlayer
                height={300}
                videoId={video?.key}
              />
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
  )
}
const HeroSection = ({ movie, setOpenTrailer }) => {
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
      <Pressable style={styles.playBtn} onPress={() => setOpenTrailer(true)}>
        <Icon
          name="play"
          type="font-awesome-5"
          color="white"
        ></Icon>
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
      <Text style={styles.relateInfoText}>
        {
          numWords > 25
            ? truncateText(movie?.overview, 25)
            : movie?.overview
        }
      </Text>
      {isReadMore && <Text style={styles.relateInfoText}>{movie?.overview}</Text>}
      <View
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
      </View>
    </View>
  )
}
const MainCast = ({ casts, handleChoosePerson }) => {
  const [carousel, setCarousel] = useState(null);
  const renderItem = ({ item, index }) => {
    return (
      <CastItem cast={item} handleChoosePerson={handleChoosePerson}></CastItem>
    );
  }
  return (
    <View
      style={{
        marginTop: 30
      }}
    >
      <Text style={styles.relateInfoTitle}>Main cast</Text>
      {casts && <Carousel
        ref={(c) => setCarousel(c)}
        data={casts}
        renderItem={renderItem}
        sliderWidth={600}
        itemWidth={200}
      // activeSlideOffset={3}
      // firstItem={1}
      // callbackOffsetMargin={3}
      />}
    </View>
  )
}
const CastItem = ({ cast, handleChoosePerson }) => {
  return (
    <View
    >
      <Pressable
        onPress={() => handleChoosePerson(cast)}
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
      <CrewItem crew={item} handleChoosePerson={handleChoosePerson}></CrewItem>
    );
  }
  return (
    <View
      style={{
        marginTop: 30
      }}
    >
      <Text style={styles.relateInfoTitle}>Main crews</Text>
      {crews && <Carousel
        ref={(c) => setCarousel(c)}
        data={crews}
        renderItem={renderItem}
        sliderWidth={600}
        itemWidth={200}
      // activeSlideOffset={3}
      // firstItem={1}
      // callbackOffsetMargin={3}
      />}
    </View>
  )
}
const CrewItem = ({ crew, handleChoosePerson }) => {
  return (
    <View>
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
          companies?.map((company) => (
            <View
              style={{
                flexBasis: 200,
                marginBottom: 10
              }}
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