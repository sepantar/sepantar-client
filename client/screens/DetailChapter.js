import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { ArrowLeft, Minus, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const summaryAljabar = [
  {
    id: 1,
    summaryPoint: "Aljabar menggunakan simbol untuk angka dalam persamaan.",
    summaryParagraph:
      "Aljabar adalah cabang matematika yang menggunakan simbol-simbol, seperti huruf, untuk mewakili angka dalam persamaan dan rumus. Simbol-simbol ini disebut variabel dan memungkinkan penulisan persamaan yang berlaku umum, tidak hanya untuk satu angka tetapi untuk banyak situasi berbeda.",
  },
  {
    id: 2,
    summaryPoint:
      "Persamaan aljabar menunjukkan hubungan variabel dan konstanta.",
    summaryParagraph:
      "Persamaan aljabar adalah ekspresi matematika yang menunjukkan hubungan antara variabel (simbol yang mewakili angka) dan konstanta (angka tetap). Persamaan ini biasanya mengandung tanda sama dengan (=) yang menunjukkan bahwa dua sisi dari persamaan tersebut memiliki nilai yang sama.",
  },
  {
    id: 3,
    summaryPoint: "Variabel menggeneralisasi aturan atau pola matematika.",
    summaryParagraph:
      "Variabel adalah simbol yang digunakan untuk mewakili angka yang dapat berubah. Dalam aljabar, variabel memungkinkan penulisan aturan atau pola yang berlaku untuk berbagai situasi, bukan hanya satu kasus tertentu.",
  },
  {
    id: 4,
    summaryPoint:
      "Operasi dasar meliputi penjumlahan, pengurangan, perkalian, dan pembagian.",
    summaryParagraph:
      "Operasi dasar dalam aljabar—penjumlahan, pengurangan, perkalian, dan pembagian—dilakukan pada variabel, sama seperti operasi aritmatika biasa tetapi diterapkan pada variabel.",
  },
  {
    id: 5,
    summaryPoint: "Sistem persamaan linear menyelesaikan masalah nyata.",
    summaryParagraph:
      "Sistem persamaan linear adalah kumpulan dua atau lebih persamaan linear yang bekerja bersama untuk menemukan nilai variabel yang memenuhi semua persamaan. Sistem ini sering digunakan untuk memecahkan masalah dalam berbagai bidang seperti sains, teknik, dan ekonomi.",
  },
  {
    id: 6,
    summaryPoint: "Fungsi menghubungkan dua set angka.",
    summaryParagraph:
      "Fungsi dalam aljabar menggambarkan hubungan antara dua set angka, di mana setiap input memiliki satu output. Fungsi digunakan untuk memahami bagaimana perubahan dalam satu variabel dapat mempengaruhi variabel lainnya.",
  },
];

export default function ChapterDetailScreen() {
  const navigation = useNavigation()
  const [openAccordionId, setOpenAccordionId] = React.useState(null);
  const toggleOpen = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", height, width }}>
        <StatusBar />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 17 }}>Detail Bab</Text>
        </View>
        <ScrollView style={{ flex: 1, width: width * 0.95, paddingTop: 10 }}>
          <View style={{ flex: 1, width: width * 0.94, gap: 15 }}>
            <View>
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>Aljabar</Text>
              <Text
                style={{ fontSize: 16, textAlign: "justify", color: "#75797d" }}
              >
                Pengenalan aljabar, ekspresi, persamaan, dan fungsi dasar.
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Rangkuman Materi
              </Text>
              <View style={{ gap: 15 }}>
                {summaryAljabar.map((el, idx) => (
                  <View key={idx} style={{}}>
                    <TouchableOpacity
                      style={{
                        width: width * 0.95,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      onPress={() => toggleOpen(el.id)}
                    >
                      <Text
                        style={{
                          width: width * 0.8,
                          textAlign: "justify",
                        }}
                      >
                        {el.summaryPoint}
                      </Text>
                      {openAccordionId === el.id ? (
                        <Minus color="#2F4858" />
                      ) : (
                        <Plus color="#2F4858" />
                      )}
                    </TouchableOpacity>
                    {openAccordionId === el.id && (
                      <Text
                        style={{
                          width: width * 0.9,
                          color: "#75797d",
                          textAlign: "justify",
                        }}
                      >
                        {el.summaryParagraph}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{height: height*0.1}}>
          <TouchableOpacity onPress={()=>navigation.navigate("EditChapter")} style={styles.btn}>
                <Text style={{ color: "white" }}>Edit Bab</Text>
              </TouchableOpacity>
              </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    gap: 15,
  },
  btn: {
    width: width * 0.95,
    height: 50,
    backgroundColor: "#F6AE2D",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 10,
  },
});
