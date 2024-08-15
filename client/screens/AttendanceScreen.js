import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Ensure this is imported
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the icon library
import * as SecureStore from "expo-secure-store";

export default function AttendanceScreen({ route }) {
  // const { data } = route.params;
  console.log(route.params, "<<<ID SCHEDULE");
  const data = route.params.data;
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [dataQR, setDataQR] = useState("");
  const navigation = useNavigation(); // Initialize navigation

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function recordAttendance(dataQR) {
    try {
      console.log("masuk record attendance");

      const token = await SecureStore.getItemAsync("accessToken");
      const res = await fetch(
        "http://147.185.221.22:1489/api/attendance/scan",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: dataQR, scheduleId: data }),
        }
      );
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      console.log(response, "<<<<hasil attendance");
      // Alert.alert(
      //   `Attendance for ${response.class.class_name} class (${response.subject.name})`
      // );
    } catch (error) {
      // Alert.alert(error.message);
      console.log("Failed to edit attendance", error);
    }
  }

  async function handleBarCodeScanned(type, data) {
    setScanned(true);
    if (!scanned) {
      if (data !== dataQR) {
        setDataQR(data);

        await recordAttendance(dataQR);
        console.log(
          `Bar code with type ${type} and data ${data} has been scanned!`
        );
        Alert.alert(
          `Bar code with type ${type} and data ${data} has been scanned!`,
          "",
          [{ text: "OK", onPress: () => setScanned(false) }]
        );
      }
    } else {
      setScanned(false);
    }
    // You can add additional logic here if needed
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={30} color="#2F4858" />
      </TouchableOpacity>
      <Text style={styles.scanText}>Scan untuk absen</Text>
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={async (result) => {
            await handleBarCodeScanned(result.type, result.data);
          }}
        />
      </View>
      <View style={styles.borderContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  cameraContainer: {
    width: "80%",
    height: "60%",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensure the camera view fits within the border
    position: "relative",
    marginBottom: 20, // Add margin to create space for the border
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  scanText: {
    color: "#2F4858",
    fontSize: 30,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  borderContainer: {
    width: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: "transparent",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },
});
