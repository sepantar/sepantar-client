import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { useNavigation } from "@react-navigation/native";

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

export default function ChapterListStudyPlanScreen({route}) {
  const navigation = useNavigation();
  const {perChapter} = route.params  
  const [data, setData] = useState(perChapter);
  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 17, fontWeight: "semibold"}}>Pilih Sub Materi</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>navigation.navigate("StudyPlan")} style={styles.btn}>
              <Text style={styles.chapters}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
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
    gap: 15
  },
  btn: {
    backgroundColor: "#F6AE2D",
    width: width * 0.9,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginVertical: 5
  },
  chapters : {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
    textAlign: "center"
  }
});
