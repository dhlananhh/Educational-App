import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    SafeAreaView, 
    StyleSheet,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const coursesData = [
    { 
        id: '1',
        title: 'Complete React Native Course', 
        instructor: 'John Doe', 
        rating: 4.5, 
        students: 1200,
        price: 29.99,
        category: 'Programming',
        description: 'Master mobile app development with React Native from scratch.',
        image: require('../Assets/Images/Complete React Native Course.png') 
    },
    { 
        id: '2',
        title: 'Advanced Mobile Development', 
        instructor: 'Jane Smith', 
        rating: 4.8, 
        students: 950,
        price: 39.99,
        category: 'Programming',
        description: 'Deep dive into advanced mobile development techniques.',
        image: require('../Assets/Images/Advanced Mobile Development.png')
    },
    { 
        id: '3',
        title: 'Flutter & Dart Masterclass', 
        instructor: 'Mike Johnson', 
        rating: 4.6, 
        students: 800,
        price: 34.99,
        category: 'Programming',
        description: 'Comprehensive Flutter and Dart programming course.',
        image: require('../Assets/Images/Flutter & Dart Masterclass.png')
    },
    { 
        id: '4',
        title: 'UX Design Fundamentals', 
        instructor: 'Sarah Lee', 
        rating: 4.7, 
        students: 1500,
        price: 44.99,
        category: 'Design',
        description: 'Learn user experience design principles and techniques.',
        image: require('../Assets/Images/UX Design Fundamentals.png')
    },
    { 
        id: '5',
        title: 'Machine Learning Bootcamp', 
        instructor: 'Alex Chen', 
        rating: 4.9, 
        students: 1100,
        price: 59.99,
        category: 'Data Science',
        description: 'Comprehensive machine learning and AI course for beginners.',
        image: require('../Assets/Images/Machine Learning Bootcamp.png')
    },
    { 
        id: '6',
        title: 'Digital Marketing Strategies', 
        instructor: 'Emma Wilson', 
        rating: 4.4, 
        students: 1300,
        price: 49.99,
        category: 'Marketing',
        description: 'Advanced digital marketing techniques and strategies.',
        image: require('../Assets/Images/Digital Marketing Strategies.png')
    },
    {
        id: '7',
        title: 'Entrepreneurship Bootcamp',
        instructor: 'Mark Cuban',
        rating: 4.7,
        students: 1800,
        price: 49.99,
        category: 'Business',
        description: 'Learn to start and scale your business with actionable strategies.',
        image: require('../Assets/Images/Entrepreneurship Bootcamp.png')
    },
    {
        id: '8',
        title: 'Finance for Non-Finance Professionals',
        instructor: 'Robert Kiyosaki',
        rating: 4.5,
        students: 1400,
        price: 39.99,
        category: 'Business',
        description: 'Understand financial concepts and how to apply them to business.',
        image: require('../Assets/Images/Entrepreneurship Bootcamp.png')
    },
    {
        id: '9',
        title: 'Digital Photography Masterclass',
        instructor: 'Annie Leibovitz',
        rating: 4.8,
        students: 1600,
        price: 44.99,
        category: 'Photography',
        description: 'Master the art of digital photography with practical tips.',
        image: require('../Assets/Images/Digital Photography Masterclass.png')
    },
    {
        id: '10',
        title: 'Portrait Photography Workshop',
        instructor: 'Steve McCurry',
        rating: 4.6,
        students: 1000,
        price: 29.99,
        category: 'Photography',
        description: 'Learn techniques to capture stunning portrait photographs.',
        image: require('../Assets/Images/Digital Photography Masterclass.png')
    },
];

