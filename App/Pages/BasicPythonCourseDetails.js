import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CourseDetails = ({ route, navigation }) => {
    const course = route.params?.course;

    const courseTopics = course ? course.topics : [
        { id: '01', title: 'Introduction' },
        { id: '02', title: 'Variables' },
        { id: '03', title: 'Data Types' },
        { id: '04', title: 'Numbers' },
        { id: '05', title: 'Casting' },
    ];

    const title = course ? course.title : 'Python Basics';
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
                <Fontisto name="more-v-a" size={24} color="black" />
            </View>

            <ScrollView>
                <BannerSection />
                <AboutCourse />
                <CourseContent courseTopics={courseTopics} />
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
            Python is a general-purpose, high-level programming language. Its design philosophy emphasizes code readability with its notable use of significant whitespace.
        </Text>
    </View>
);

const CourseContent = ({ courseTopics }) => (
    <View style={courseStyles.container}>
        <Text style={courseStyles.sectionTitle}>Course Content</Text>
        {courseTopics.map((topic) => (
            <View key={topic.id} style={courseStyles.topicRow}>
                <Text style={courseStyles.topicNumber}>{topic.id}</Text>
                <Text style={courseStyles.topicTitle}>{topic.title}</Text>
                <AntDesign name="playcircleo" size={24} color="#1D92FF" style={courseStyles.icon} />
            </View>
        ))}
    </View>
);

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
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    topicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
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
        padding: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

const courseDetailsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default CourseDetails;
