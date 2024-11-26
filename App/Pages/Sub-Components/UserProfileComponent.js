import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const UserProfileComponent = ({ name, onProfilePress, onLogoutPress }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleProfilePress = () => {
        onProfilePress();
        setIsDropdownVisible(false);
    };

    const handleLogoutPress = () => {
        onLogoutPress();
        setIsDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            <TouchableOpacity onPress={toggleDropdown}>
                <Image
                    source={require('../../Assets/Images/MaleUser.png')}
                    style={styles.profileImage}
                />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isDropdownVisible}
                onRequestClose={toggleDropdown}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    activeOpacity={1} 
                    onPressOut={toggleDropdown}
                >
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity 
                            style={styles.dropdownButton}
                            onPress={handleProfilePress}
                        >
                            <Text style={styles.dropdownButtonText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.dropdownButton}
                            onPress={handleLogoutPress}
                        >
                            <Text style={styles.dropdownButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    dropdownContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 70,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dropdownButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});

export default UserProfileComponent;