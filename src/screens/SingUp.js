import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import auth from '@react-native-firebase/auth';

export default function SingUp({navigation}) { 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleRegister(email, password){
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      firestore().collection('users').doc(auth().currentUser.uid).
      set({
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
      })
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
        labelValue={firstName}
        onChangeText={(userFName) => setFirstName(userFName)}
        placeholderText="Primeiro nome"
        icon="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={lastName}
        onChangeText={(userLName) => setLastName(userLName)}
        placeholderText="Último nome"
        icon="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={age}
        onChangeText={(userAge) => setAge(userAge)}
        placeholderText="Data de nascimento ex: dd/mm/yyyy"
        icon="calendar"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        icon="mail"
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

     {/* {Platform.OS === 'android' ? (
        <View>
          <FacebookLogin />
          
        </View>
     ) : null} */}

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
      marginBottom: 20,
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