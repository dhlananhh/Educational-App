import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Rating } from 'react-native-ratings';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BottomNcomponent from './Sub-Components/BottomComponent';
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
};

const reviews = [
    {
        id: 1,
        userName: 'Jinny Oslin',
        userProfilePic: 'https://randomuser.me/api/portraits/women/73.jpg',
        rating: 5,
        createdAt: '2024-05-01',
        text: 'The Python Programming course was fantastic! The instructor was knowledgeable and the content was very well structured.'
    },
    {
        id: 2,
        userName: 'Jane Barry',
        userProfilePic: 'https://randomuser.me/api/portraits/women/81.jpg',
        rating: 4,
        createdAt: '2024-05-02',
        text: 'I enjoyed the React Development course. The projects were challenging but rewarding. Could use more real-world examples.'
    },
    {
        id: 3,
        userName: 'Claire Mignard',
        userProfilePic: 'https://randomuser.me/api/portraits/women/6.jpg',
        rating: 5,
        createdAt: '2024-05-05',
        text: 'MySQL Development was a great course! I learned a lot about database management and optimization. Highly recommend!'
    },
    {
        id: 4,
        userName: 'Michael Johnson',
        userProfilePic: 'https://randomuser.me/api/portraits/men/23.jpg',
        rating: 4,
        createdAt: '2024-05-07',
        text: 'React Native Development was good. The course covered a lot of ground, but some sections could be more detailed.'
    },
    {
        id: 5,
        userName: 'Emily Davis',
        userProfilePic: 'https://randomuser.me/api/portraits/women/41.jpg',
        rating: 5,
        createdAt: '2024-05-10',
        text: 'Python Programming course exceeded my expectations! The hands-on exercises were very helpful.'
    },
    {
        id: 6,
        userName: 'John Smith',
        userProfilePic: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 3,
        createdAt: '2024-05-12',
        text: 'React Development was okay. The content was good, but the pace was a bit too fast for beginners.'
    },
    {
        id: 7,
        userName: 'Sarah Brown',
        userProfilePic: 'https://randomuser.me/api/portraits/women/50.jpg',
        rating: 5,
        createdAt: '2024-05-15',
        text: 'Loved the MySQL Development course! The instructor made complex topics easy to understand.'
    },
    {
        id: 8,
        userName: 'David Wilson',
        userProfilePic: 'https://randomuser.me/api/portraits/men/30.jpg',
        rating: 4,
        createdAt: '2024-05-18',
        text: 'React Native Development was very informative. The projects were practical and useful.'
    },
    {
        id: 9,
        userName: 'Laura Lee',
        userProfilePic: 'https://randomuser.me/api/portraits/women/60.jpg',
        rating: 2,
        createdAt: '2024-05-20',
        text: 'Python Programming course was not what I expected. The content was too basic for my level.'
    },
    {
        id: 10,
        userName: 'Chris Evans',
        userProfilePic: 'https://randomuser.me/api/portraits/men/35.jpg',
        rating: 5,
        createdAt: '2024-05-22',
        text: 'Exceptional React Development course! The best online course I have taken so far. Highly recommend!'
    }
];

const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
};

const ReviewCard = ({ review }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.header}>
                <Image source={{ uri: review.userProfilePic }} style={styles.profilePic} />
                <View style={styles.nameAndRating}>
                    <Text style={styles.name}>{review.userName}</Text>
                    <Rating
                        readonly
                        startingValue={review.rating}
                        imageSize={18}
                        style={styles.rating}
                    />
                </View>
                <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
            </View>
            <Text style={styles.review}>{review.text}</Text>
        </View>
    );
};

const AverageRatingBadge = ({ averageRating, totalReviews }) => {
    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.averageRatingBadge}
        >
            <View style={styles.ratingContainer}>
                <Text style={styles.averageRatingText}>{averageRating}</Text>
                <Text style={styles.maxRatingText}>/5</Text>
            </View>
            <Text style={styles.totalReviewsText}>
                {totalReviews} reviews
            </Text>
        </LinearGradient>
    );
};

const FilterButton = ({ rating, active, onPress }) => {
    const renderStars = () => {
        return Array.from({ length: rating }, (_, index) => (
            <Ionicons
                key={index}
                name="star"
                size={14}
                color={active ? '#FFD700' : '#CCCCCC'}
            />
        ));
    };

    return (
        <TouchableOpacity
            style={[
                styles.filterButton,
                active && styles.activeFilterButton
            ]}
            onPress={onPress}
        >
            <View style={styles.starContainer}>
                {renderStars()}
            </View>
            {rating === 0 && <Text style={styles.filterButtonText}>All</Text>}
        </TouchableOpacity>
    );
};

const ReviewSection = () => {
    const [filterRating, setFilterRating] = useState(0);
    const averageRating = calculateAverageRating(reviews);
    const filteredReviews = filterRating 
        ? reviews.filter((review) => review.rating === filterRating) 
        : reviews;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <AverageRatingBadge 
                        averageRating={averageRating} 
                        totalReviews={reviews.length} 
                    />
                    <View style={styles.filterContainer}>
                        <View style={styles.filterRow}>
                            {[0, 5, 4].map((rating) => (
                                <FilterButton 
                                    key={rating} 
                                    rating={rating} 
                                    active={filterRating === rating} 
                                    onPress={() => setFilterRating(rating)} 
                                />
                            ))}
                        </View>
                        <View style={styles.filterRow}>
                            {[3, 2, 1].map((rating) => (
                                <FilterButton 
                                    key={rating} 
                                    rating={rating} 
                                    active={filterRating === rating} 
                                    onPress={() => setFilterRating(rating)} 
                                />
                            ))}
                        </View>
                    </View>
                </View>
                <FlatList 
                    data={filteredReviews} 
                    keyExtractor={(item) => item.id.toString()} 
                    renderItem={({ item }) => <ReviewCard review={item} />} 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent} 
                />
            </View>
            <View style={styles.bottomComponentContainer}>
                <BottomNcomponent />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f8fc',
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12
    },
    nameAndRating: {
        flex: 1
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    rating: {
        alignSelf: 'flex-start'
    },
    date: {
        color: '#666',
        fontSize: 12
    },
    review: {
        fontSize: 14,
        lineHeight: 20
    },

    averageRatingBadge: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 16,
        width: 120,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    averageRatingText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginRight: 4,
    },
    maxRatingText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
    },
    totalReviewsText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        marginVertical: 4,
    },
    activeFilterButton: {
        backgroundColor: '#007AFF',
    },
    starContainer: {
        flexDirection: 'row',
        marginRight: 6,
    },
    filterButtonText: {
        color: '#333',
        fontSize: 12,
    },

    listContent: {
        paddingBottom: 100,
    },
    bottomComponentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        elevation: 10, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default ReviewSection;
