import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { ArrowLeft } from "lucide-react-native";

const subjectsData = [
  {
    id: "1",
    image: "https://fakeimg.pl/400x400?font=bebas",
    title: "Matematika",
    schedule: "08.00 - 10.00",
    teacherName: "Dian",
  },
  {
    id: "2",
    image: "https://fakeimg.pl/400x400?font=bebas",
    title: "Biologi",
    schedule: "10.00 - 12.00",
    teacherName: "Lutfi",
  },
  {
    id: "3",
    image: "https://fakeimg.pl/400x400?font=bebas",
    title: "Bahasa Indonesia",
    schedule: "13.00 - 15.00",
    teacherName: "Dian",
  },
];

const COLORS = { blue: "#2F4858", yellow: "#F6AE2D", white: "#fff" };

const SubjectListScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>List Mata Pelajaran</Text>
      <View style={{ flex: 1, width: "100%", paddingHorizontal: 15, gap: 10 }}>
        <ScrollView>
          {subjectsData.map((el, idx) => {
            return (
              <View
                key={idx}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  padding: 10,
                  borderRadius: 10,
                  backgroundColor: idx % 2 === 0 ? COLORS.blue : COLORS.yellow,
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <Image
                  source={{ uri: el.image }}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-around",
                    gap: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      color: idx % 2 === 0 ? COLORS.white : COLORS.blue,
                    }}
                  >
                    {el.title}
                  </Text>
                  <View>
                    <Text
                      style={{
                        color: idx % 2 === 0 ? COLORS.white : COLORS.blue,
                      }}
                    >
                      {el.schedule}
                    </Text>
                    <Text
                      style={{
                        color: idx % 2 === 0 ? COLORS.white : COLORS.blue,
                      }}
                    >
                      {el.teacherName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor:
                        idx % 2 === 0 ? COLORS.yellow : COLORS.blue,
                      width: "80%",
                      height: 40,
                      width: 170,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 15,
                    }}
                  >
                    <Text style={{ color: "white" }}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default SubjectListScreen;

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
