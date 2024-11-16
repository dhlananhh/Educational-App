import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReactCourseDetails = ({ route, navigation }) => {
    const [completedCourses, setCompletedCourses] = useState([]);
    const [progress, setProgress] = useState(0);
    const course = route.params?.course;

    const courseTopics = [
        { id: '01', title: 'Introduction to Components', courseId: 6 },
        { id: '02', title: 'Props and State', courseId: 7 },
        { id: '03', title: 'Lifecycle Methods', courseId: 8 },
        { id: '04', title: 'Functional Components', courseId: 9 },
        { id: '05', title: 'Class Components', courseId: 10 },
    ];

    useEffect(() => {
        const checkCompletedCourses = async () => {
            try {
                const completedCoursesStr = await AsyncStorage.getItem('completedReactCourses');
                if (completedCoursesStr) {
                    const completed = JSON.parse(completedCoursesStr);
                    setCompletedCourses(completed);
                    setProgress(completed.length / courseTopics.length);
                }
            } catch (error) {
                console.error('Error checking completed courses:', error);
            }
        };

        const unsubscribe = navigation.addListener('focus', checkCompletedCourses);
        checkCompletedCourses();

        return unsubscribe;
    }, [navigation]);

    const clearAllCompletions = async () => {
        try {
            await AsyncStorage.removeItem('completedReactCourses');
            setCompletedCourses([]);
            setProgress(0);
        } catch (error) {
            console.error('Error clearing completions:', error);
        }
    };

    const title = course ? course.title : 'React Development';
    const subtitle = course ? course.subtitle : 'By Tubeguruji';

    return (
        <SafeAreaView style={courseDetailsStyles.container}>
            <View style={headerStyles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={headerStyles.infoContainer}>
                    <Text style={headerStyles.title}>{title}</Text>
                    <Text style={headerStyles.subtitle}>{subtitle}</Text>
                </View>
                <TouchableOpacity onPress={clearAllCompletions}>
                    <Fontisto name="more-v-a" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <BannerSection />
                <AboutCourse />
                <CourseContent 
                    courseTopics={courseTopics} 
                    completedCourses={completedCourses}
                    navigation={navigation}
                />
                <ProgressSection 
                    completedCount={completedCourses.length}
                    totalCount={courseTopics.length}
                    progress={progress}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const BannerSection = () => (
    <View style={imageStyles.container}>
        <Image
            source={require('../Assets/Images/banner-CourseDetails.png')}
            style={imageStyles.image}
        />
    </View>
);

const AboutCourse = () => (
    <View style={aboutStyles.container}>
        <Text style={aboutStyles.title}>About Course</Text>
        <Text style={aboutStyles.description}>
            React is a powerful JavaScript library for building user interfaces, maintained by Facebook and a community of developers. Learn components, state management, and modern React development practices.
        </Text>
    </View>
);

const CourseContent = ({ courseTopics, completedCourses, navigation }) => (
    <View style={courseStyles.container}>
        <Text style={courseStyles.sectionTitle}>Course Content</Text>
        {courseTopics.map((topic) => (
            <TouchableOpacity
                key={topic.id}
                style={courseStyles.topicRow}
                onPress={() => navigation.navigate('CourseChapter', { 
                    courseId: topic.courseId,
                    courseType: 'react'
                })}
            >
                <Text style={courseStyles.topicNumber}>{topic.id}</Text>
                <Text style={courseStyles.topicTitle}>{topic.title}</Text>
                {completedCourses.includes(topic.courseId) ? (
                    <Ionicons name="checkmark-circle" size={24} color="#00c853" />
                ) : (
                    <AntDesign name="playcircleo" size={24} color="#1D92FF" style={courseStyles.icon} />
                )}
            </TouchableOpacity>
        ))}
    </View>
);

const ProgressSection = ({ completedCount, totalCount, progress }) => (
    <View style={progressStyles.container}>
        <Text style={progressStyles.title}>
            Progress: {completedCount} / {totalCount} chapters
        </Text>
        <View style={progressStyles.progressBar}>
            <View 
                style={[
                    progressStyles.progressFill,
                    { width: `${progress * 100}%` }
                ]} 
            />
        </View>
    </View>
);

const progressStyles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        marginTop: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e9ecef',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#28a745',
        borderRadius: 4,
    },
});

const headerStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
    },
});

const courseStyles = StyleSheet.create({
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    topicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    topicNumber: {
        fontSize: 25,
        color: '#0000004a',
        fontWeight: '700',
    },
    topicTitle: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        width: 24,
        height: 24,
    },
});

const imageStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f0f3fa',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: 332,
        height: 165,
        resizeMode: 'contain',
    },
});

const aboutStyles = StyleSheet.create({
    container: {
        padding: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#555',
    },
});

const courseDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default ReactCourseDetails;