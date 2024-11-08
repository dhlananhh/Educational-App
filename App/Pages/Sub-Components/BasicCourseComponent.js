import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BasicPythonCourseDetails from '../BasicPythonCourseDetails';
import BasicReactJSCourseDetails from '../BasicReactJSCourseDetails';

const BasicCourseComponent = ({ navigation }) => {
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Basic Popular Course</Text>
            <View style={styles.courseList}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('BasicPythonCourseDetails')}
                    style={styles.courseCard}
                >
                    <Image
                        source={require('../../Assets/Images/basic-course-1.png')}
                        style={styles.courseImage}
                    />
                    <Text style={styles.courseTitle}>Basic Python</Text>
                    <Text style={styles.lessonCount}>15 Lessons</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('BasicReactJSCourseDetails')}
                    style={styles.courseCard} 
                >
                    <Image
                        source={require('../../Assets/Images/basic-course-2.png')}
                        style={styles.courseImage}
                    />
                    <Text style={styles.courseTitle}>Basic React Js</Text>
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
    courseItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
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
        fontWeight: 'bold',
        color: '#000',
    },
    lessonCount: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    }
});

export default BasicCourseComponent;
