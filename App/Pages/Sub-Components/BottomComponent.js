import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const BottomNavigation = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.bottomNavigation}>
                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => navigation.goBack()}
                >
                    <Icon 
                        name="home" 
                        size={24} 
                        color="#4A90E2" 
                        style={styles.icon}
                    />
                    <Text style={styles.navItemText}>Trang chủ</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.searchButtonContainer}
                    onPress={() => navigation.navigate('SearchScreen')}
                >
                    <View style={styles.searchButton}>
                        <Icon 
                            name="search" 
                            size={28} 
                            color="#FFFFFF" 
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navItem}
                    onPress={() => navigation.navigate('ReviewScreen')}
                >
                    <Icon 
                        name="star" 
                        size={24} 
                        color="#4A90E2" 
                        style={styles.icon}
                    />
                    <Text style={styles.navItemText}>Đánh giá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    bottomNavigation: {
        width: width * 0.95,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        paddingVertical: 6,
        paddingHorizontal: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: 4 
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navItemText: {
        marginTop: 5,
        fontSize: 12,
        color: '#4A90E2',
        fontWeight: '500',
    },
    icon: {
        opacity: 0.8,
    },
    searchButtonContainer: {
        position: 'relative',
        top: -25,
    },
    searchButton: {
        backgroundColor: '#4A90E2',
        width: 65,
        height: 65,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { 
            width: 0, 
            height: 4 
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
    },
});

export default BottomNavigation;