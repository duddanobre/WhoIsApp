import React, { useState, useEffect } from 'react';
import {View,Text, StyleSheet } from 'react-native';
import { Card, ListItem, FAB} from 'react-native-elements';

import Icon from 'react-native-vector-icons/Feather';

import auth from '@react-native-firebase/auth';

import Footer from '../components/footer';


export default function Home({navigation}) {

 /* const listaAtividades = [{
    atividade: 'Consulta geriatra ',
    horário: '09:00 pm',
    data: '12/05/2021'
  },
  {
    atividade: 'Dentista',
    horário: '09:00 pm',
    data: '12/05/2021'
  },
  {
  atividade: 'Terapia',
  horário: '09:00 pm',
  data: '12/05/2021'
  }]; */

const [agenda, setAgenda] = useState([]);

 function listAgenda(){
  firestore()
  .collection('agenda')
  .onSnapshot(querySnapshot => {
      const agenda = [];

      querySnapshot.forEach(documentSnapshot => {
          agenda.push(documentSnapshot.data());
      });

      setAgenda({agenda});
  });
 }

  useEffect(() => {
    listAgenda();
  }, [agenda])

    return (
      <View>
          <View style={styles.logoutButton}>
            <Icon name="log-out" size={24}
              onPress={() => auth().signOut()
                .then(() => console.log('User signed out!'),
                navigation.navigate("Login"))}
            >
            </Icon>
            </View>
              
                <Card containerStyle={{padding: 0, marginTop: 50}} >
                  <Card.Title style={{ backgroundColor: '#7200ca'}}>
                    <View style={{left:0}}>
                      <Text style={{color: '#fff'}}>Agenda</Text>
                    <FAB icon={
                      <Icon
                        name="plus"
                        size={24}
                        color="white"
                      />
                      } 
                      onPress={() => addAgenda()}
                    />
                  </View> 
                  </Card.Title>
                  {
                    agenda.map((item, i) => (
                      <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title style={{fontWeight: 'bold'}}>{item.atividade}</ListItem.Title>
                          <ListItem.Title>{item.hora}</ListItem.Title>
                          <ListItem.Title>{item.data}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                        <Icon name="edit" size={24} onPress={} />
                        <Icon name="trash" size={24} />
                      </ListItem>
                    ))
                  }

                </Card>
               
            
        <Footer />
      </View>

    )
  
}

const styles = StyleSheet.create({
  logoutButton:{
   top: 10,
   left: 315,

  },

})