import React, { useState, useEffect} from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { windowHeight, windowWidth } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import ImagePicker from 'react-native-image-crop-picker';
import FormButton from '../components/FormButton';

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
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

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
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const addFace = async () => {
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);

    firestore()
    .collection('album')
    .add({
      userItem: userId,
      nome: nome,
      aniversario: aniversario,
      persistedFaceId: persistedFaceId,
      parentesco: parentesco
    })
    .then(() => {
      console.log('People added');
      Alert.alert('Pessoa cadastrada com sucesso!');
      setNome(''), setParentesco(''), setAniversario(''), setImage(null);
    })
    .catch((error) => {
      Alert.alert('Um erro ocorreu, verifique os dados e tente novamente!', error);
    });
  }

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`faces/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
                <Card containerStyle={{padding: 35, marginTop: 40, marginBottom: 30}}>
                  <View style={{backgroundColor: '#7b1fa2', height: 80}}>  
                  </View>
                  <View>
                { image == null ? (
                  <Avatar  
                  icon={{ name: 'image', color:'#a2a0a3', size: 60 }} 
                  containerStyle={styles.icon} size="large" 
                  activeOpacity={0.7}
                  />) : (
                  <Avatar 
                  source={{uri: image}} containerStyle={styles.image} size="medium" 
                  activeOpacity={0.7}
                 />
                )}
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
                     <FormButton
                      buttonTitle="Cadastrar pessoa"
                      onPress={() => {addFace()}}
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
    height: windowHeight / 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttonModalText:{
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold'
  },
image: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#e2dee3',
    width: '100%',
    height: windowHeight/2.6,
    padding: 15
  },
icon: {
  justifyContent: 'center',
  flex: 1,
  backgroundColor: '#e2dee3',
  width: '100%',
  padding: 10
},
});