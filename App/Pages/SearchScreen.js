import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SearchScreen = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const hotTopics = ['Java', 'SQL', 'Javascript', 'Python', 'Photoshop'];
    // const categories = [
    //     { icon: 'ios-business', name: 'Business' },
    //     { icon: 'ios-pencil', name: 'Design' },
    //     { icon: 'ios-code-slash', name: 'Code' },
    //     { icon: 'ios-videocam', name: 'Movie' },
    //     { icon: 'ios-chatbubbles', name: 'Language' },
    // ];

    // const categories = [
    //     { icon: 'business', name: 'Business' }, // MaterialIcons name for Business icon
    //     { icon: 'edit', name: 'Design' },          // MaterialIcons name for pencil/edit icon
    //     { icon: 'code', name: 'Code' },          // MaterialIcons name for Code icon
    //     { icon: 'movie', name: 'Movie' },        // MaterialIcons name for Movie/Videocam icon
    //     { icon: 'language', name: 'Language' }, // MaterialIcons name for language
    // ];

    const categories = [
        { icon: 'briefcase', name: 'Business' },        // Fixed
        { icon: 'create-outline', name: 'Design' },      // Fixed
        { icon: 'code-slash', name: 'Code' },      // Fixed
        { icon: 'videocam', name: 'Movie' },              // Fixed
        { icon: 'chatbubble-ellipses-outline', name: 'Language' },  // Fixed
    ];

    const recommendedCourses = [
        {
            name: 'Website Design',
            author: 'Ramona Wulstchner',
            price: '$590',
            rating: 4.5,
            reviews: '(1233)',
            lessons: '9 lessons',
            // image: require('../Assets/Images/basic-course-1.png')
        },
        {
            // image: require('../Assets/Images/basic-course-2.png'),
            name: 'UX Research For Beginners',
            author: 'Olivia Wang',
            price: '$290',
            rating: 4.5,
            reviews: '(1782)',
            lessons: '12 lessons',
            discount: "20% Off"
        },
    ];

    const handleSearch = () => {
        // In a real app, this would make an API call
        // For now, let's simulate search results:
        setSearchResults(recommendedCourses)
    };


    const renderRecommendedCourseItem = ({ item }) => (
        <TouchableOpacity style={styles.recommendedCourseItem}>
            <View style={{ width: '65%' }}>
                <Text style={styles.recommendedCourseTitle}>{item.name}</Text>
                <Text style={styles.recommendedCourseAuthor}>{item.author}</Text>
                <View style={styles.courseDetails}>
                    <Text style={styles.recommendedCoursePrice}>{item.price}</Text>
                    <Text style={styles.recommendedCourseRating}>
                        <Ionicons name='ios-star' size={10} color='gold' />
                        {item.rating}  {item.reviews}
                    </Text>
                </View>
            </View>
            {item.discount && <Text style={{ color: 'red' }}>{item.discount}</Text>}
            <Image
                source={item.image}
                style={{
                    width: 70
                    , height: 50, borderRadius: 10
                }}
            />
        </TouchableOpacity>
    );


    return (
        <ScrollView style={{ padding: 10, backgroundColor: '#fff', flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                    <Ionicons name='arrow-back' size={20} color='black' />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search course"
                    placeholderTextColor="gray"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch} // Call handleSearch on Enter 
                />
                <TouchableOpacity style={styles.filterButton}>
                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.hotTopicsContainer}>
                <Text style={styles.sectionTitle}>Hot topics</Text>
                <View style={styles.hotTopicsList}>
                    {hotTopics.map((topic, index) => (
                        <TouchableOpacity key={index} style={styles.hotTopicItem}>
                            <Text style={styles.hotTopicText}>{topic}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.categoriesContainer}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <View>
                    <TouchableOpacity onPress={() => alert("Show All categories")}>
                        <Text style={{ textAlign: 'right' }}>View more</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => (
                            <View key={item.name} style={styles.categoryItem}>
                                <Ionicons name={item.icon} size={25} color='#2092FF' style={styles.categoryIcon} />
                                <Text style={styles.categoryName}>{item.name}</Text>
                                {/* <Ionicons name='ios-arrow-forward' size={20} color='#bbb' style={styles.categoryArrow} /> */}
                            </View>
                        )}
                    />
                </View>
            </View>
            {searchResults.length > 0 && ( // Show search results if available 
                <View>
                    <View style={styles.recommendedCoursesContainer}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between', marginBottom: 20
                        }}>
                            <Text style={styles.sectionTitle}>Recommended for you</Text>
                            <TouchableOpacity onPress={() => alert("View all recommended courses")}>
                                <Text style={{ textAlign: 'right' }}>View more</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            data={searchResults}
                            keyExtractor={(item, index) => index.toString()} // ensure key prop is specified 
                            renderItem={renderRecommendedCourseItem}
                        />
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 10,
        borderRadius: 10,
        flex: 1
    },
    filterButton: {
        marginLeft: 10,
        padding: 12,
        backgroundColor: '#2192FF', 
        borderRadius: 10,
        shadowColor: '#ccc', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 2
    },
    filterButtonText: {
        color: '#fff'
    },
    sectionTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 15
    },
    hotTopicsContainer: {
        marginBottom: 20
    },
    hotTopicsList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    hotTopicItem: {
        marginRight: 10,
        marginBottom: 10,
        padding: 8, 
        backgroundColor: '#eee', 
        borderRadius: 15
    },
    hotTopicText: {
        fontSize: 16
    },
    categoriesContainer: {
        marginBottom: 20
    },
    categoryItem: {
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1, 
        borderBottomColor: '#eee',
        // height:40
    },
    categoryIcon: {
        marginRight: 15
    },
    categoryName: {
        flex: 1,
        fontSize: 17
    },
    categoryArrow: {
        marginLeft: 10,
    },
    recommendedCoursesContainer: {
    },
    recommendedCourseItem: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: 20, 
        borderRadius: 15, 
        borderWidth: 1,
        padding: 15, 
        borderColor: '#ccc', 
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 }, 
        shadowOpacity: 0.2, 
        shadowRadius: 2
    },
    recommendedCourseTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        width: '80%'
    },
    recommendedCourseAuthor: {
        color: '#aaa'
    },
    recommendedCoursePrice: {
        fontWeight: 'bold'
    },
    courseDetails: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    recommendedCourseRating: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
});


export default SearchScreen;