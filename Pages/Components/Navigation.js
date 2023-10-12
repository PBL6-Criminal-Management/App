import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AuthContext } from '../../Context/AuthContext';
import Login from '../Login/index.js'
import BottomTab from './BottomTab.js';
import Splash from '../SplashScreen/SplashScreen.js';

const Stack = createNativeStackNavigator()

const Navigation = () => {
    const {userInfo, splashLoading} = useContext(AuthContext)

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
          {splashLoading ? (
            <Stack.Screen 
              name="Splash" 
              component={Splash}
            />
          ) : 
          userInfo.token ? (
            <Stack.Screen 
              name="Bottom"
              component={BottomTab} 
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
              />
            </>
          )}          
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default Navigation