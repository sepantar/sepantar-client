import { ArrowLeft } from "lucide-react-native";
import * as React from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { useNavigation } from "@react-navigation/native";

import * as SecureStore from "expo-secure-store";

const COLORS = { blue: "#2F4858", yellow: "#F6AE2D", white: "#fff" };

export default function ListMateriStudyPlan() {
  const navigation = useNavigation();
  const [data, setData] = React.useState(null);

  const readSubjects = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const res = await fetch(
        "http://13.239.38.113/api/user/subject",
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
      console.log(response);
      
      setData(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while fetching subjects");
    }
  };

  React.useEffect(() => {
    readSubjects();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>List Mata Pelajaran</Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          {data?.map((el, idx) => {
            return (
              <View
                key={idx}
                style={{
                  flex: 1,
                  alignItems: "center",
                  //   backgroundColor: "blue",
                  marginBottom: 15,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("StudyPlanTask", {subjectId: el_id})}
                  style={{
                    backgroundColor:
                      idx % 2 === 0 ? COLORS.blue : COLORS.yellow,
                    width: width * 0.8,
                    height: 90,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>{el.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "semibold",
    color: "#2F4858",
    padding: 15,
    alignSelf: "flex-start",
  },
});
