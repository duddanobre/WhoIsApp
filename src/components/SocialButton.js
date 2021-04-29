import React from  'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { windowHeight } from './dimentions/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


 export default function SocialButton(props){
        return(
            <TouchableOpacity
                style={styles.buttonContainer}
                {...props}>
                <View style={styles.iconWrapper}>
                    <FontAwesome name={props.btnType} style={styles.icon} size={30} color={props.color} />
                </View>
                <View style={styles.btnTxtWrapper}>
                    <Text style={[styles.buttonText, {color: props.color}]}> {props.buttonTitle} </Text>
                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginHorizontal: 15,
      width: '100%',
      height: windowHeight / 15,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 4,
    },
    iconWrapper: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    icon: {
      fontWeight: 'bold',
      top: 15,
      left: 5
    },
    btnTxtWrapper: {
      justifyContent: 'center',
      alignItems: 'center',

    },
    buttonText: {
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
      top: 15,
      left: 25
    },
  });