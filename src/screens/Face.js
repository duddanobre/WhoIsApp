import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Card } from 'react-native-elements';
import { windowHeight, windowWidth } from '../components/dimentions/Dimentions';


export default function Home() {

    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
                <Card containerStyle={{padding: 0, marginTop: 40}} >
                  <View style={{
                     backgroundColor: '#7b1fa2', height: 80}}>  
                     
                  </View>
                </Card>
              
             </ScrollView>


    )
  
}

const styles = StyleSheet.create({
  welcomeText:{
   bottom:15,
   fontSize: 16,
   fontFamily: 'Quicksand-Bold',
   color: '#fff',
   
  },
  welcome:{
    padding: 30,
    width: windowWidth,
    height: windowHeight / 8
  },
  dataText:{
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    fontSize: 16
  },
  agendaText:{
    fontSize: 20,
    fontFamily: 'Quicksand-Bold'
  },
  buttonModal: {
    backgroundColor: '#e0e0e0',
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonModalText:{
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold'
  },
  buttonRecognize:{
    left: 150,
    bottom: 10,
    marginTop: 280,
    height: windowHeight / 15,
},
recognize: {
  top: 10
},
});