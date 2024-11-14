import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
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
  let chapterRef;

  const getChapterData = (courseId) => {
    fetch('https://67126da56c5f5ced66237d06.mockapi.io/task')
      .then(response => response.json())
      .then(data => {
        if (!data || !data[0]) {
          console.error('Invalid data format received');
          return;
        }

        let chapterData;
        switch(courseId) {
          case 1:
            chapterData = data[0].introduction;
            break;
          case 2:
            chapterData = data[0].variables;
            break;
          case 3:
            chapterData = data[0].datatypes;
            break;
          case 4:
            chapterData = data[0].numbers;
            break;
          case 5:
            chapterData = data[0].casting;
            break;
          default:
            chapterData = [];
        }

        if (Array.isArray(chapterData)) {
          setChapter(chapterData);
          setProgress(0);
        } else {
          console.error('Invalid chapter data format');
          setChapter([]);
        }
      })
      .catch(error => {
        console.error('Error fetching chapter data:', error);
        setChapter([]);
      });
  };

  useEffect(() => {
    if (params?.courseId) {
      getChapterData(params.courseId);
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
      console.error('No courseId provided');
      return;
    }

    try {
      const completedCoursesStr = await AsyncStorage.getItem('completedCourses');
      let completedCourses = [];
      
      try {
        completedCourses = completedCoursesStr ? JSON.parse(completedCoursesStr) : [];
      } catch (parseError) {
        console.error('Error parsing completed courses:', parseError);
        completedCourses = [];
      }

      if (!Array.isArray(completedCourses)) {
        completedCourses = [];
      }

      if (!completedCourses.includes(params.courseId)) {
        completedCourses.push(params.courseId);
        await AsyncStorage.setItem('completedCourses', JSON.stringify(completedCourses));
      }
      navigation.navigate('BasicPythonCourseDetails');
    } catch (error) {
      console.error('Error saving course completion:', error);
      navigation.navigate('BasicPythonCourseDetails');
    }
  };

  if (chapter.length === 0) {
    return (
      <View style={{ padding: 20, paddingTop: 50, flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading chapter content...</Text>
      </View>
    );
  }

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
        renderItem={({ item, index }) => (
          <View
            style={{
              width: Dimensions.get('screen').width * 0.85,
              marginRight: 15,
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
              {item?.name || `Chapter ${index + 1}`}
            </Text>
            <Text>{item?.description || 'No description available'}</Text>
            {item?.input ? (
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
                  <Text style={{ textAlign: 'center', marginLeft: 5, color: Colors.white }}>Run</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {run ? (
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
            ) : null}
            {index + 1 !== chapter.length ? (
              <TouchableOpacity
                onPress={() => onClickNext(index)}
                style={{
                  backgroundColor: Colors.primary,
                  padding: 10,
                  borderRadius: 7,
                  position: 'absolute',
                  bottom: 0,
                  width: '110%',
                }}
              >
                <Text style={{ textAlign: 'center', color: Colors.white }}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onClickNext(index)}
                style={{
                  backgroundColor: Colors.green,
                  padding: 10,
                  borderRadius: 7,
                  position: 'absolute',
                  bottom: 0,
                  width: '110%',
                }}
              >
                <Text style={{ textAlign: 'center', color: Colors.white }}>Finish</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}