import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { ArrowLeft, Minus, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as SecureStore from "expo-secure-store";
import { RoleContext } from "../App";

LogBox.ignoreAllLogs(true); // Ignore log notification by message
export default function ChapterDetailScreen({ route }) {
  const navigation = useNavigation();
  const { chapter } = route.params;
  const { role } = React.useContext(RoleContext);
  // console.log(chapter, "<<<<chapter atssss");
  console.log(chapter?._id, "<<<<chapterId");

  const [loading, setLoading] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [studyPlan, setStudyPlan] = useState({
    startTime: null,
    endTime: null,
  });
  const [selectedSummaryId, setSelectedSummaryId] = useState(null);

  const toggleOpen = (id) => {
    if (openAccordionId !== id && showTimeInput) {
      setShowTimeInput(false);
    }
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const handleTimeChange = (field, time) => {
    const formattedTime = moment(time).format("HH:mm");
    setStudyPlan((prev) => ({
      ...prev,
      [field]: formattedTime,
    }));
  };

  const isValidTime = (start, end) => {
    return (
      start && end && moment(start, "HH:mm").isBefore(moment(end, "HH:mm"))
    );
  };

  const validateAndSave = () => {
    const { startTime, endTime } = studyPlan;

    if (!startTime || !endTime) {
      Alert.alert(
        "Form Tidak Lengkap",
        "Harap pilih jam mulai dan jam berakhir.",
        [{ text: "OK" }]
      );
      return false;
    }

    if (!isValidTime(startTime, endTime)) {
      Alert.alert(
        "Waktu Tidak Valid",
        "Jam mulai harus lebih kecil dari jam berakhir.",
        [{ text: "OK" }]
      );
      return false;
    }

    // Handle the saving of the study plan here
    // console.log("Study Plan:", studyPlan);
    console.log(studyPlan, "<<<<<studyplan");
    addStudyPlan();
    setShowTimeInput(false); // Hide the input form after saving
    return true;
  };

  const handleButtonPress = () => {
    if (role === "student") {
      if (showTimeInput) {
        validateAndSave();
      } else {
        setShowTimeInput(true);
      }
    } else if (role === "teacher") {
      navigation.navigate("EditChapter");
    }
  };

  const addStudyPlan = async () => {
    try {
      console.log("masuk addStudyPlan");
      console.log({
        start: studyPlan.startTime,
        to: studyPlan.endTime,
        chapterId: chapter._id,
      });

      setLoading(true);
      const token = await SecureStore.getItemAsync("accessToken");
      const res = await fetch(
        "http://147.185.221.22:1489/api/subject/studyplan",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            start: studyPlan.startTime,
            to: studyPlan.endTime,
            chapterId: chapter._id,
          }),
        }
      );
      const response = await res.json();
      if (!res.ok) {
        console.log(response, "<<<<response");
        setLoading(false);
        Alert.alert("Error", response.message);
        throw response;
      }
      if (response) {
        setLoading(false);
      }
      console.log(response);
      Alert.alert("Success", response.message);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error, "<<<<<<<<<<<<<<<<<<<error");
      // Alert.alert("Error", "An error occurred while add study plan");
    }
  };

  React.useEffect(() => {
    console.log(studyPlan, "<<<<<<studyplan di detailchapter");
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

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
              <Text style={{ fontSize: 19, fontWeight: "bold" }}>
                {chapter.name}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "justify",
                  color: "#75797d",
                }}
              >
                {chapter.description}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Rangkuman Materi
              </Text>
              <View style={{ gap: 15 }}>
                {chapter.material.map((el, idx) => (
                  <View key={idx}>
                    <TouchableOpacity
                      style={{
                        width: width * 0.95,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                      onPress={() => toggleOpen(idx)}
                    >
                      <Text
                        style={{
                          width: width * 0.8,
                          textAlign: "justify",
                        }}
                      >
                        {el.name}
                      </Text>
                      {openAccordionId === idx ? (
                        <Minus color="#2F4858" />
                      ) : (
                        <Plus color="#2F4858" />
                      )}
                    </TouchableOpacity>
                    {openAccordionId === idx && (
                      <Text
                        style={{
                          width: width * 0.9,
                          color: "#75797d",
                          textAlign: "justify",
                        }}
                      >
                        {el.summary}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
        {role === "student" && showTimeInput && (
          <View style={styles.timeInputContainer}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Masukkan Waktu Belajar
            </Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => setStartTimePickerVisibility(true)}
            >
              <Text
                style={{
                  color: studyPlan.startTime ? "black" : "#75797d",
                }}
              >
                {studyPlan.startTime ? studyPlan.startTime : "Jam Mulai"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              value={new Date()}
              mode="time"
              onConfirm={(time) => {
                handleTimeChange("startTime", time);
                setStartTimePickerVisibility(false);
              }}
              onCancel={() => setStartTimePickerVisibility(false)}
            />
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => setEndTimePickerVisibility(true)}
            >
              <Text
                style={{
                  color: studyPlan.endTime ? "black" : "#75797d",
                }}
              >
                {studyPlan.endTime ? studyPlan.endTime : "Jam Berakhir"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              value={new Date()}
              mode="time"
              onConfirm={(time) => {
                handleTimeChange("endTime", time);
                setEndTimePickerVisibility(false);
              }}
              onCancel={() => setEndTimePickerVisibility(false)}
            />
          </View>
        )}
        <View style={{ height: height * 0.1 }}>
          <TouchableOpacity onPress={handleButtonPress} style={styles.btn}>
            <Text style={{ color: "white" }}>
              {role === "student"
                ? showTimeInput
                  ? "Simpan Study Plan"
                  : "Generate Study Plan"
                : "Edit Bab"}
            </Text>
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
  timeInputContainer: {
    // marginTop: 20,
    width: width * 0.95,
    alignItems: "center",
    // marginBottom: 10,
    marginVertical: 15,
  },
  timeInput: {
    width: width * 0.9,
    height: 40,
    borderWidth: 0.5,
    borderColor: "#2F4858",
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
