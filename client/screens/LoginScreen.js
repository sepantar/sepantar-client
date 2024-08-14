// ./screens/LoginScreen.js
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { OnboardContext, RoleContext, SignedInContext } from "../App";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { isAppFirstLaunched } = React.useContext(OnboardContext);
  const { setIsSignedIn } = React.useContext(SignedInContext);
  const { setRole } = React.useContext(RoleContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (email === "" || password === "") {
        Alert.alert("Validation Error", "Email and Password are required");
        return;
      }

      const res = await fetch("http://13.239.38.113/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      await SecureStore.setItemAsync(
        "accessToken",
        response.access_token
      );
      await SecureStore.setItemAsync("role", response.role);
      
      const role = await SecureStore.getItemAsync("role");
      setIsSignedIn(true);
      setRole(role); 
      

      // Biasanya Anda akan melakukan autentikasi di sini
      Alert.alert("Success", `Logged in as ${email}`);
      // Navigasi ke HomeScreen setelah login
      // if (isAppFirstLaunched === true) {
      //   navigation.replace("Onboarding");
      // } 
      // Uncomment jika menggunakan react-navigation
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while logging in");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Image
          source={require("../assets/Sepantar_Logo_No_Bg1.png")}
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Welcome Back</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Username/Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
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
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    // justifyContent: 'flex-end',
  },
  overlay: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "40%", // Sesuaikan tinggi overlay
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 0,
  },
  logo: {
    width: 400, // Sesuaikan ukuran gambar
    height: 200,
    resizeMode: "contain",
    // marginTop: 20, // Menurunkan posisi gambar ke bawah
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2F4858",
    textAlign: "center",
    marginBottom: 20, // Jarak antara teks dan gambar
  },
  formContainer: {
    backgroundColor: "#F6AE2D",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    height: "60%",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    marginTop: 40,
  },
  input: {
    height: 40,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#2F4858",
    paddingVertical: 18,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
