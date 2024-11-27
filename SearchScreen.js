import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList, // Use FlatList for efficient rendering of lists
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';


const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        // Perform search logic here (e.g., filter courses based on searchText)
        console.log('Searching for:', searchText);
    };

    // Sample course data (replace with your actual data)
    const courseData = [
        {
            id: '1',
            image: require('../Assets/Images/web_design.jpg'),
            title: 'Website Design',
            author: 'Ramono Wultschner',
            price: '$590',
            rating: 4.5,
            reviews: '(1233)',
            lessons: '9 lessons',
            bestseller: true,
        },
        {
            id: '2',
            image: require('../Assets/Images/ux_research.jpg'),
            title: 'UX Research For Beginners',
            author: 'Olivia Wang',
            price: '$290',
            rating: 4.5,
            reviews: '(1782)',
            lessons: '12 lessons',
            discount: '20% Off',
        },
        // ... more course data
    ];

    const categoryData = [
        { icon: <FontAwesome name="line-chart" size={20} color="teal" />, name: 'Business' },
        { icon: <MaterialCommunityIcons name="pencil-outline" size={20} color="teal" />, name: 'Design' },
        { icon: <MaterialIcons name="code" size={20} color="teal" />, name: 'Code' },
        { icon: <MaterialIcons name="movie" size={20} color="teal" />, name: 'Movie' },
        { icon: <Ionicons name="language-outline" size={20} color="teal" />, name: 'Language' },
    ];

    const renderCourseItem = ({ item }) => (
        <View style={styles.courseItem}>
            {item.bestseller && <Text style={styles.bestsellerTag}>Best-seller</Text>}
            {item.discount && <Text style={styles.discountTag}>{item.discount}</Text>}
            <Image source={item.image} style={styles.courseImage} />
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseAuthor}>{item.author}</Text>
            <View style={styles.courseInfo}>
                <Text style={styles.coursePrice}>{item.price}</Text>
                <View style={styles.courseRating}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.courseRatingText}>{item.rating} {item.reviews}</Text>
                </View>
                <Text style={styles.courseLessons}>• {item.lessons}</Text>
            </View>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="teal" />
        </View>

    );


    const renderCategoryItem = ({ item }) => (
        <View style={styles.categoryItem}>
            {item.icon}
            <Text style={styles.categoryName}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
        </View>
    );



    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.time}>9:41</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="cellular" size={24} color="black" />
                    <Ionicons name="wifi" size={24} color="black" />
                    <Ionicons name="battery-full" size={24} color="black" />
                </View>
            </View>


            <ScrollView>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search course"
                        value={searchText}
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                    />

                    <TouchableOpacity style={styles.filterButton} onPress={() => { /* Handle filter logic */ }}>
                        <Text style={styles.filterButtonText}>Filter</Text>
                        <Ionicons name="filter" size={18} color="white" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </View>

                <View style={styles.hotTopicsContainer}>
                    <Text style={styles.hotTopicsTitle}>Hot topics</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>Java</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>SQL</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>Javascript</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>Python</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>Digital marketing</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>Photoshop</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.topicButton}><Text style={styles.topicButtonText}>Watercolor</Text></TouchableOpacity>

                    </ScrollView>
                </View>

                <View style={styles.categoriesContainer}>
                    <View style={styles.categoriesHeader}>
                        <Text style={styles.categoriesTitle}>Categories</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreText}>View more</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={categoryData}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item.name}
                        ItemSeparatorComponent={() => <View style={styles.categorySeparator} />}
                    />

                </View>



                <View style={styles.recommendedContainer}>
                    <View style={styles.recommendedHeader}>
                        <Text style={styles.recommendedTitle}>Recommended for you</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreText}>View more</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={courseData}
                        renderItem={renderCourseItem}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />


                </View>
            </ScrollView>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30, // Status bar/notch adjustment
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    time: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    headerIcons: {
        flexDirection: 'row',

    },


    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    filterButton: {
        backgroundColor: 'teal',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },


    hotTopicsContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,

    },
    hotTopicsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,

    },
    topicButton: {
        backgroundColor: '#eee',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 10,

    },
    topicButtonText: {
        color: 'teal',
        fontWeight: '500'
    },



    categoriesContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    categoriesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    viewMoreText: {
        color: 'teal',
        fontWeight: '500'

    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,

    },

    categoryName: {
        flex: 1, // Use flex 1 for category names
        marginLeft: 10,
        fontSize: 16,
    },
    categorySeparator: {
        height: 1,
        backgroundColor: '#eee',
    },


    recommendedContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    recommendedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    recommendedTitle: {
        fontSize: 20,
        fontWeight: 'bold',

    },



    courseItem: {
        width: 250,  // Adjust width as needed
        marginRight: 15,
        marginBottom: 10, // Add marginBottom for better layout
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        padding: 10,
    },

    bestsellerTag: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'purple',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        zIndex: 1,  // Ensure it's on top
    },
    discountTag: {
        position: 'absolute',
        top: 10,
        right: 10,  // Positioned on the right
        backgroundColor: 'teal',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        zIndex: 1, // Ensure it's on top

    },
    courseImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    courseAuthor: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    courseInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    coursePrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'teal',
    },
    courseRating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    courseRatingText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 3,
    },
    courseLessons: {
        fontSize: 12,
        color: '#888',
    },
});

export default SearchScreen;