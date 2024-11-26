import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const AdvancedCourseComponent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Advance Courses</Text>
            <View style={styles.courseList}>
                <TouchableOpacity 
                    style={styles.courseCard}
                    onPress={() => navigation.navigate('BasicReactNaviveCourseDetails')}
                >
                    <Image 
                        source={require('../../Assets/Images/advanced-course-1.png')} 
                        style={styles.courseImage}
                    />
                    <Text style={styles.courseTitle}>React Native</Text>
                    <Text style={styles.lessonCount}>15 Lessons</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.courseCard} 
                    onPress={() => navigation.navigate('MySQLCourseDetails')}
                >
                    <Image
                        source={require('../../Assets/Images/advanced-course-2.png')} 
                        style={styles.courseImage}
                    />
                    <Text style={styles.courseTitle}>MySQL</Text>
                    <Text style={styles.lessonCount}>15 Lessons</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: '700',
        color: '#000',
        marginBottom: 15,
    },
    courseList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    courseCard: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    lessonCount: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    }
});

export default AdvancedCourseComponent;