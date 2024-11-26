/* App/Pages/Home.js */
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import UserProfileComponent from './Sub-Components/UserProfileComponent';
import SearchBarComponent from './Sub-Components/SearchBarComponent';
import BannerComponent from './Sub-Components/BannerComponent';
import VideoCourseComponent from './Sub-Components/VideoCourseComponent';
import BasicCourseComponent from './Sub-Components/BasicCourseComponent';
import AdvancedCourseComponent from './Sub-Components/AdvancedCourseComponent';

const Home = ({ navigation, route }) => {
    const { name } = route.params;

    return (
        <ScrollView style={styles.container}>
            <UserProfileComponent name={name} />
            <SearchBarComponent />
            <BannerComponent />
            <VideoCourseComponent />
            <BasicCourseComponent navigation={navigation} />
            <AdvancedCourseComponent navigation={navigation} />
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
});
