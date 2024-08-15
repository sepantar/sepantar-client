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
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";



const COLORS = { blue: "#2F4858", yellow: "#F6AE2D", white: "#fff" };

const ScheduleScreen = () => {
  const [data, setData] = React.useState(null);
  const navigation = useNavigation();
  const readUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      const res = await fetch("http://147.185.221.22:1489/api/user/schedule", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      console.log(response, "<<<<<<schedule");

      setData(response);
    } catch (error) {
      console.log("Failed to fetch user profile", error);
    }
  };

  React.useEffect(() => {
    readUser();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Jadwal Mata Pelajaran Hari Ini</Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingHorizontal: 15,
          gap: 10,
          marginTop: 5,
        }}
      >
        <ScrollView>
          {data?.map((el, idx) => {
            return (
              <View key={idx}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor:
                      idx % 2 === 0 ? COLORS.blue : COLORS.yellow,
                    gap: 10,
                    marginBottom: 15,
                  }}
                >
                  <Image
                    source={{ uri: "https://th.bing.com/th/id/OIP.XzNTde3anKlyPZBVebOjNQAAAA?w=474&h=474&rs=1&pid=ImgDetMain" }}
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
                      {el.subject.name}
                    </Text>
                    <View>
                      <Text
                        style={{
                          color: idx % 2 === 0 ? COLORS.white : COLORS.blue,
                        }}
                      >
                        {el.startTime}:00 - {el.endTime}:00
                      </Text>
                      <Text
                        style={{
                          color: idx % 2 === 0 ? COLORS.white : COLORS.blue,
                        }}
                      >
                        {el.teacher.name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DetailMataPelajaran", {
                          subject: el,
                        })
                      }
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
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ScheduleScreen;

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
    paddingHorizontal: 15,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
});
