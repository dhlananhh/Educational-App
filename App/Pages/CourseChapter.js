import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressBar from '../Components/ProgressBar';
import Colors from '../Shared/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CourseChapter() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [chapter, setChapter] = useState([]);
  const [run, setRun] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let chapterRef;

  const getChapterData = async (courseId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://67126da56c5f5ced66237d06.mockapi.io/task');
      const data = await response.json();

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data format received');
      }

      const course = data.find(course => {
        if (courseId <= 5) {
          return course.name === "Python Programming";
        } else if (courseId <= 10) {
          return course.name === "React Development";
        } else if (courseId <= 15) {
          return course.name === "MySQL Development";
        } else {
          return course.name === "React Native Development";
        }
      });

      if (!course || !course.lessons) {
        throw new Error('Course not found or invalid course structure');
      }

      let chapterData;
      if (courseId <= 5) {
        // Python courses
        const pythonSections = {
          1: course.lessons.introduction,
          2: course.lessons.variables,
          3: course.lessons.datatypes,
          4: course.lessons.number,
          5: course.lessons.casting,
        };
        chapterData = pythonSections[courseId];
      } else if (courseId <= 10) {
        // React courses
        const reactSections = {
          6: course.lessons.introduction,
          7: course.lessons.props_and_state,
          8: course.lessons.lifecycle_methods,
          9: course.lessons.functional_components,
          10: course.lessons.class_components,
        };
        chapterData = reactSections[courseId];
      } else if (courseId <= 15) {
        // MySQL courses
        const mysqlSections = {
          11: course.lessons.introduction,
          12: course.lessons.data_types,
          13: course.lessons.tables,
          14: course.lessons.queries,
          15: course.lessons.optimization,
        };
        chapterData = mysqlSections[courseId];
      } else {
        // React Native courses
        const reactNativeSections = {
          16: course.lessons.getting_started,
          17: course.lessons.state_and_lifecycle,
          18: course.lessons.styling,
          19: course.lessons.navigation,
          20: course.lessons.networking,
        };
        chapterData = reactNativeSections[courseId];
      }

      if (!chapterData || !Array.isArray(chapterData)) {
        throw new Error(`No content available for course ID: ${courseId}`);
      }

      setChapter(chapterData);
      setProgress(0);
    } catch (error) {
      console.error('Error in getChapterData:', error);
      setError(error.message);
      setChapter([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.courseId) {
      getChapterData(params.courseId);
    } else {
      setError('No course ID provided');
      setLoading(false);
    }
  }, [params?.courseId]);

  const onClickNext = (index) => {
    setRun(false);
    if (chapter.length > 0) {
      setProgress((index + 1) / chapter.length);
      if (index + 1 < chapter.length) {
        try {
          chapterRef?.scrollToIndex({ animated: true, index: index + 1 });
        } catch (e) {
          console.error('Scroll error:', e);
        }
      } else {
        onFinish();
      }
    }
  };

  const onFinish = async () => {
    if (!params?.courseId) {
      setError('No course ID provided');
      return;
    }

    try {
      let storageKey;
      let nextScreen;

      if (params.courseId <= 5) {
        storageKey = 'completedPythonCourses';
        nextScreen = 'BasicPythonCourseDetails';
      } else if (params.courseId <= 10) {
        storageKey = 'completedReactCourses';
        nextScreen = 'BasicReactJSCourseDetails';
      } else if (params.courseId <= 15) {
        storageKey = 'completedMySQLCourses';
        nextScreen = 'MySQLCourseDetails';
      } else {
        storageKey = 'completedReactNativeCourses';
        nextScreen = 'BasicReactNaviveCourseDetails';
      }

      const completedCoursesStr = await AsyncStorage.getItem(storageKey);
      let completedCourses = [];

      try {
        completedCourses = completedCoursesStr ? JSON.parse(completedCoursesStr) : [];
      } catch (parseError) {
        console.error('Error parsing completed courses:', parseError);
        completedCourses = [];
      }

      if (!completedCourses.includes(params.courseId)) {
        completedCourses.push(params.courseId);
        await AsyncStorage.setItem(storageKey, JSON.stringify(completedCourses));
      }

      navigation.navigate(nextScreen);
    } catch (error) {
      console.error('Error saving course completion:', error);
      setError('Failed to save course progress');
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={{ padding: 20, paddingTop: 50, flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          <TouchableOpacity
            onPress={() => params?.courseId && getChapterData(params.courseId)}
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 7,
            }}
          >
            <Text style={{ color: Colors.white }}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Empty state
  if (chapter.length === 0) {
    return (
      <View style={{ padding: 20, paddingTop: 50, flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No content available for this chapter</Text>
      </View>
    );
  }

  // Main content
  const renderChapterContent = ({ item, index }) => {
    return (
      <ScrollView
        style={{
          width: Dimensions.get('screen').width * 0.85,
          marginRight: 15,
        }}
        contentContainerStyle={{
          padding: 10,
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false} 
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
            {item?.name || `Chapter ${index + 1}`}
          </Text>
          <Text>{item?.description || 'No description available'}</Text>

          {item?.input && (
            <View>
              <View
                style={{
                  backgroundColor: Colors.black,
                  padding: 20,
                  borderRadius: 10,
                  marginVertical: 10
                }}
              >
                <Text style={{ color: Colors.white }}>{item.input}</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  width: 60,
                  padding: 5,
                  borderRadius: 5,
                  marginTop: 20,
                  display: 'flex',
                  flexDirection: 'row',
                }}
                onPress={() => setRun(true)}
              >
                <Ionicons name="play-circle" size={20} color={Colors.white} />
                <Text style={{ textAlign: 'center', marginLeft: 5, color: Colors.white }}>
                  Run
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {run && (
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>Output</Text>
              <View
                style={{
                  backgroundColor: Colors.black,
                  padding: 20,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: Colors.white }}>{item?.output || 'No output'}</Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ height: 60 }} />

        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 10,
          backgroundColor: 'white',
        }}>
          <TouchableOpacity
            onPress={() => onClickNext(index)}
            style={{
              backgroundColor: index + 1 !== chapter.length ? Colors.primary : Colors.green,
              padding: 10,
              borderRadius: 7,
              width: '100%',
            }}
          >
            <Text style={{ textAlign: 'center', color: Colors.white }}>
              {index + 1 !== chapter.length ? 'Next' : 'Finish'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={{ padding: 20, paddingTop: 50, flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <ProgressBar progress={progress} />
      <FlatList
        data={chapter}
        horizontal={true}
        pagingEnabled
        ref={(ref) => {
          chapterRef = ref;
        }}
        renderItem={renderChapterContent}
        showsHorizontalScrollIndicator={false}

      />
    </View>
  );
}