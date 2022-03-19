import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useSelector } from 'react-redux';
import LibraryMovieItem from './LibraryMovieItem';
import EmptyComp from './EmptyComp';
import Loading from './Loading';
import {isEmpty} from "lodash";
const FavoriteMovies = ({ navigation }) => {
  const [movies, setMovies] = useState(null);
  const user = useSelector(state => state.user);
  useEffect(async () => {
    let unsub;
    if (user) {
      const q = query(collection(db, "favoriteMovies"), where("user_id", "==", user?.uid));

      unsub = onSnapshot(q, (querySnapshot) => {
        const fetchedMovies = [];
        querySnapshot.forEach((doc) => {
          fetchedMovies.push({
            uid: doc.id,
            ...doc.data()
          });
        });
        setMovies(fetchedMovies);
      });

    }
    return unsub;
    console.log("movies", movies)
  }, [user])
  const renderItem = ({ item }) => (
    <LibraryMovieItem movie={item} navigation={navigation}></LibraryMovieItem>
  );
  if (isEmpty(movies)) {
    return (
      <EmptyComp></EmptyComp>     
    )
  }
  return (
    <>
      <FlatList
        data={movies ?? []}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      ></FlatList>
    </>
  )
}

export default FavoriteMovies

const styles = StyleSheet.create({})