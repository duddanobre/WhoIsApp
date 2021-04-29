import React, {useState} from 'react';
import {TouchableOpacity, Text, ScrollView, StyleSheet, View} from 'react-native';
import { LoginManager, AccessToken} from 'react-native-fbsdk';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';

import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import SocialButton from '../components/SocialButton';

export default function Login({navigation}) { 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId: "145031685782-4s4ictu61k2ka9ev4rjejh538oshtkvb.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    try{
      //await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    await auth()
    .signInWithCredential(googleCredential)
    .then( () => { 
      console.log("Sucesso!");
      navigation.navigate("Home");
    })
    .catch(error => {
      console.log('Something went wrong with sign up: ', error);
    });
    } catch(error) {
      console.log({error});
    }
  }
  async function handleLogin(email, password){
    await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signed in!');
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

  async function onFacebookButtonPress() {
    try {
      
       // Attempt login with permissions
       const result = await LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']);
     
       if (result.isCancelled) {
         throw 'User cancelled the login process';
       }
     
       // Once signed in, get the users AccesToken
       const data = await AccessToken.getCurrentAccessToken();
     
       if (!data) {
         throw 'Something went wrong obtaining access token';
       }
     
       // Create a Firebase credential with the AccessToken
       const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
     
       // Sign-in the user with the credential
       return auth().signInWithCredential(facebookCredential)
       .then(() => {
         console.log("Sign Sucess!")
         navigation.navigate("Home");
        });
    } catch (error) {
      console.log(error);
    }
   };

    return (

    <ScrollView contentContainerStyle={styles.container}>
      
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
        <View>
             <SocialButton 
              btnType="facebook-official"
              color="#4867aa"
              buttonTitle= "Fazer login com Facebook"
              onPress={() => onFacebookButtonPress()}
            />
            <GoogleSigninButton
              style={{ width: 300 , height: 60, top: 15, left: 20}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={() => onGoogleButtonPress()}
            />
        </View>
        
      ) : null}

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SingUp')}>
        <Text style={styles.navButtonText}>
          Ainda não é cadastrado? Clique aqui
        </Text>
      </TouchableOpacity>
    </ScrollView>
     
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
      color: '#78909c',
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