import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function GoogleSignIn({navigation}) {

    GoogleSignin.configure({
        webClientId: "145031685782-4s4ictu61k2ka9ev4rjejh538oshtkvb.apps.googleusercontent.com",
      });

      async function onGoogleButtonPress() {
        
        await GoogleSignin.hasPlayServices();
            // Get the users ID token
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
        .catch(function(error) {
          // error from firebase documentation
          console.log(error);
        });
        
      }


  return (
    <View>
       {/* <SocialButton 
          btnType="google"
          color="#de4d41"
          buttonTitle= "Login com Google"
          onPress={() => onGoogleButtonPress()}
       /> */}

        <GoogleSigninButton
          style={{ width: 300 , height: 60, top: 15, left: 20}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={() => onGoogleButtonPress()}
        />
    </View>
  );
}