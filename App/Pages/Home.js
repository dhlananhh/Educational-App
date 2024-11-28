/* App/Pages/Home.js */
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
        <ScrollView style={styles.container}>
            <UserProfileComponent name={name} onLogoutPress={() => {
                    Services.Logout();
                    navigation.navigate('Login');
                }}  
            />
            {/* <SearchBarComponent/> */}

            <TouchableOpacity onPress={() => nav.navigate('SearchScreen')}> 
                <SearchBarComponent /> 
            </TouchableOpacity>

            <BannerComponent />
            <VideoCourseComponent />
            <BasicCourseComponent navigation={navigation} />
            <AdvancedCourseComponent navigation={navigation}/>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fcff',
        padding: 16,
    },
    searchContainer: { 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 10,
    },
});