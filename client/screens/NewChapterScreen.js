import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { height, width } from "./AbsensiScreen";
import { ArrowLeft } from "lucide-react-native";
import * as React from "react";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";

export default function NewChapterScreen({ route }) {
  const navigation = useNavigation();
  const [title, setTitle] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [chapter, setChapter] = React.useState("");
  const [selectedDocuments, setSelectedDocuments] = React.useState([]);

  // const handleAddDocument = async () => {
  //   try {
  //     const token = await SecureStore.getItemAsync("accessToken");
  //     console.log(token, 'tokeeeeen');

  //     const res = await DocumentPicker.getDocumentAsync({
  //       type: "*/*",
  //       copyToCacheDirectory: false
  //     });
  //     console.log(res, 'documentpicker');

  //     if (res.canceled === false) {
  //       let data = new FormData();
  //       console.log(data, 'init');

  //       data.append(
  //         "file",
  //         {
  //           name: res?.assets[0]?.name,
  //           type: res?.assets[0]?.mimeType,
  //           size: res?.assets[0]?.size,
  //           uri: encodeURI(res?.assets[0]?.uri.replace("file://", "")),
  //         }
  //       );
  //       console.log(data, 'formdata');

  //       data.append("subjectId", route.params.subjectId.toString());
  //       console.log(data, 'formdata');

  //       const response = await fetch("http://13.239.38.113/api/subject/chapter", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: data
  //       });
  //       console.log(response, 'response');

  //       const res = await response.json();
  //       if (!res.ok) {
  //         throw response;
  //       }
  //       console.log(res, 'ressssssssssss');
  //     } else {
  //       throw new Error("User canceled document picking")
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleAddDocument = async () => {
    try {
      const token = await SecureStore.getItemAsync("accessToken");

      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: false,
      });

      if (res.canceled === false) {
        let data = new FormData();
        console.log(data, "init");

        data.append("file", {
          name: res.assets[0].name,
          type: res.assets[0].mimeType,
          uri: res.assets[0].uri,
        });

        data.append("subjectId", route.params.subjectId.toString());

        const response = await fetch(
          "http://147.185.221.22:1489/api/subject/chapter",
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: data,
          }
        );
        const resJson = await response.json();
        if (!response.ok) {
          console.error("Error response:", resJson);
          throw new Error(resJson.message || "Upload failed");
        }

        Alert.alert("Success", "Document uploaded successfully");
      } else {
        throw new Error("User canceled document picking");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "An error occurred while uploading the document");
    }
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: "center", height, width }}>
        <StatusBar />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="black" />
          </TouchableOpacity>
          <Text style={{ fontSize: 17 }}>Buat Bab Baru</Text>
        </View>
        <ScrollView style={{ flex: 1, width: width * 0.95, paddingTop: 10 }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Judul Bab</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={{
                width: width * 0.95,
                borderWidth: 0.5,
                borderColor: "#2F4858",
                borderRadius: 15,
                padding: 10,
                marginTop: 5,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={handleAddDocument}
            style={styles.uploadBtn}
          >
            <Text style={{ color: "white" }}>Unggah Materi Baru</Text>
          </TouchableOpacity>
          <View style={{ gap: 10 }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Rangkuman Materi
              </Text>
              <TextInput
                value={summary}
                onChangeText={setSummary}
                multiline={true}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Materi</Text>
              <TextInput
                value={chapter}
                onChangeText={setChapter}
                multiline={true}
                style={styles.textInput}
              />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Buat Quiz Baru
            </Text>
            <TouchableOpacity style={styles.quizBtn}>
              <Text style={{ color: "white" }}>Buat Quiz</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={{ color: "white" }}>Upload</Text>
          </TouchableOpacity>
        </ScrollView>
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
  uploadBtn: {
    width: width * 0.95,
    backgroundColor: "#F6AE2D",
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 10,
  },
  quizBtn: {
    width: width * 0.95,
    backgroundColor: "#F26419",
    padding: 10,
    borderRadius: 15,
    marginVertical: 20,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 10,
  },
  saveBtn: {
    width: width * 0.95,
    backgroundColor: "#2F4858",
    padding: 10,
    borderRadius: 15,
    marginBottom: 40,
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 10,
  },
  textInput: {
    width: width * 0.95,
    height: 200,
    borderWidth: 0.5,
    borderColor: "#2F4858",
    borderRadius: 15,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    textAlignVertical: "top",
  },
});
