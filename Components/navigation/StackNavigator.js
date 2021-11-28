import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Home';
import UserSignup from '../Signup';
import UserSignupFinal from '../SignupFinal';
import Profile from '../Profile';
import LogoDesign from '../LogoDesign';

import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      <Stack.Screen name="UserSignupFinal" component={UserSignupFinal} />
      <Stack.Screen name="LogoDesign" component={LogoDesign} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Menu" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
