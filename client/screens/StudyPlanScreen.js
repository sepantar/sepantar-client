import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Text, Stack, Card } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";
import { ChevronUp, ChevronDown } from "lucide-react-native"; // Import ikon dari lucide-react-native
import { Ionicons } from "react-native-vector-icons";
import * as SecureStore from "expo-secure-store";

const StudyPlanScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item, chapterId } = route.params;
  // console.log(item, "item dari params");
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [openAccordionId, setOpenAccordionId] = useState(null); // Untuk mengontrol accordion yang terbuka

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEditPlan = (id) => {
    // Logika untuk mengedit study plan berdasarkan ID
    console.log(`Edit plan with ID: ${id}`);
  };

  const handleDeletePlan = async (chapterId) => {
    try {
      console.log(data, "data di studyplanscreen");
      console.log(chapterId, "<<<<<chapterId handle delete");
      setLoading(true);
      const token = await SecureStore.getItemAsync("accessToken");
      let res = await fetch(
        `http://147.185.221.22:1489/api/user/studyplan?chapterId=${chapterId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await res.json();
      console.log(response, "<<<<<response delete study plan");

      if (!res.ok) {
        throw response;
      }
      if (response) {
        setLoading(false);
      }
      Alert.alert("Success", response.message);
      // navigation.navigate("StudyPlanSubjectList");
    } catch (error) {
      console.log("Failed to delete study plan", error);
      Alert.alert("Error", error.message);
    }
  };

  async function handlePut(data) {
    try {
      setLoading(true);
      const token = await SecureStore.getItemAsync("accessToken");
      let res = await fetch(`http://147.185.221.22:1489/api/user/studyplan`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      const response = await res.json();
      console.log(response, "<<<<<response put status study plan");
      if (!res.ok) {
        throw response;
      }
      if (response) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  }

  const handleCheck = (idx) => {
    console.log(data, "dataaa");
    if (data?.plan_contents) {
      const newData = JSON.parse(JSON.stringify(data)); // Deep copy data
      newData.plan_contents[idx].status = !newData.plan_contents[idx].status;
      if (newData) {
        setData(newData);
        handlePut(JSON.stringify(newData));
      }
      console.log(newData, "data setelah di check");
      console.log(newData.plan_contents, "<<<<<<<<<<<<<");
    }
  };

  const toggleOpen = (id) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

  const getStudyPlan = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");
      // console.log(item, "item di studyplanscreen");

      console.log(item._id, chapterId, "<<<<<item id");
      let url = `http://147.185.221.22:1489/api/user/studyplan?chapterId=`;
      if (chapterId) {
        url += chapterId;
      }
      if (item._id) {
        url += item._id;
      }
      // let url = `http://147.185.221.22:1489/api/user/studyplan?chapterId=${item._id||chapterId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      console.log(response, "<<<<<detail fetch studyplan di studyplanscreen");
      setData(response);
    } catch (error) {
      console.log(error);
      Alert.alert("", error.message);
      console.log("Failed to fetch studyplan detail", error);
    }
  };
  React.useEffect(() => {
    getStudyPlan();
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

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={[styles.taskText]}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>

      {/* Body with List of Study Plans */}
      <Stack space="$4" style={styles.body}>
        <View style={styles.accordionSection}>
          {data?.plan_contents?.map((plan, idx) => (
            <Card
              key={idx}
              padding="$4"
              borderRadius="$4"
              backgroundColor="#F6AE2D"
              shadow="$2"
              style={styles.card}
            >
              <View style={styles.accordionItem}>
                <TouchableOpacity
                  onPress={() => handleCheck(idx)}
                  style={[styles.checkBox, plan.status && styles.checkedBox]}
                >
                  {plan.status ? (
                    <Ionicons name="checkmark" size={20} color="white" />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.accordionHeader}
                  onPress={() => toggleOpen(idx)}
                >
                  <Text style={styles.accordionTitle}>{plan.judulTask}</Text>
                  {openAccordionId === idx ? (
                    <ChevronUp size={20} color="#2F4858" /> // Ikon ChevronUp saat accordion terbuka
                  ) : (
                    <ChevronDown size={20} color="#2F4858" /> // Ikon ChevronDown saat accordion tertutup
                  )}
                </TouchableOpacity>
                {openAccordionId === idx && (
                  <View>
                    <FlatList
                      data={plan.taskList}
                      renderItem={(item) =>
                        renderTask({ item: item.item, planId: idx })
                      }
                      keyExtractor={(task, idx) => idx}
                      style={styles.taskList}
                    />
                    <TouchableOpacity
                      onPress={() => handleEditPlan(data._id)}
                      style={styles.editButton}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Card>
          ))}
          <TouchableOpacity
            onPress={() => handleDeletePlan(data?.chapterId)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete Study Plan</Text>
          </TouchableOpacity>
        </View>
      </Stack>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  body: {
    flex: 1,
  },
  accordionSection: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
  },
  accordionItem: {
    marginBottom: 10,
    // flexDirection: "row",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6AE2D",
    padding: 10,
    borderRadius: 6,
  },
  accordionTitle: {
    fontSize: 16,
    color: "#2F4858", // Warna judul accordion
  },
  checkBox: {
    width: 24, // Lebar kotak checklist
    height: 24, // Tinggi kotak checklist
    borderWidth: 1, // Ketebalan border kotak
    borderColor: "#B95623", // Warna border kotak
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 4, // Jari-jari border kotak
    justifyContent: "center", // Menyelaraskan ikon centang di tengah kotak
    alignItems: "center", // Menyelaraskan ikon centang di tengah kotak
  },
  checkedBox: {
    backgroundColor: "#B95623", // Warna latar belakang kotak saat dicentang
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  taskText: {
    fontSize: 16,
    color: "#2F4858",
    flex: 1,
  },
  checkedTaskText: {
    textDecorationLine: "line-through", // Mencoret teks
  },
  editButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#38A0ED",
    borderRadius: 6,
    justifyContent: "center",
    height: 30,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  deleteButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 6,
    justifyContent: "center",
    height: 30,
    marginTop: 10,
    alignSelf: "flex-end",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default StudyPlanScreen;
