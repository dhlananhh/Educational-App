import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const SearchBarComponent = () => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                placeholderTextColor="#9E9E9E"
            />
            <Text>
                <FontAwesome name="search" size={24} color="gray" />
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 10,
    },
    icon: {
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
    },
});

export default SearchBarComponent;
