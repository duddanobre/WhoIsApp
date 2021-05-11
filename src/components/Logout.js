import React from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Feather';

export default function Logout(){

const navigation = useNavigation();
return(
    <Icon name="log-out" size={24} color='#fff'
    onPress={() => 
        auth()
        .signOut()
        .then(() => {
            console.log("Logged out!");
            navigation.navigate("Login");
        })}
    style={{marginRight: 20}}
    />
);
}