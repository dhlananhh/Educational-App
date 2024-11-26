import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import YoutubePlayer from "react-native-youtube-iframe";

export default function PlayVideo() {
    const navigation = useNavigation();
    const param = useRoute().params;
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ padding: 20, paddingTop: 50 }}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()} 
                    style={{ marginBottom: 10 }}
                >
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 20 }}>
                    {param?.courseContent && (
                        <View>
                            <Text style={{
                                marginBottom: 15,
                                fontSize: 22,
                                fontWeight: 'bold',
                                color: '#333'
                            }}>
                                {param.courseContent.name}
                            </Text>

                            <View style={{
                                borderRadius: 10,
                                overflow: 'hidden',
                                marginBottom: 20
                            }}>
                                <YoutubePlayer
                                    height={220}
                                    play={playing}
                                    videoId={param.courseContent.videoUrl}
                                    onChangeState={onStateChange}
                                />
                            </View>

                            <View style={{
                                backgroundColor: '#f8f9fa',
                                padding: 15,
                                borderRadius: 10
                            }}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    marginBottom: 10,
                                    color: '#2c3e50'
                                }}>
                                    Description
                                </Text>
                                <Text style={{
                                    lineHeight: 24,
                                    color: '#444',
                                    fontSize: 15
                                }}>
                                    {param.courseContent.description}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
