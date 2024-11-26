import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const VideoCourseComponent = () => {
    const navigation = useNavigation();

    const handleVideoPress = (videoData) => {
        navigation.navigate('PlayVideo', {
            courseContent: {
                name: videoData.title,
                videoUrl: videoData.videoId,
                description: videoData.description
            }
        });
    };

    const videos = [
        {
            title: "Python Tutorial for Beginners",
            videoId: "_uQrJ0TkZlc",
            description: "Complete Python tutorial covering basics to advanced topics. This tutorial is designed for beginners who want to learn Python programming from scratch. It covers all the fundamental concepts and provides practical examples to help you understand the language better.",
            image: require('../../Assets/Images/video1.png')
        },
        {
            title: "React Native Tutorial",
            videoId: "SqcY0GlETPk",
            description: "Learn React Native development from scratch. This tutorial will guide you through the process of building mobile applications using React Native. It includes step-by-step instructions and covers essential topics such as components, state management, and navigation.",
            image: require('../../Assets/Images/video2.png')
        },
    ];

    return (
        <ScrollView style={styles.videoCourseContainer}>
            <Text style={styles.heading}>Video Courses</Text>
            <View style={styles.courseList}>
                {videos.map((video, index) => (
                    <TouchableOpacity 
                        key={index}
                        onPress={() => handleVideoPress(video)}
                        style={styles.videoContainer}
                    >
                        <Image 
                            source={video.image} 
                            style={styles.courseImage} 
                        />
                        <View style={styles.videoInfo}>
                            <Text style={styles.videoTitle}>{video.title}</Text>
                            <Text style={styles.videoDescription}>
                                {video.description.substring(0, 40)}...
                            </Text>
                        </View>
                        <Ionicons name="play-circle" size={30} color="#007aff" style={styles.playIcon} />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    videoCourseContainer: {
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 20,
    },
    courseList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    videoContainer: {
        width: '48%',
        marginBottom: 20,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
    },
    courseImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    videoInfo: {
        padding: 10,
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    videoDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    playIcon: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default VideoCourseComponent;
