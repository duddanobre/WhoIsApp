import React from 'react';
import { StyleSheet } from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { windowHeight} from './dimentions/Dimentions';
import { FAB } from 'react-native-elements';


export default function Recognize(){


    return(
        <View style={styles.button}> 
        <FAB color="#ae52d4"
                      icon={
                        <Icon 
                        name="face-recognition" 
                        size={24} 
                        color="#fff"
                        />
                      } 
                        onPress={() => {}}
                    />
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        left: 150,
        bottom: 10,
        marginTop: 280,
        height: windowHeight / 15,
    }
});