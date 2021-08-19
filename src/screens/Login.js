import React, {useState} from 'react';
import {TouchableOpacity, Text, ScrollView, StyleSheet, View} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import auth from '@react-native-firebase/auth';
import FacebookButton from '../components/FacebookButton';
import GoogleButton from '../components/GoogleButton';
import { windowHeight } from '../components/dimentions/Dimentions';

export default function Login({navigation}) { 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(email, password){
    await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signed in with email!');
      navigation.navigate("Home");
    })
    .catch(function(error) {
      // error from firebase documentation
      var errorCode = error.code;
      var errorMessage = error.message;
      if(errorCode === 'auth/user-not-found'){
        alert('Usuário não cadastrado!')
      }else if(errorCode === 'auth/wrong-password'){
        alert('Senha incorreta!')
      }else{
        alert(errorMessage);
      }
      console.log(error);
    });
  }

  return (

    <View style={styles.container}>
      
      <Text style={styles.text}>Who Is</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        icon="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        icon="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Login"
        onPress={() => handleLogin(email, password)}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("ResetPassword")}>
        <Text style={styles.navButtonText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        <View style={{flexDirection: 'row', marginRight: 40, padding: 10}}>
             <FacebookButton />
             <GoogleButton />
        </View>
        
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SingUp')}>
        <Text style={styles.navButtonText}>
          Ainda não é cadastrado? Clique aqui
        </Text>
      </TouchableOpacity>
    </View>
     
    );
  
}

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',  
      alignContent: 'space-between',
      paddingHorizontal: 40,
      height: windowHeight/ 1
    },
      text: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'bold',
      fontSize: 28,
      color: '#473299',
      bottom: 10,
      
    },
    navButton: {
      marginTop: 15,  
    },
    forgotButton: {
      marginVertical: 35,
    },
    navButtonText: {
      fontSize: 18,
      fontWeight: '500',
      color: '#78909c',
      fontFamily: 'Lato-Regular',
    },
    
  }); 