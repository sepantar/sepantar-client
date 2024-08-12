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

const asbsensiMurid = [
  {
    id: "1",
    name: "Dian",
    kehadiran: "Hadir",
    keterangan: "Hadir",
  },
  {
    id: "2",
    name: "Rahma",
    kehadiran: "Tidak Hadir",
    keterangan: "Sakit",
  },
  {
    id: "3",
    name: "Bayu",
    kehadiran: "Hadir",
    keterangan: "Hadir",
  },
  {
    id: "4",
    name: "Lutfi",
    kehadiran: "Alpha",
    keterangan: "Alpha",
  },
  // Tambahkan data dengan nilai kosong
  {
    id: "5",
    name: "Siti",
    kehadiran: "",
    keterangan: "",
  },
];

const DetailAbsensiScreen = () => {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", height, width }}>
        <StatusBar />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Detail Absensi</Text>
        <Text style={styles.subtitle}>08.00 - 10.00 / Kelas 8-A</Text>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, width: width * 0.9, paddingTop: 10 }}>
            <View style={styles.containerTopper}>
              <View style={styles.column}>
                <Text>ID</Text>
              </View>
              <View style={styles.newColumn}>
                <Text>Nama</Text>
              </View>
              <View style={styles.newColumn}>
                <Text>Kehadiran</Text>
              </View>
              <View style={styles.newColumn}>
                <Text>Keterangan</Text>
              </View>
            </View>
            <View style={styles.container}>
              {asbsensiMurid.map((el, idx) => {
                return (
                  <View
                    key={idx}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingVertical: 5,
                    }}
                  >
                    <View style={styles.column}>
                      <Text>{el.id}</Text>
                    </View>
                    <View style={styles.newColumn}>
                      <Text>{el.name}</Text>
                    </View>
                    <View style={styles.newColumn}>
                      <Text>{el.kehadiran || "-"}</Text>
                    </View>
                    <View style={styles.newColumn}>
                      <Text>{el.keterangan || "-"}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default DetailAbsensiScreen;

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
    fontWeight: "bold",
    color: "#2F4858",
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "normal",
    color: "#2F4858",
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  containerTopper: {
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    height: 40,
    // alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#E6E6E6",
    flexDirection: "column",
    flex: 1,
    marginTop: 5,
    alignContent: "center",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  column: {
    flex: 1, // Membuat setiap kolom mengambil ruang yang sama
    // alignItems: "center", // Mengatur teks agar berada di tengah kolom
  },
  newColumn: {
    flex:2
  }
});
