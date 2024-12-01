import React from 'react';
import { 
    View, 
    TextInput, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SearchBarComponent = ({ onPress }) => {
    return (
        <TouchableOpacity 
            style={styles.searchContainer} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.searchContent}>
                <FontAwesome 
                    name="search" 
                    size={20} 
                    color="#6E8CA0" 
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm khóa học"
                    placeholderTextColor="#9E9E9E"
                    editable={false} 
                />
            </View>
        </TouchableOpacity>
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
    searchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    searchIcon: {
        marginHorizontal: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});

export default SearchBarComponent;
