import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Tab, TabView } from 'react-native-elements'
import FavoriteMovies from '../components/FavoriteMovies'

const LibraryScreen = ({ navigation }) => {
    const [tabIndex, setTabIndex] = useState(0)
    return (
        <>
            <Tab
                value={tabIndex}
                onChange={(e) => setTabIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="History"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
                />
                <Tab.Item
                    title="Favotire Movies"
                    titleStyle={{ fontSize: 12 }}
                    icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
                />
            </Tab>
            <TabView value={tabIndex} onChange={setTabIndex} animationType="spring">
                <TabView.Item>
                    <Text h1>History</Text>
                </TabView.Item>
                <TabView.Item>
                    <FavoriteMovies navigation={navigation} ></FavoriteMovies>
                </TabView.Item>
            </TabView>
        </>
    )
}

export default LibraryScreen

const styles = StyleSheet.create({})