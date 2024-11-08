import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserProfileComponent = ({ name }) => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <Image
                source={require('../../Assets/Images/MaleUser.png')}
                style={styles.profileImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#f6f8fcff',
    },
    greeting: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000ff',
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000ff',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
});

export default UserProfileComponent;
