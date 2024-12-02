import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';  // Or any other date/time picker
import CountryPicker from 'react-native-country-picker-modal'  // or any country picker you prefer
import { useNavigation } from '@react-navigation/native'


const EditProfileScreen = () => {
    const [image, setImage] = useState(null);

    const [name, setName] = useState('Melissa Peters'); // Initialize name
    const [email, setEmail] = useState('melpeters@gmail.com'); // Initialize email
    const [password, setPassword] = useState('********'); // Initialize password
    const [dateOfBirth, setDateOfBirth] = useState(new Date('1995-05-23T12:00:00'));  // Initialize date of birth
    const [country, setCountry] = useState({ callingCode: ["234"], cca2: "NG", currency: ["NGN"], flag: "🇳🇬", name: "Nigeria", region: "Africa" });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const navigation = useNavigation()
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);
    };
    const showDatepicker = () => {
        setShowDatePicker(true);
    };
    const saveChanges = () => {
        alert("Save Changes was pressed!")
        navigation.goBack();
    };
    const handleBackPress = () => {
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={150}
        >
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <TouchableOpacity onPress={handleBackPress}>
                            <Ionicons name='arrow-back' size={20} color='black' />
                        </TouchableOpacity>
                        <Text style={styles.title}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
                        <Image
                            source={image ? { uri: image } : require('../Assets/Images/profileImage.png')} style={styles.image}
                        />
                        <Ionicons name="ios-camera" size={28} color="rgba(0, 0, 0, 0.6)" style={styles.cameraIcon} />
                    </TouchableOpacity>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName} style={styles.inputField}
                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail} style={styles.inputField}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={setPassword}
                        value={password} secureTextEntry
                    />
                    <TouchableOpacity onPress={showDatepicker} style={{ padding: 0 }}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TextInput
                            editable={false} 
                            style={styles.inputField}
                            value={dateOfBirth.toLocaleDateString()}
                            placeholder="Select date of birth"
                        />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            is24Hour={true} onChange={handleDateChange}
                        />
                    )}
                    <TouchableOpacity style={{ padding: 0 }}>
                        <View style={{
                            position: 'relative',
                            flex: 1
                        }}>
                            <Text style={styles.label}>Country/Region</Text>
                            <CountryPicker
                                withFilter
                                    {...{
                                    countryCode: country.cca2,
                                    onSelect: (country) => {
                                        setCountry(country)
                                    }
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                        <Text style={styles.saveButtonText}>Save changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 40, 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginBottom: 20,  
        width: 130,
        height: 130,
        borderRadius: 65, 
        alignSelf: 'center', 
        overflow: 'hidden', 
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    cameraIcon: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 4,
        borderRadius: 20,
    },
    label: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 5,
    },
    inputField: {
        height: 55,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        padding: 8,
        fontSize: 18,
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: 'rgb(25, 146, 255)',
        marginVertical: 25,
        paddingVertical: 15,
        borderRadius: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    }
});


export default EditProfileScreen;