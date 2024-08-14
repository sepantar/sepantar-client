import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import * as SecureStore from "expo-secure-store";
import { ArrowLeft, LockKeyhole, Mail, Phone, User } from "lucide-react-native";
import * as React from "react";
import { SignedInContext } from "../App";

const ProfileScreen = ({navigation, route}) => {
  const {data} = route.params;
  const {setIsSignedIn} = React.useContext(SignedInContext);

  
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }


  return (
    <>
      <View style={{ flex: 1, alignItems: "center", height, width }}>
        <StatusBar />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", gap: 10, marginBottom: 30 }}>
          <Image
            source={{ uri: "https://fakeimg.pl/400x400?font=bebas" }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
          <Text style={{ fontSize: 20 }}>{data?.name}</Text>
          <Text style={{ color: "gray" }}>@{data?.username}</Text>
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <User color="#2F4858" />
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text>Nama</Text>
              <Text style={{ color: "gray", fontSize: 12 }}>
                {data?.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Mail color="#2F4858" />
            <View style={{ flexDirection: "column", gap: 5 }}>
              <Text>Email</Text>
              <Text style={{ color: "gray", fontSize: 12 }}>
                {data?.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <LockKeyhole color="#2F4858" />
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text>Password</Text>
                <TouchableOpacity>
                  <Text style={{ color: "gray", fontSize: 12 }}>
                    Tap to change password
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate("EditProfile")}}>
              <Text style={{ color: "gray", fontSize: 12 }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Phone color="#2F4858" />
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text>Nomor Telepon</Text>
                  <Text style={{ color: "gray", fontSize: 12 }}>
                   {data?.phoneNumber}
                  </Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate("EditProfile")}}>
              <Text style={{ color: "gray", fontSize: 12 }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => {handleLogout}} style={styles.btn}>
          <Text style={{ color: "white", fontSize: 20 }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    gap: 25,
  },
  btn: {
    marginVertical: 40,
    height: 50,
    width: width*0.8,
    borderRadius: 10,
    backgroundColor: "#2F4858",
    justifyContent: "center",
    alignItems: "center",
  },
});
