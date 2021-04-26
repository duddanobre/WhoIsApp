import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import auth from '@react-native-firebase/auth';

export default function ResetPassword({navigation}) { 

  const [email, setEmail] = useState('');
  const actionCodeSettings = {
    url: 'https://whoisapp.com/resetPassword?mode=action&oobCode=code',
    android: {
      packageName: 'com.whois',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true
  };

  function handleResetPassword(email){
    auth()
    .sendPasswordResetEmail(email, actionCodeSettings)
    .then(() => {
      alert('Email enviado');
      navigation.navigate("Login");
     
    })
    .catch(function(error) {
        // error from firebase documentation
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth / invalid-email'){
          alert('Email inválido!')
        }else if(errorCode === 'auth / user-not-found'){
          alert('Não foi encontrado nenhum usuário com este email!')
        }else {
            alert(errorMessage);
        }
          console.log(error);
      });
  }

    return (
        
    <View style={styles.container}>
      <Text style={styles.text}>Redefinir Senha</Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        icon="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Redefinir"
        onPress={() => handleResetPassword(email)}
      />


      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Já tem uma conta? Login</Text>
      </TouchableOpacity>
    </View>

    );
} 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
   
    },
    text: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'bold',
      fontSize: 28,
      marginBottom: 10,
      color: '#051d5f',
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
      color: '#2e64e5',
      fontFamily: 'Lato-Regular',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
      },
      color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Lato-Regular',
        color: 'grey',
      },
  }); 