import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import Home from './screens/Home';
import SingUp from './screens/SingUp';
import Face from './screens/Face';
import ResetPassword from './screens/ResetPassword';
import Logout from './components/Logout';
import Recognize from './components/Recognize';
import Album from './screens/Album';
import {BackHandler} from 'react-native';

const AppDrawer = createDrawerNavigator();

const Router = () => {

    const backAction = () => {
        return true;
      };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    
        return () =>
          BackHandler.removeEventListener("hardwareBackPress", backAction);
      }, []);

    return (
        <NavigationContainer>
            <AppDrawer.Navigator initialRouteName="Login"
             screenOptions={{ headerShown: true, headerTintColor: "#fff", headerLeft: () => null,
              headerStyle:{backgroundColor: "#4a0072", height: 80}
             }}>
               <AppDrawer.Screen name="Login" component={Login} 
                options={{headerShown: false}}/>
                <AppDrawer.Screen name = "Home" component={Home}
                    options={{
                        title: 'Who Is',
                        headerRight: () => (
                           <Logout />
                        )
                    }}
               />
               <AppDrawer.Screen name = "Album" component={Album}
                 options={{swipeEnabled: false}} />
               <AppDrawer.Screen name = "Identificação" component={Face}
                 options={{swipeEnabled: false}} />
                <AppDrawer.Screen name = "SingUp" component={SingUp}
                 options={{swipeEnabled: false, headerShown: false}} />
                <AppDrawer.Screen name = "ResetPassword" component={ResetPassword}
                 options={{swipeEnabled: false, headerShown: false}} />
                 <AppDrawer.Screen name = "Reconhecimento" component={Recognize}
                 options={{swipeEnabled: false, headerShown: false}} />
            </AppDrawer.Navigator>
        </NavigationContainer>
    )
}

export default Router;