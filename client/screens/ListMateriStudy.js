import { ArrowLeft } from "lucide-react-native";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { useNavigation } from "@react-navigation/native";

const subjectsData = [
  {
    title: "Matematika",
  },
  {
    title: "Bahasa Inggris",
  },
  {
    title: "Bahasa Indonesia",
  },
  {
    title: "IPA",
  },
  {
    title: "IPS",
  },
];

const COLORS = { blue: "#2F4858", yellow: "#F6AE2D", white: "#fff" };

export default function ListMateriStudyPlan() {
  const navigation = useNavigation();
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
          {subjectsData.map((el, idx) => {
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
                  onPress={() => navigation.navigate("StudyPlanTask")}
                  style={{
                    backgroundColor:
                      idx % 2 === 0 ? COLORS.blue : COLORS.yellow,
                    width: width * 0.8,
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 15,
                  }}
                >
                  <Text style={{ color: "white" }}>{el.title}</Text>
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
