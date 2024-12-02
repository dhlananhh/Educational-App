import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";

import Login from './App/Pages/Login';
import Home from './App/Pages/Home';
import BasicPythonCourseDetails from './App/Pages/BasicPythonCourseDetails';
import BasicReactJSCourseDetails from './App/Pages/BasicReactJSCourseDetails';
import MySQLCourseDetails from './App/Pages/MySQLCourseDatails';
import BasicReactNativeCourseDetails from './App/Pages/BasicReactNativeCourseDetails'
import CourseChapter from './App/Pages/CourseChapter';
import PlayVideo from './App/Pages/PlayVideo';
import SearchScreen from './App/Pages/SearchScreen';
import ReviewScreen from './App/Pages/ReviewScreen';
import ProfileScreen from './App/Pages/ProfileSceen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown:false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Home" component={Home} 
          options={({ route, navigation }) => ({
            headerLeft: false,
            headerShadowVisible: false,
            headerTitle: "",
            headerStyle: {
              backgroundColor: '#f6f8fc',
            },

          })}
        />
        <Stack.Screen name="BasicPythonCourseDetails" component={BasicPythonCourseDetails} />
        <Stack.Screen name="BasicReactJSCourseDetails" component={BasicReactJSCourseDetails} />
        <Stack.Screen name="MySQLCourseDetails" component={MySQLCourseDetails} />
        <Stack.Screen name="BasicReactNaviveCourseDetails" component={BasicReactNativeCourseDetails} />
        <Stack.Screen name="CourseChapter" component={CourseChapter} />
        <Stack.Screen name="PlayVideo" component={PlayVideo} />
        <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
