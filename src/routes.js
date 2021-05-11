import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import Home from './screens/Home';
import SingUp from './screens/SingUp';
import ResetPassword from './screens/ResetPassword';
import Logout from './components/Logout';
import Icon from 'react-native-vector-icons/Feather';

const AppDrawer = createDrawerNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <AppDrawer.Navigator initialRouteName="Login"
             screenOptions={{ headerShown: true, headerTintColor: "#fff",
              headerStyle:{backgroundColor: "#4a0072", height: 80},
             }}>
                <AppDrawer.Screen name="Login" component={Login} 
                options={{swipeEnabled: false, headerShown: false}}/>
                <AppDrawer.Screen name = "Home" component={Home}
                    options={{
                        title: 'Who Is',
                        headerRight: () => (
                           <Logout />
                        )
                    }}
               />
                <AppDrawer.Screen name = "SingUp" component={SingUp}
                 options={{swipeEnabled: false, headerShown: false}} />
                <AppDrawer.Screen name = "ResetPassword" component={ResetPassword}
                 options={{swipeEnabled: false, headerShown: false}} />
            </AppDrawer.Navigator>
        </NavigationContainer>
    )
}

export default Router;