import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
} from "react-native";

import Login from './App/Pages/Login';
import Home from './App/Pages/Home';
import BasicPythonCourseDetails from './App/Pages/BasicPythonCourseDetails';
import BasicReactJSCourseDetails from './App/Pages/BasicReactJSCourseDetails';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BasicPythonCourseDetails" component={BasicPythonCourseDetails} />
        <Stack.Screen name="BasicReactJSCourseDetails" component={BasicReactJSCourseDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
