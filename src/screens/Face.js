import React, { useState, useEffect} from 'react';
import { Text } from 'react-native';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { windowHeight, windowWidth } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';

export default function Identificação({route, navigation}) {
 
  const {paramResponse} = route.params;

  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const r = Object.values(paramResponse)
  const x = r.map(i => i.persistedFaceId);

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
        .where('persistedFaceId', '==', x[0])
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

    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
                <Card containerStyle={{padding: 0, marginTop: 40}} >
                  <View style={{
                     backgroundColor: '#7b1fa2', height: 80}}>  
                     <View>  
                       <Icon
                        style={{top: 20, left: 320}}
                          name="arrow-left-circle"
                          size={40}
                          color="white"
                          onPress={() => navigation.goBack()}
                       />  
                      </View>
                  </View>
                  {
                    album.map((item) =>(
                      <ListItem key={item.id} bottomDivider>
                        <ListItem.Content>
                          <Text style={{fontSize: 14}}>Nome: <ListItem.Title style={{fontSize: 14}}>{item.nome}</ListItem.Title></Text>
                          <Text style={{fontSize: 14}}>Aniversário: <ListItem.Title style={{fontSize: 14}}>{item.aniversario}</ListItem.Title></Text>
                          <Text style={{fontSize: 14}}>O que essa pessoa é minha? 
                            <ListItem.Title style={{fontWeight: 'bold', fontSize: 14}}> {item.parentesco}</ListItem.Title>
                          </Text>
                          <Text>{item.persistedFaceId}</Text>
                        </ListItem.Content>
                      </ListItem>
                    )) 
                    
                  }
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