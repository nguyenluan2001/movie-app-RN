import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import MovieList from './MovieList';
import MovieGrid from './MovieGrid';
import { Text, useTheme } from 'react-native-elements';

const ShowMovies = ({ movies, navigation, title="Most Popular" }) => {
    const [layout, setLayout] = useState(1);
    return (
        <ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                <Text h2>{title}</Text>
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
            </View>
            {layout === 1 && <MovieList movies={movies} navigation={navigation}></MovieList>}
            {layout === 2 && <MovieGrid movies={movies} navigation={navigation}></MovieGrid>}
        </ScrollView>
    )
}

export default ShowMovies

const styles = StyleSheet.create({})