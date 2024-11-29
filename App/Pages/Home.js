/* App/Pages/Home.js */
import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNcomponent from './Sub-Components/BottomComponent';

import UserProfileComponent from './Sub-Components/UserProfileComponent';
import SearchBarComponent from './Sub-Components/SearchBarComponent';
import BannerComponent from './Sub-Components/BannerComponent';
import VideoCourseComponent from './Sub-Components/VideoCourseComponent';
import BasicCourseComponent from './Sub-Components/BasicCourseComponent';
import AdvancedCourseComponent from './Sub-Components/AdvancedCourseComponent';

const Home = ({ navigation, route }) => {
    const { name } = route.params;
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <UserProfileComponent 
                name={name} 
                onLogoutPress={() => {
                    Services.Logout();
                    navigation.navigate('Login');
                }}  
            />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <TouchableOpacity onPress={() => nav.navigate('SearchScreen')}> 
                    <SearchBarComponent /> 
                </TouchableOpacity>

                <BannerComponent />
                <VideoCourseComponent />
                <BasicCourseComponent navigation={navigation} />
                <AdvancedCourseComponent navigation={navigation}/>
            </ScrollView>
            
            <BottomNcomponent />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fcff',
    },
    scrollViewContent: {
        padding: 16,
        paddingBottom: 70,
    },
});
export default Home;