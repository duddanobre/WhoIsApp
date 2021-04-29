import React from 'react';
import { View} from 'react-native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken} from 'react-native-fbsdk';

import SocialButton from './SocialButton';

export default function FacebookSignIn({navigation}) {

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
        .then(() => {console.log("Sign Sucess!")});
     } catch (error) {
       console.log(error);
     }
    };


  return (
    <View>
        <SocialButton 
          btnType="facebook-official"
          color="#4867aa"
          buttonTitle= "Fazer login com Facebook"
          onPress={() => onFacebookButtonPress().then(() => {navigation.navigate("Home")})}
        />

    </View>
  );
}