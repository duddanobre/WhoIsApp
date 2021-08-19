import React, { useState, useEffect} from 'react';
import { Text } from 'react-native';
import {StyleSheet, ScrollView, View} from 'react-native';
import { Card, ListItem, Avatar } from 'react-native-elements';
import { windowHeight } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Feather';
import LottieView from 'lottie-react-native';

export default function Identificação({route, navigation}) {
 
  const {paramResponse} = route.params;

  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const r = Object.values(paramResponse);
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
              parentesco,
              face
            } = doc.data();
            list.push({
              id: doc.id,
              userItem,
              nome,
              aniversario,
              persistedFaceId,
              parentesco,
              face
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
    loading? (
          <LottieView source={require('../assets/loading2.json')} autoPlay loop />
    ) : (
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
            album.map((item) =>  (
              <ListItem key={item.id} bottomDivider>
                <ListItem.Content>
                  <Avatar 
                    source={{uri: item.face}} containerStyle={styles.image} size="medium" 
                    activeOpacity={0.7} >
                  </Avatar>
                  <Text style={{fontSize: 17}}>Nome: <ListItem.Title style={{fontSize: 17}}>{item.nome}</ListItem.Title></Text>
                  <Text style={{fontSize: 17}}>Aniversário: <ListItem.Title style={{fontSize: 17}}>{item.aniversario}</ListItem.Title></Text>
                  <Text style={{fontSize: 17}}>O que essa pessoa é minha? 
                    <ListItem.Title style={{fontWeight: 'bold', fontSize: 17}}> {item.parentesco}</ListItem.Title>
                  </Text>
                </ListItem.Content>
              </ListItem>
            )) 
          }
        </Card>     
      </ScrollView>
    )

    )
  
}

const styles = StyleSheet.create({
image: {
  justifyContent: 'center',
  flex: 1,
  width: '100%',
  height: windowHeight/2.6,
  padding: 15
},
});