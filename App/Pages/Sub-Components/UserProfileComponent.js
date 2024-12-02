import React, { useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity, 
    Modal, 
    Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import Icon from 'react-native-vector-icons/Ionicons'; 

const { width } = Dimensions.get('window');

const UserProfileComponent = ({ name, onLogoutPress }) => {
    const navigation = useNavigation();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleProfilePress = () => {
        navigation.navigate('ProfileScreen');
        setIsDropdownVisible(false);
    };

    const handleLogoutPress = () => {
        navigation.navigate('Login');
        setIsDropdownVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.userInfoContainer}>
                <Text style={styles.greeting}>Xin chào</Text>
                <Text style={styles.name}>{name}</Text>
            </View>
            
            <TouchableOpacity 
                onPress={toggleDropdown} 
                style={styles.profileImageContainer}
            >
                <Image
                    source={require('../../Assets/Images/MaleUser.png')}
                    style={styles.profileImage}
                />
                <View style={styles.statusIndicator} />
            </TouchableOpacity>

            <Modal
                animationType="fade"
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
                            <Icon 
                                name="person-outline" 
                                size={20} 
                                color="#4A90E2" 
                                style={styles.dropdownIcon}
                            />
                            <Text style={styles.dropdownButtonText}>Hồ sơ cá nhân</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.divider} />
                        
                        <TouchableOpacity 
                            style={styles.dropdownButton}
                            onPress={handleLogoutPress}
                        >
                            <Icon 
                                name="log-out-outline" 
                                size={20} 
                                color="#E74C3C" 
                                style={styles.dropdownIcon}
                            />
                            <Text style={styles.dropdownButtonText}>Đăng xuất</Text>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#F7F9FC',
    },
    userInfoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    greeting: {
        fontSize: 14,
        fontWeight: '400',
        color: '#777',
        marginBottom: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
    },
    profileImageContainer: {
        position: 'relative',
    },
    profileImage: {
        width: 65,
        height: 65,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    statusIndicator: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2ECC71',
        borderWidth: 2,
        borderColor: 'white',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    dropdownContainer: {
        width: width * 0.6,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 15,
        marginTop: 80,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: 4 
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    dropdownIcon: {
        marginRight: 12,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#2C3E50',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 10,
    },
});

export default UserProfileComponent;