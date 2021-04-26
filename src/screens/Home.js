import React from 'react';
import {View,Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import auth from '@react-native-firebase/auth';

import Footer from '../components/footer';


Icon.loadFont(); 

export default function Home({navigation}) {

    return (
      <View>
        <Text>TELA INICIAL </Text>

        <Icon name="logout" size={24}
          onPress={() => auth().signOut()
            .then(() => console.log('User signed out!'),
            navigation.navigate("Login"))}
        >
          <Text>Sair </Text>
        </Icon>

        <Footer />

      </View>

    )
  
}
