import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const VideoCourseComponent = () => {
    return (
        <View style={styles.videoCourseContainer}>
            <Text style={styles.heading}>Video Course</Text>
            <View style={styles.courseList}>
                <Image source={require('../../Assets/Images/video1.png')} style={styles.courseImage} />
                <Image source={require('../../Assets/Images/video2.png')} style={styles.courseImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    videoCourseContainer: {
        marginVertical: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
    },
    courseList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    courseImage: {
        width: '48%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 8,
    },
});

export default VideoCourseComponent;
