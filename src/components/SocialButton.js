import React from  'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { windowHeight } from './dimentions/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


 export default function SocialButton(props){
        return(
            <TouchableOpacity 
                style={styles.buttonContainer, styles.bgColor}
                {...props}>
                <View style={styles.iconWrapper}>
                    <FontAwesome name={props.btnType} style={styles.icon} size={22} color={props.color} />
                </View>
                <View style={styles.btnTxtWrapper}>
                    <Text style={styles.buttonText}> {props.buttonTitle} </Text>
                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      height: windowHeight / 15,
      padding: 10,
      flexDirection: 'row',
      borderRadius: 3,
    },
    iconWrapper: {
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 15,
    },
    icon: {
      fontWeight: 'bold',
    },
    btnTxtWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Lato-Regular',
      color: '#4867aa',
      paddingBottom: 10
    },
    bgColor: {
        backgroundColor: '#e6eaf4',
    }
  });