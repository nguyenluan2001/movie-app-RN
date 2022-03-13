import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Dimensions } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <LottieView
                style={{height: 100}}
                source={require('../assets/animations/spinner.json')}
                autoPlay
                speed={1.5}
            />
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        // width: '100%',
        // height: Height,
        // flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    }
})