import React from  'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {windowHeight} from './dimentions/Dimentions';


export default function FormButton({buttonTitle, ...rest}){

        return(
            <TouchableOpacity style={styles.buttonContainer} {...rest}>
                <Text style={styles.buttonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginTop: 10,
      width: '100%',
      height: windowHeight / 20,
      backgroundColor:  '#7200ca',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#f3e5f5',
      fontFamily: 'Lato-Regular',
    },
  });