// ./screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === '' || password === '') {
            Alert.alert('Validation Error', 'Username/Email and Password are required');
            return;
        }

        // Biasanya Anda akan melakukan autentikasi di sini
        Alert.alert('Success', `Logged in as ${username}`);

        // Navigasi ke HomeScreen setelah login
        // navigation.navigate('Home'); // Uncomment jika menggunakan react-navigation
    };

    return (
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Image source={require('../assets/Sepantar_Logo_No_Bg.png')} style={styles.logo} />
                <Text style={styles.welcomeText}>Welcome Back</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    placeholder="Username/Email"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: '40%', // Sesuaikan tinggi overlay
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        padding: 20,
    },
    logo: {
        width: 400, // Sesuaikan ukuran gambar
        height: 400,
        resizeMode: 'contain',
        marginTop: 20, // Menurunkan posisi gambar ke bawah
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2F4858',
        textAlign: 'center',
        marginBottom: 20, // Jarak antara teks dan gambar
    },
    formContainer: {
        backgroundColor: '#F6AE2D',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 20,
        height: '50%',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        marginTop:20
    },
    input: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        fontSize: 16,
        marginTop:20
    },
    button: {
        backgroundColor: '#2F4858',
        paddingVertical: 18,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
