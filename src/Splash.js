import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default class Splash extends Component {
  render() {
    return (
         <View style={styles.splashScreen}>
             <LottieView 
                source={require('../assets/splash.json')}
                autoPlay 
                loop={false}
             />
         </View>
    )
  }
}

const styles = StyleSheet.create({
    splashScreen:{
        flex:1,
        backgroundColor: "#580fe8"
    } 
});