import {
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
  
  export default function EditChapterScreen({ navigation }) {
    const [title, setTitle] = React.useState("");
    const [summary, setSummary] = React.useState("");
    const [chapter, setChapter] = React.useState("");
    return (
      <>
        <View style={{ flex: 1, alignItems: "center", height, width }}>
          <StatusBar />
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 17 }}>Edit Bab</Text>
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
            <View style={{ marginTop: 20, gap: 10 }}>
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
            <TouchableOpacity style={styles.saveBtn}>
                <Text style={{ color: "white" }}>Simpan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn}>
                <Text style={{ color: "white" }}>Hapus</Text>
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
    saveBtn: {
      width: width * 0.95,
      backgroundColor: "#2F4858",
      padding: 10,
      borderRadius: 15,
      alignItems: "center",
      alignSelf: "center",
      paddingTop: 10,
    },
    deleteBtn: {
        width: width * 0.95,
        backgroundColor: "#F26419",
        padding: 10,
        borderRadius: 15,
        alignItems: "center",
        alignSelf: "center",
        paddingTop: 10,
        marginTop: 10,
        marginBottom: 40,
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
  