const SearchScreen = ({ navigation }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(coursesData);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [hotTopics] = useState([
        'React Native', 
        'AI & Machine Learning', 
        'Web Development', 
        'Blockchain', 
        'UX Design', 
        'Cloud Computing'
    ]);

    const [categories] = useState([
        { name: 'Programming', icon: 'code-outline', color: '#2196F3' },
        { name: 'Design', icon: 'brush-outline', color: '#4CAF50' },
        { name: 'Data Science', icon: 'analytics-outline', color: '#FF9800' },
        { name: 'Business', icon: 'briefcase-outline', color: '#9C27B0' },
        { name: 'Marketing', icon: 'megaphone-outline', color: '#FF5722' },
        { name: 'Photography', icon: 'camera-outline', color: '#795548' }
    ]);

    const handleSearch = () => {
        const filteredCourses = coursesData.filter(course => 
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        const categoryFilteredCourses = selectedCategory
            ? filteredCourses.filter(course => course.category === selectedCategory)
            : filteredCourses;

        setSearchResults(categoryFilteredCourses);
    };

    const handleCategoryFilter = (categoryName) => {
        setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
        handleSearch();
    };

    useEffect(() => {
        handleSearch();
    }, [searchTerm, selectedCategory]);

    const renderRecommendedCourseItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.recommendedCourseItem}
            onPress={() => navigation.navigate('CourseDetail', { courseId: item.id })}
        >
            <Image 
                source={item.image} 
                style={styles.courseImage} 
                resizeMode="cover" 
            />
            <View style={styles.courseDetailsContainer}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                    {item.title}
                </Text>
                <Text style={styles.courseInstructor}>
                    {item.instructor} | {item.category}
                </Text>
                <View style={styles.courseMetrics}>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.studentsText}>
                        {item.students} students
                    </Text>
                    <Text style={styles.priceText}>
                        ${item.price}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.searchContainer}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()} 
                        style={styles.backButton}
                    >
                        <Ionicons name='arrow-back' size={24} color='#333' />
                    </TouchableOpacity>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for courses"
                            placeholderTextColor="gray"
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                            onSubmitEditing={handleSearch}
                        />
                        <TouchableOpacity 
                            style={styles.searchIcon} 
                            onPress={handleSearch}
                        >
                            <Ionicons name="search" size={20} color="#2092FF" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="filter" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Hot Topics</Text>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                    >
                        {hotTopics.map((topic, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.topicChip}
                            >
                                <Text style={styles.topicText}>{topic}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewMoreText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {categories.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.categoryItem}
                                onPress={() => handleCategoryFilter(item.name)}
                            >
                                <View 
                                    style={[
                                        styles.categoryIconContainer, 
                                        selectedCategory === item.name 
                                            ? { backgroundColor: item.color } 
                                            : { backgroundColor: item.color + '20' }
                                    ]}
                                >
                                    <Ionicons 
                                        name={item.icon} 
                                        size={24} 
                                        color={selectedCategory === item.name ? 'white' : item.color} 
                                    />
                                </View>
                                <Text style={styles.categoryText}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <FlatList
                data={searchResults}
                renderItem={renderRecommendedCourseItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.recommendedListContainer}
                ListEmptyComponent={
                    <View style={{ alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ fontSize: 18, color: '#666' }}>
                            No courses found
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    searchContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 15
    },
    backButton: {
        marginRight: 10
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        paddingHorizontal: 15
    },
    searchInput: {
        flex: 1,
        height: 50,
        fontSize: 16
    },
    searchIcon: {
        marginLeft: 10
    },
    filterButton: {
        backgroundColor: '#2092FF', 
        padding: 12, 
        borderRadius: 12,
        marginLeft: 10
    },
    sectionContainer: {
        paddingHorizontal: 15,
        marginTop: 15
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    viewMoreText: {
        color: '#2092FF',
        fontWeight: '600'
    },
    topicChip: {
        backgroundColor: '#F0F0F0', 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20, 
        marginRight: 10
    },
    topicText: {
        color: '#333'
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 15
    },
    categoryIconContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 5
    },
    categoryText: {
        fontSize: 14,
        color: '#333'
    },
    recommendedCourseItem: {
        flexDirection: 'row',
        backgroundColor: '#F9F9F9',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3
    },
    courseImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 15
    },
    courseDetailsContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5
    },
    courseInstructor: {
        color: '#666',
        marginBottom: 5
    },
    courseMetrics: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        marginLeft: 5,
        color: '#333'
    },
    studentsText: {
        color: '#666'
    },
    priceText: {
        fontWeight: 'bold',
        color: '#2092FF'
    }
});

export default SearchScreen;