import React from  'react';
import { useNavigation } from '@react-navigation/native';
import { LoginManager, AccessToken} from 'react-native-fbsdk';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import { windowHeight } from './dimentions/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


 export default function FacebookButton(){
const navigation = useNavigation();


async function onFacebookButtonPress() {
  try {
    
     // Attempt login with permissions
     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
   
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

        return(
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => onFacebookButtonPress()}
            >
                <View style={styles.iconWrapper}>
                    <FontAwesome name="facebook-official" style={styles.icon} size={50} color="#2461e0" />
                </View>
            </TouchableOpacity>
        );
}

const styles = StyleSheet.create({
    buttonContainer: {
      marginHorizontal: 15,
      height: windowHeight / 15,
    },
    iconWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
     // backgroundColor: '#2759c2'
    },
    icon: {
      fontWeight: 'bold',
      top: 15,
    },
  });