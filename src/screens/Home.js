import React, { useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, ScrollView, View, TouchableOpacity, Alert, LogBox} from 'react-native';
import { Card, ListItem, Overlay} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icone from 'react-native-vector-icons/Ionicons';
import { format } from 'date-fns';
import { windowHeight, windowWidth } from '../components/dimentions/Dimentions';
import firestore, {firebase} from '@react-native-firebase/firestore';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import RecognizeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

export default function Home() {

const [id, setId] = useState('');  
const [agenda, setAgenda] = useState([]);
const [loading, setLoading] = useState(true);
const [userId, setUserId] = useState('');
const [username, setUserName] = useState('');
const [atividade, setAtividade] = useState('');
const [hora, setHora] = useState('');
const [data, setData] = useState('');
const [visible, setVisible] = useState(false);
const [visibleE, setVisibleE] = useState(false);

const navigation = useNavigation();

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
            id: doc.id,
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

async function editarAgenda(){
  await firestore()
  .collection('agenda')
  .doc(id)
  .update({
      atividade: atividade,
      data: data,
      hora:hora
  })
  .then(() => {
    alert("Agenda atualizada!");
  });
} 

function deleteAgenda(){
  Alert.alert(
    "Deletar atividade",
    "Deseja realmente deletar " + atividade + "?",
    [
        {
            text: "Cancelar",
            style: "cancel"
        },
        {
            text: "OK",
            onPress: () => {
               firestore()
                    .collection('agenda')
                    .doc(id)
                    .delete()
                    .then(() => {
                        alert('atividade removida');
                    });
            }
        }
    ]
);
}

useEffect(() => {
  LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, []);
 
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
                <Card containerStyle={{padding: 0, marginTop: 40}} >
                  <View style={{
                     backgroundColor: '#7b1fa2', height: 80}}
                  >  
                     <View>  
                       <Icon
                        style={{top: 20, left: 320}}
                          name="plus-circle"
                          size={40}
                          color="white"
                          onPress={() => setVisible(!visible)}
                       />  
                      </View>
                  </View>
                  { 
                    agenda.map((item) => (
                      <ListItem key={item.id} bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title style={{fontWeight: 'bold'}}>{item.atividade}</ListItem.Title>
                          <ListItem.Title>{item.data}</ListItem.Title>
                          <ListItem.Title>{item.hora}</ListItem.Title>
                        </ListItem.Content>
                        <Icon name="edit" size={24} onPress={() => {
                          setVisibleE(!visibleE), setId(item.id), setAtividade(item.atividade), setHora(item.hora), setData(item.data)}}/>
                        <Icon name="trash" size={24} onPress={() => {setId(item.id), setAtividade(item.atividade), deleteAgenda()}} />
                      </ListItem>
                    )) 
                  }
                </Card>
              <View>
                  <Overlay isVisible={visible} overlayStyle={{padding: 40, width: 350, height: 450}}>
                    <Text style={styles.agendaText}> Cadastrar atividade </Text>
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
                
        <View>
            <Overlay isVisible={visibleE} overlayStyle={{padding: 40, width: 350, height: 450}}>
            <Text style={styles.agendaText}> Editar atividade </Text>
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
                  buttonTitle="Editar"
                  onPress={() => 
                    {setVisibleE(!visibleE), editarAgenda();
                  }}
              />
              <TouchableOpacity style={styles.buttonModal} onPress={() => setVisibleE(!visibleE)}>
                <Text style={styles.buttonModalText}> Cancelar </Text>
              </TouchableOpacity>

          </Overlay>
    </View>    
        
          <View style={styles.buttonRecognize}>
          </View>
          <ActionButton buttonColor="#ae52d4">
            <ActionButton.Item buttonColor='#ffd500' title="Album" onPress={() => {navigation.navigate("Album")}}>
              <Icone name="image" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#9c52d4' title="Reconhecer" onPress={() => {navigation.navigate("Reconhecimento")}}>
              <RecognizeIcon name="face-recognition" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        </ActionButton>
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
actionButtonIcon:{
  fontSize: 20,
  height: 22,
  color: 'white',
}
});