import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import Home from './screens/Home';
import SingUp from './screens/SingUp';
import ResetPassword from './screens/ResetPassword';

const AppDrawer = createDrawerNavigator();

function Router(){

    return(
        <NavigationContainer>
        <AppDrawer.Navigator initialRouteName="Login">
            <AppDrawer.Screen name="Login" component={Login} />
            <AppDrawer.Screen name="Home" component={Home} />
            <AppDrawer.Screen name="SingUp" component={SingUp} />
            <AppDrawer.Screen name="ResetPassword" component={ResetPassword} />
        </AppDrawer.Navigator>
        </NavigationContainer>
        
    );
} 

export default Router;