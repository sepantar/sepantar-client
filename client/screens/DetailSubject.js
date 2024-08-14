import { ArrowLeft, Minus, Plus } from "lucide-react-native";
import * as React from "react";
import {
  ImageBackground,
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

const detailSubjectData = [
  {
    id: 1,
    chapterName: "Aljabar",
    chapterSummary:
      "Pengenalan aljabar, ekspresi, persamaan, dan fungsi dasar.",
  },
  {
    id: 2,
    chapterName: "Geometri",
    chapterSummary:
      "Pembahasan tentang bentuk-bentuk dasar, sudut, dan konsep-konsep geometri lainnya.",
  },
  {
    id: 3,
    chapterName: "Trigonometri",
    chapterSummary:
      "Dasar-dasar trigonometri, fungsi sinus, kosinus, dan tangen.",
  },
  {
    id: 4,
    chapterName: "Kalkulus Dasar",
    chapterSummary: "Pengenalan limit, turunan, dan integral.",
  },
  {
    id: 5,
    chapterName: "Statistika",
    chapterSummary:
      "Pengantar statistik, mean, median, mode, dan distribusi data.",
  },
  {
    id: 6,
    chapterName: "Probabilitas",
    chapterSummary: "Konsep dasar probabilitas dan cara menghitung peluang.",
  },
  {
    id: 7,
    chapterName: "Matriks dan Vektor",
    chapterSummary:
      "Pengenalan matriks, operasi dasar pada matriks, dan dasar-dasar vektor.",
  },
  {
    id: 8,
    chapterName: "Logika Matematika",
    chapterSummary: "Dasar-dasar logika, proposisi, dan pembuktian matematika.",
  },
];

const DetailSubjectScreen = ({route}) => {
  const navigation = useNavigation()
  const [data, setData] = React.useState(null);
  const {subject} = route.params
  const [openAccordionId, setOpenAccordionId] = React.useState(null);

  const toggleOpen = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const readDetailMapel = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      console.log(token);
      
      const res = await fetch(`http://147.185.221.22:1489/api/subject/${subject.subject._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      console.log(response, "<<<<<detail");
      
      setData(response)
    } catch (error) {
      console.log("Failed to fetch user profile", error);
    }
  }
  React.useEffect(() => {
    readDetailMapel();
    console.log(subject.subject._id, "<<<<<<el");
  }, [])
  
  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <ImageBackground
        source={require("../assets/detailsubject.png")}
        resizeMode="cover"
        style={{ flex: 1, width: "100%", height: 300 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                backgroundColor: "white",
                height: 40,
                width: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
              }}
            >
              <ArrowLeft color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            alignItems: "center",
          }}
        ></View>
        <View style={styles.container}>
          <ScrollView>
            <Text
              style={{ fontSize: 23, color: "#2F4858", fontWeight: "bold" }}
            >
              {data?.name} 
            </Text>
            <View
              style={{
                paddingTop: 5,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 14, color: "#75797d" }}>Tingkat </Text>
              <Text style={{ fontSize: 14, color: "#75797d" }}>10 Chapter</Text>
            </View>
            <View style={{ marginTop: 20, gap: 5 }}>
              <Text
                style={{ fontSize: 17, color: "#2F4858", fontWeight: "bold" }}
              >
                Deskripsi Mata Pelajaran
              </Text>
              <Text style={{ fontSize: 15, color: "#75797d" }}>
                {data?.description}
              </Text>
            </View>
            <View style={{ marginTop: 20, gap: 5 }}>
              <Text
                style={{ fontSize: 17, color: "#2F4858", fontWeight: "bold" }}
              >
                Materi
              </Text>
              <View style={{ gap: 10 }}>
                {data?.chapters?.map((el,idx) => (
                  <View key={idx} style={{ gap: 5 }}>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      onPress={() => toggleOpen(idx)}
                    >
                      <Text>{el.name}</Text>
                      {openAccordionId === idx ? (
                        <Minus color="#2F4858" />
                      ) : (
                        <Plus color="#2F4858" />
                      )}
                    </TouchableOpacity>
                    {openAccordionId === idx && (
                      <TouchableOpacity
                        onPress={() => navigation.navigate("DetailChapter", {chapter: el})}
                      >
                        <Text
                          style={{
                            width: width * 0.8,
                            color: "#75797d",
                            textAlign: "justify",
                          }}
                        >
                          {el.description}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
              <TouchableOpacity onPress={() => {navigation.navigate("NewChapter")}} style={styles.btn}>
                <Text style={{color:"white"}}>Buat Materi Baru</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailSubjectScreen;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  container: {
    flex: 5,
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 13,
    // alignItems: "center",
    borderTopStartRadius: 70,
    borderTopEndRadius: 70,
    borderWidth: 3,
    borderColor: "#d5dce6",
  },
  btn: {
    marginTop: 50,
    height: 50,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: "#2F4858",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btn2: {
    marginTop: 10,
    marginBottom: 30,
    height: 50,
    width: width * 0.9,
    borderRadius: 10,
    backgroundColor: "#F6AE2D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
