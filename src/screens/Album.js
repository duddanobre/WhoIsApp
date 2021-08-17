import React, { useState, useEffect} from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Card, Avatar } from 'react-native-elements';
import { windowHeight, windowWidth } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import ImagePicker from 'react-native-image-crop-picker';
import FormButton from '../components/FormButton';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/Feather';

const locate = 'southcentralus.api.cognitive.microsoft.com';
const key = '4babdbede4bc4fb59ce92d5b9f2fe1ae';

const base_instance_options = {
  baseURL: `https://${locate}/face/v1.0`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': key
  }
};

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
    const faceId = await faceAddAPI();
    const imageUrl = await uploadImage();

    firestore()
        .collection('album')
        .add({
          userItem: userId,
          nome: nome,
          aniversario: aniversario,
          persistedFaceId: faceId,
          parentesco: parentesco,
          face: imageUrl
        })
        .then(() => {
          console.log('People added', persistedFaceId, faceId);
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

  async function faceAddAPI(){
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    try {
      const addFaces = { ...base_instance_options };
      addFaces.headers['Content-Type'] = 'application/json';
      const addFaces_instance = axios.create(addFaces);
      const addFaces_res = await addFaces_instance.post(
      `/facelists/whois-3e-facelist/persistedFaces`,
        {url: imageUrl}
      );
      console.log("face added:", addFaces_res.data.persistedFaceId);
      //setPersistedFaceId(addFaces_res.data.persistedFaceId);
      return addFaces_res.data.persistedFaceId;
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
                <Card containerStyle={{padding: 35, marginTop: 40, marginBottom: 30}}>
                <View style={{
                     backgroundColor: '#7b1fa2', height: 80}}>  
                     <View>  
                       <Icon
                        style={{top: 20, left: 10}}
                          name="arrow-left-circle"
                          size={30}
                          color="white"
                          onPress={() => navigation.goBack()}
                       />  
                      </View>
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