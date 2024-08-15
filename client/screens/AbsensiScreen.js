import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ArrowLeft, ChevronDown } from "lucide-react-native";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import react, * as React from "react";
import { Accordion, Button, Paragraph, Square } from "tamagui";
import * as SecureStore from "expo-secure-store";
import { RoleContext } from "../App";
import QRCodeScreen from "./QRCodeScreen";
import AttendanceScreen from "./AttendanceScreen";

export const { width, height } = Dimensions.get("window");

const accordionData = [
  {
    id: "1",
    title: "08.00 - 10.00 / Kelas 7-A",
    hadir: 8,
    izin: 6,
    alpa: 1,
  },
  {
    id: "2",
    title: "10.00 - 12.00 / Kelas 8-C",
    hadir: 8,
    izin: 6,
    alpa: 1,
  },
  {
    id: "3",
    title: "13.00 - 15.00 / Kelas 9-B",
    hadir: 8,
    izin: 6,
    alpa: 1,
  },
];

const AbsensiScreen = () => {
  const navigation = useNavigation();
  const { role } = React.useContext(RoleContext);
  const [data, setData] = React.useState(null);
  const [attendance, setAttendance] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const readUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const res = await fetch("https://sepantar-app.vercel.app/api/user/info", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      console.log(response, "<<<<absensi");
      setData(response);
    } catch (error) {
      console.log("Failed to fetch user profile", error);
    }
  };
  console.log(data, "<<<<data");
  const readAttendance = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const res = await fetch(
        "http://147.185.221.22:1489/api/user/attendance",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw response;
      }
      const response = await res.json();
      console.log(response, "<<<<LIST ABSENSI");

      setAttendance(response);
    } catch (error) {
      console.log("Failed to fetch user attendance", error);
    }
  };

  React.useEffect(() => {
    readUser();
    readAttendance();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      readAttendance();
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Absensi</Text>

      {role === "teacher" ? (
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              setLoading(true);
              const token = await SecureStore.getItemAsync("accessToken");
              const res = await fetch(
                "http://147.185.221.22:1489/api/attendance/check",
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const response = await res.json();
              if (!res.ok) {
                throw response;
              }
              console.log(response, "<<<<cek jawdal");
              setLoading(false);
              Alert.alert(
                `Attendance for ${response.class.class_name} class (${response.subject.name})`
              );
              navigation.navigate("Attendance", { data: response._id });
            } catch (error) {
              Alert.alert(error.message);
              setLoading(false);

              console.log("Failed to fetch user profile", error);
            }
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={{ color: "white" }}>Scan QR Code</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("QRCodeScreen", { userId: data?._id })
          }
        >
          <Text style={{ color: "white" }}>Generate QR</Text>
        </TouchableOpacity>
      )}
      <View style={{ flex: 1, width: width * 0.9, paddingVertical: 30 }}>
        <Text style={{ fontSize: 19, fontWeight: "bold", color: "#2F4858" }}>
          Absensi Hari Ini
        </Text>
        <ScrollView style={styles.container}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              padding: 5,
            }}
          >
            {role === "student" ? (
              <>
                {attendance.map((el, idx) => {
                  let textColor = "";
                  if (el.status === "Hadir") {
                    textColor = "#01721A";
                  } else if (el.status === "Alpha") {
                    textColor = "#ff0000";
                  }
                  return (
                    <View
                      style={{
                        flex: 1,
                        minWidth: "100%",
                        paddingHorizontal: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>{el.subject.name}</Text>
                      <Text style={{ fontSize: 18, color: textColor }}>
                        {el.status}
                      </Text>
                    </View>
                  );
                })}
              </>
            ) : (
              <Accordion style={{ flex: 1 }} type="multiple">
                {accordionData.map((el, idx) => {
                  return (
                    <Accordion.Item key={idx} value={el.id}>
                      <Accordion.Header>
                        <Accordion.Trigger
                          flexDirection="row"
                          justifyContent="space-between"
                          style={{
                            width: "100%",
                            backgroundColor: "transparent",
                          }}
                        >
                          {({ open }) => (
                            <>
                              <Paragraph>{el.title}</Paragraph>
                              <Square
                                animation="quick"
                                rotate={open ? "180deg" : "0deg"}
                              >
                                <ChevronDown color="#2F4858" />
                              </Square>
                            </>
                          )}
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content
                        style={{
                          width: "100%",
                          backgroundColor: "#EBEBEB",
                          borderRadius: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => navigation.navigate("DetailAbsensi")}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-around",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Paragraph color="#01721A">Hadir</Paragraph>
                              <Paragraph>{el.hadir}</Paragraph>
                            </View>
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Paragraph color="#F6AE2D">Izin</Paragraph>
                              <Paragraph>{el.izin}</Paragraph>
                            </View>
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <Paragraph color="#B95623">Alpha</Paragraph>
                              <Paragraph>{el.alpa}</Paragraph>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </Accordion.Content>
                    </Accordion.Item>
                  );
                })}
              </Accordion>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#2F4858",
    width: "80%",
    height: 70,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    alignItems: "center",
    fontWeight: "semibold",
    color: "#2F4858",
    padding: 15,
  },
  container: {
    borderWidth: 0.5,
    borderColor: "#2F4858",
    width: "100%",
    flex: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
});

export default AbsensiScreen;
