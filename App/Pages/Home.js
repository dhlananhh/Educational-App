/* App/Pages/Home.js */
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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

    const handleSearchPress = () => {
        nav.navigate('SearchScreen');
    };

    return (
        <View style={styles.container}>
            <UserProfileComponent 
                name={name} 
                onLogoutPress={() => {
                    Services.Logout();
                    navigation.navigate('Login');
                }}  
            />
            <ScrollView 
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                {/* <SearchBarComponent onPress={handleSearchPress} /> */}

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
    searchContainer: {
        marginBottom: 16,
    },
    searchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        color: '#333',
        fontSize: 16,
    },
});

export default Home;