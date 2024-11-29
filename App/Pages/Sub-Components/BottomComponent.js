import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavigation = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.bottomNavigation}>
            <TouchableOpacity 
                style={styles.navItem} 
                onPress={() => navigation.goBack()}
            >
                <Icon name="home" size={24} color="#333" />
                <Text style={styles.navItemText}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.navItem} 
                onPress={() => navigation.navigate('ReviewScreen')}
            >
                <Icon name="star" size={24} color="#333" />
                <Text style={styles.navItemText}>Review</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navItemText: {
        marginTop: 5,
        fontSize: 12,
        color: '#333',
    },
});

export default BottomNavigation;