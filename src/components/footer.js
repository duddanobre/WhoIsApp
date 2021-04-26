import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


Icon.loadFont(); 

export default function Login() {

    return (
      
        <View style={styles.footer}> 
          <Icon name="copyright" size={18} color="#f5f5f5" style={{margin: 10}} />
          <Text style={styles.text} >Who Is </Text>
        </View>

    )
  
}

const styles = StyleSheet.create({
    footer:{
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 40, 
    },
    text:{
        color: "#f5f5f5",
        fontSize: 12
    }
});