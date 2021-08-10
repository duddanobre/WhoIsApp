import React, { useState, useEffect} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { windowHeight, windowWidth } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import ImagePicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';

export default function Identificação({navigation}) {

  const [image, setImage] = useState(null);
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [nome, setNome] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [persistedFaceId, setPersistedFaceId] = useState('');

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

  const fetchAlbum = async () => {
    try {
      const list = [];
  
      await firestore()
        .collection('album')
        .where('userItem', '==', userId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              userItem,
              nome,
              aniversario,
              persistedFaceId,
              parentesco
            } = doc.data();
            list.push({
              id: doc.id,
              userItem,
              nome,
              aniversario,
              persistedFaceId,
              parentesco
            });
          });
        });
  
      setAlbum(list);
       
      if(loading){
        setLoading(false);
      }
  
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    fetchAlbum(album);
  }, [album]);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
                <Card containerStyle={{padding: 0, marginTop: 40}} >
                  <View style={{
                     backgroundColor: '#7b1fa2', height: 80}}>  
                  </View>
                  <View>
                  <Avatar  
                  icon={{ name: 'image', color:'#a2a0a3', size: 60 }} 
                  containerStyle={styles.icon} size="large" 
                  activeOpacity={0.7}
                  />
                  <TouchableOpacity style={styles.buttonModal} onPress={choosePhotoFromLibrary}>
                    <Text style={styles.buttonModalText}> Selecionar da galeria </Text>
                  </TouchableOpacity>
                  <FormInput
                      labelValue={nome}
                      onChangeText={(nomeItem) => setNome(nomeItem)}
                      placeholderText="Nome da face"
                      icon="scan1"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                     <FormInput
                      labelValue={parentesco}
                      onChangeText={(parentItem) => setParentesco(parentItem)}
                      placeholderText="Parentesco ex: filho"
                      icon="scan1"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                     <FormInput
                      labelValue={aniversario}
                      onChangeText={(niver) => setAniversario(niver)}
                      placeholderText="Aniversário"
                      icon="calendar"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </Card>
              
             </ScrollView>


    )
  
}

const styles = StyleSheet.create({
  welcomeText:{
   bottom:15,
   fontSize: 14,
   fontFamily: 'Quicksand-Bold',
   color: '#fff',
   
  },
  welcome:{
    padding: 10,
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
    backgroundColor: '#e2dee3',
    marginTop: 10,
    width: '100%',
    height: windowHeight / 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonModalText:{
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold'
  },
  buttonRecognize:{
    left: 150,
    bottom: 10,
    marginTop: 280,
    height: windowHeight / 15,
},
icon: {
  justifyContent: 'center',
  flex: 1,
  //marginLeft: 90,
  backgroundColor: '#e2dee3',
  width: '100%',
  
},
});