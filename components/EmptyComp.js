import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const EmptyComp = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={{ height: 250 }}
                source={require('../assets/animations/empty.json')}
                autoPlay
                speed={1.5}
            />
        </View>
    )
}

export default EmptyComp

const styles = StyleSheet.create({
    container:{
        width: windowWidth,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    }
})