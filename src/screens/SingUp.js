import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native';

import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import auth from '@react-native-firebase/auth';

import FacebookLogin from '../components/FabebookLogin';

export default function SingUp({navigation}) { 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleRegister(email, password){
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert('Usuário criado!');
      navigation.navigate("Home");
     
    })
    .catch(function(error) {
        // error from firebase documentation
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/email-already-in-use'){
          alert('Este email já está sendo utilizado!')
        }else if(errorCode === 'auth/invalid-email'){
          alert('Email inválido!')
        }else if(errorCode === 'auth/weak-password'){
          alert('Senha inválida (A senha deve ter pelo menos 6 caracteres)');
        }else {
            alert(errorMessage);
        }
          console.log(error);
      });
  }

    return (
        
    <View style={styles.container}>
      <Text style={styles.text}>Crie uma conta</Text>

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

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        icon="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Cadastrar"
        onPress={() => handleRegister(email, password)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      {Platform.OS === 'android' ? (
        <View>
          <FacebookLogin />
          
        </View>
      ) : null}

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