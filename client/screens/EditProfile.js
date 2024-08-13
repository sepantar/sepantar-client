import {
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { height, width } from "./AbsensiScreen";
import { ArrowLeft, LockKeyhole, Mail, Phone, User } from "lucide-react-native";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const ShowIcon = (props) => {
    const { width = 20, height = 20, fill = "gray" } = props;
    return (
      <Svg height={width} viewBox="0 -960 960 960" width={height} fill={fill}>
        <Path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
      </Svg>
    );
  };
  const HideIcon = (props) => {
    const { width = 20, height = 20, fill = "gray" } = props;
    return (
      <Svg height={width} viewBox="0 -960 960 960" width={height} fill={fill}>
        <Path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
      </Svg>
    );
  };
  function handleEdit() {
    Keyboard.dismiss();
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
          <Text style={{ fontSize: 20 }}>Lutfi Farhan Hakim</Text>
          <Text style={{ color: "gray" }}>@lutfifhakim</Text>
        </View>
        <View style={styles.container}>
        <ScrollView>
          <View style={{ gap: 20 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <User color="#2F4858" />
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text>Nama</Text>
                <Text style={{ color: "gray", fontSize: 12 }}>
                  Lutfi Farhan Hakim
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Mail color="#2F4858" />
              <View style={{ flexDirection: "column", gap: 5 }}>
                <Text>Email</Text>
                <Text style={{ color: "gray", fontSize: 12 }}>
                  lutfi@mail.com
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
                  <View style={styles.input_block}>
                    <TextInput
                      style={styles.input}
                      keyboardType="default"
                      placeholder="Enter Password"
                      placeholderTextColor="gray"
                      autoCorrect={false}
                      secureTextEntry={isPasswordVisible ? false : true}
                      autoCapitalize="none"
                      value={password}
                      onChangeText={setPassword}
                    />
                    {!isPasswordVisible && (
                      <TouchableOpacity
                        onPress={() =>
                          setIsPasswordVisible((previous) => !previous)
                        }
                        style={styles.visible_block}
                      >
                        <ShowIcon />
                      </TouchableOpacity>
                    )}
                    {isPasswordVisible && (
                      <TouchableOpacity
                        onPress={() =>
                          setIsPasswordVisible((previous) => !previous)
                        }
                        style={styles.visible_block}
                      >
                        <HideIcon />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
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
                <Phone color="#2F4858" />
                <View style={{ flexDirection: "column", gap: 5 }}>
                  <Text>Nomor Telepon</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="(+62) 0123456789"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => {handleEdit()}}>
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
              Save
            </Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      </View>
    </>
  );
};

export default EditProfileScreen;

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
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    gap: 25,
  },
  btn: {
    marginVertical: 50,
    height: 50,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: "#F6AE2D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    height: 40,
    width: width * 0.79,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 5,
  },
  input_block: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  visible_block: {
    position: "absolute",
    right: 13,
  },
});
