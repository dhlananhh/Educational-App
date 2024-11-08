import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const BannerComponent = () => {
    return (
        <View style={styles.bannerContainer}>
            <Image
                source={require('../../Assets/Images/banner-homepage.png')}
                style={styles.bannerImage}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 10,
    },
    bannerImage: {
        width: '100%',
        height: 200, // Adjust height as needed
        resizeMode: 'cover',
    },
});

export default BannerComponent;
