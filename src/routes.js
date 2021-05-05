import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './screens/Login';
import Home from './screens/Home';
import SingUp from './screens/SingUp';
import ResetPassword from './screens/ResetPassword';


const AppDrawer = createDrawerNavigator();

function Router(){
    return (
        <NavigationContainer>
            <AppDrawer.Navigator initialRouteName="Login"
             screenOptions={{ headerShown: true, headerTintColor: "#fff",
              headerStyle:{backgroundColor: "#7200ca"}
             }}>
                <AppDrawer.Screen name="Login" component={Login} 
                options={{swipeEnabled: false, headerShown: false}}/>
                <AppDrawer.Screen name = "Home" component={Home} />
                <AppDrawer.Screen name = "SingUp" component={SingUp}
                 options={{swipeEnabled: false, headerShown: false}} />
                <AppDrawer.Screen name = "ResetPassword" component={ResetPassword}
                 options={{swipeEnabled: false, headerShown: false}} />
            </AppDrawer.Navigator>
        </NavigationContainer>
    )
}

export default Router;