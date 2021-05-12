import React, { useState, useEffect} from 'react';
import {Text, StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import { Card, ListItem, FAB, Overlay} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import { windowHeight } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function Home() {

const [agenda, setAgenda] = useState([]);
const [loading, setLoading] = useState(true);
const [userId, setUserId] = useState('');
const [username, setUserName] = useState('');
const [atividade, setAtividade] = useState('');
const [hora, setHora] = useState('');
const [data, setData] = useState('');
const [visible, setVisible] = useState(false);

const getCurrentUser=()=>{
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserId(user.uid);
      setUserName(user.displayName)
    }
  });
  return username;
}

const getCurrentDate=()=>{

  return format(new Date(), 'dd/MM/yyyy')
}

const fetchAgenda = async () => {
  try {
    const list = [];

    await firestore()
      .collection('agenda')
      .where('userItem', '==', userId)
      .orderBy('data', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {
            userItem,
            atividade,
            data,
            hora
          } = doc.data();
          list.push({
            userItem,
            atividade,
            data,
            hora  
          });
        });
      });

    setAgenda(list);

    if(loading){
      setLoading(false);
    }

    //console.log(agenda);
  } catch (e) {
    console.log(e);
  }
};

useEffect(() => {
  fetchAgenda(agenda);
}, [agenda]);

function addAgenda(){
  firestore()
  .collection('agenda')
  .add({
    userItem: userId,
    atividade: atividade,
    data: data,
    hora: hora
  })
  .then(() => {
    alert('Atividade adicionada!');
  });
}

 
    return (
      <ScrollView contentContainerStyle={styles.containerStyle}>
          <LinearGradient colors={['#4a0072', '#7b1fa2']}
           style={styles.welcome}> 
          <Text style={styles.welcomeText}>
            <Icon name="user" size={20} color="#fff" />
              Olá {getCurrentUser()}
          </Text>
          <Text style={styles.dataText}>
            <Icon name="calendar" size={20} color="#fff" />
             {getCurrentDate()} 
          </Text>
          </LinearGradient>
              <View style={{top: 40, left: 115}}>
                    <FAB color="#ae52d4"
                    title="Adicionar"
                      icon={
                        <Icon
                          name="plus"
                          size={24}
                          color="white"
                        />
                      } 
                        onPress={() => setVisible(!visible)}
                    />
                </View>
                <Card containerStyle={{padding: 0, marginTop: 40}} >
                  <Card.Title style={{
                     backgroundColor: '#7b1fa2', height: 80}}>
                  </Card.Title>
                  {
                    agenda.map((item, i) => (
                      <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title style={{fontWeight: 'bold'}}>{item.atividade}</ListItem.Title>
                          <ListItem.Title>{item.data}</ListItem.Title>
                          <ListItem.Title>{item.hora}</ListItem.Title>
                        </ListItem.Content>
                        <Icon name="edit" size={24}  />
                        <Icon name="trash" size={24} />
                      </ListItem>
                    ))
                  }
                </Card>
              <View>
                  <Overlay isVisible={visible} overlayStyle={{padding: 40, width: 350, height: 450}}>
                    <Text style={styles.agendaText}> Cadastrar agenda </Text>
                    <FormInput
                      labelValue={atividade}
                      onChangeText={(agendaItem) => setAtividade(agendaItem)}
                      placeholderText="Nome da atividade"
                      icon="rest"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <FormInput
                      labelValue={hora}
                      onChangeText={(agendaHora) => setHora(agendaHora)}
                      placeholderText="Hora da atividade"
                      icon="clockcircleo"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <FormInput
                      labelValue={data}
                      onChangeText={(agendaData) => setData(agendaData)}
                      placeholderText="Data da atividade"
                      icon="calendar"
                      keyboardType="default"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />

                      <FormButton
                          buttonTitle="Adicionar"
                          onPress={() => 
                            {addAgenda(), setVisible(!visible)
                             }}
                      />
                       <TouchableOpacity style={styles.buttonModal} onPress={() => setVisible(!visible)}>
                         <Text style={styles.buttonModalText}> Cancelar </Text>
                       </TouchableOpacity>

                  </Overlay>
              </View>
        
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

  }
})