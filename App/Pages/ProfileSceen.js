import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavigation from './Sub-Components/BottomComponent';
const { width } = Dimensions.get('window');

const ProfileScreen = () => {
    const [user] = useState({
        name: 'Nguyễn Văn Đạt',
        email: 'nguyenvandat@gmail.com',
        phone: '+84 123 456 789',
        avatar: require('../Assets/Images/MaleUser.png'),
        memberSince: '2023',
        bio: 'Nhà phát triển ứng dụng đam mê, luôn tìm kiếm những giải pháp sáng tạo và hiệu quả.',
        stats: {
            projects: 12,
            reviews: 45,
            followers: 256
        }
    });

    const ProfileStatItem = ({ icon, title, value }) => (
        <View style={styles.statItem}>
            <Icon name={icon} size={24} color="#4A90E2" style={styles.statIcon} />
            <View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statTitle}>{title}</Text>
            </View>
        </View>
    );

    const ProfileSection = ({ title, children }) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {children}
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 75 }}  showsVerticalScrollIndicator={false}>
                <View style={styles.headerBackground}>
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={user.avatar}
                                style={styles.avatar}
                            />
                            <TouchableOpacity style={styles.editButton}>
                                <Icon name="pencil" size={16} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <ProfileStatItem
                        icon="briefcase-outline"
                        title="Dự Án"
                        value={user.stats.projects}
                    />
                    <ProfileStatItem
                        icon="star-outline"
                        title="Đánh Giá"
                        value={user.stats.reviews}
                    />
                    <ProfileStatItem
                        icon="people-outline"
                        title="Người Theo Dõi"
                        value={user.stats.followers}
                    />
                </View>

                <ProfileSection title="Thông Tin Cá Nhân">
                    <View style={styles.infoRow}>
                        <Icon name="call-outline" size={20} color="#4A90E2" />
                        <Text style={styles.infoText}>{user.phone}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.infoRow}>
                        <Icon name="calendar-outline" size={20} color="#4A90E2" />
                        <Text style={styles.infoText}>Thành Viên Từ {user.memberSince}</Text>
                    </View>
                </ProfileSection>

                <ProfileSection title="Giới Thiệu">
                    <Text style={styles.bioText}>{user.bio}</Text>
                </ProfileSection>

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="settings-outline" size={20} color="white" />
                        <Text style={styles.actionButtonText}>Cài Đặt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon name="create-outline" size={20} color="white" />
                        <Text style={styles.actionButtonText}>Chỉnh Sửa</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <BottomNavigation />
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    headerBackground: {
        backgroundColor: '#4A90E2',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingBottom: 30,
    },
    profileHeader: {
        alignItems: 'center',
        paddingTop: 40,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#4A90E2',
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: -30,
        borderRadius: 20,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    statItem: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    statIcon: {
        marginRight: 10,
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
    },
    statTitle: {
        fontSize: 12,
        color: '#777',
    },
    sectionContainer: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    infoText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#2C3E50',
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 10,
    },
    bioText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A90E2',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
    },
    scrollContainer: {
        flex: 1,
        paddingBottom: 80, 
    },
});

export default ProfileScreen;