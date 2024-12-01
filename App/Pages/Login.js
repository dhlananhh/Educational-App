import React, { useContext, useEffect, useState } from 'react'
import Colors from '../Shared/Colors'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Home from './Home';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet
} from 'react-native';


export default function Login({ navigation }) {
    const [name, setName] = useState('');


    return (
        <View style={styles.container}>
            <Image source={require('./../Assets/Images/login.png')} style={styles.loginImage} />
            <View style={styles.formContainer}>
                <Text style={styles.welcomeText}>Welcome to CodeBox</Text>
                {/* Input field for name */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />

                {/* Get Started button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (name.trim() !== '') {  // Check if name is not empty
                            navigation.navigate('Home', { name }); // Navigate to HomePage
                        } else {
                            alert("Please input your name!")
                        }
                    }}
                >
                    <Text style={styles.buttonText}>GET STARTED →</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    loginImage: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
    },
    formContainer: {
        padding: 20,
        paddingTop: 40,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        width: "100%",
        paddingLeft: 10,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        margin: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
