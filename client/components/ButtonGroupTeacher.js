import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Stack } from "tamagui";

export default function ButtonGroupTeacher({ navigation }) {
  return (
    <Stack space="$2" style={styles.buttonStack}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Absensi")}
        size="$large"
        variant="outline"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Absence</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MataPelajaran")}
        size="$large"
        variant="outline"
        style={styles.button2}
      >
        <Text style={styles.buttonText}>Subjects</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Schedule")}
        size="$large"
        variant="outline"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Jadwal Mengajar</Text>
      </TouchableOpacity>
    </Stack>
  );
}

const styles = StyleSheet.create({
  buttonStack: {
    flexGrow: 1, // Membuat Stack mengisi sisa ruang
  },
  button: {
    paddingVertical: 10, // Memperbesar tinggi tombol
    paddingHorizontal: 30, // Memperbesar lebar tombol
    fontSize: 15, // Memperbesar ukuran teks
    width: "100%",
    height: "20%", // Memastikan tombol mengisi lebar card
    marginBottom: 10, // Jarak antar tombol
    backgroundColor: "#F6AE2D",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    paddingVertical: 10, // Memperbesar tinggi tombol
    paddingHorizontal: 30, // Memperbesar lebar tombol
    fontSize: 15, // Memperbesar ukuran teks
    width: "100%",
    height: "20%", // Memastikan tombol mengisi lebar card
    marginBottom: 10, // Jarak antar tombol
    backgroundColor: "#38A0ED",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  button3: {
    paddingVertical: 10, // Memperbesar tinggi tombol
    paddingHorizontal: 30, // Memperbesar lebar tombol // Memperbesar ukuran teks
    width: "100%",
    height: "20%", // Memastikan tombol mengisi lebar card
    marginBottom: 10, // Jarak antar tombol
    backgroundColor: "#F26419",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});
