import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {windowHeight, windowWidth} from './dimentions/Dimentions';

export default function FormInput(props){
   
        return(
            <View style={styles.inputContainer}>
                <View style={styles.iconStyle}>
                    <AntDesign name={props.icon} size={20} color="#883997" />
                </View>
                <TextInput
                    value={props.labelValue}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={props.placeholderText}
                    placeholderTextColor="#78909c"
                    {...props}
                >
                </TextInput>
            </View>
        );
    }

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 20,
      marginBottom: 5,
      width: '100%',
      height: windowHeight / 20,
      borderColor: '#ccc',
      borderRadius: 6,
      borderBottomWidth: 1,
      flexDirection:'row',
      alignItems: 'center',
      borderBottomColor: '#883997'
    },
    iconStyle: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightColor: '#883997',
      borderRightWidth: 1,
      width: 50,
    },
    input: {
      padding: 10,
      fontSize: 15,
      fontFamily: 'Lato-Regular',
      color: '#333',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    inputField: {
      padding: 10,
      marginTop: 5,
      marginBottom: 10,
      width: windowWidth / 1.5,
      height: windowHeight / 20,
      fontSize: 15,
      borderRadius: 8,
      borderWidth: 1,
    },
  });
  