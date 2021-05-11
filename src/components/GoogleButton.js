import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default function GoogleButton(){

const navigation = useNavigation();

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
      console.log("signed in with google!");
      navigation.navigate("Home");
    })
    .catch(error => {
      console.log('Something went wrong with sign up: ', error);
    });
    } catch(error) {
      console.log({error});
    }
  }

return(
    <GoogleSigninButton
              style={{ width: 300 , height: 60, top: 15}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={() => onGoogleButtonPress()}
    />
)

}