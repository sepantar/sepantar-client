import { ArrowLeft, ChevronDown } from "lucide-react-native";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Accordion, Button, Paragraph, Square } from "tamagui";

export const { width, height } = Dimensions.get("window");

const accordionData = [
  {
    id: "1",
    title: "08.00 - 10.00 / Kelas 7-A",
    hadir: 8,
    izin: 6,
    alpa: 1,
  },
  {
    id: "2",
    title: "10.00 - 12.00 / Kelas 8-C",
    hadir: 8,
    izin: 6,
    alpa: 1,
  },
  {
    id: "3",
    title: "13.00 - 15.00 / Kelas 9-B",
    hadir: 8,
    izin: 6,
    alpa: 1,
  },
];

const AbsensiScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", height, width }}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <ArrowLeft color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Absensi</Text>
      <Button style={styles.button}>
        <Text style={{ color: "white" }}>Generate QR / Scan QR Code</Text>
      </Button>
      <View style={{ flex: 1, width: width * 0.9, paddingVertical: 30 }}>
        <Text style={{ fontSize: 19, fontWeight: "bold", color: "#2F4858" }}>
          Absensi Hari Ini
        </Text>
        <ScrollView style={styles.container}>
          <View
            style={{
              alignItems: "center",
              flex: 1,
              padding: 5
            }}
          >
            <Accordion style={{ flex: 1 }} type="multiple">
              {accordionData.map((el, idx) => {
                return (
                  <>
                    <Accordion.Item key={idx} value={el.id} >
                      <Accordion.Header>
                        <Accordion.Trigger
                          flexDirection="row"
                          justifyContent="space-between"
                          style={{ width: "100%", backgroundColor:'transparent' }}
                        >
                          {({ open }) => (
                            <>
                              <Paragraph>{el.title}</Paragraph>
                              <Square
                                animation="quick"
                                rotate={open ? "180deg" : "0deg"}
                              >
                                <ChevronDown color="#2F4858" />
                              </Square>
                            </>
                          )}
                        </Accordion.Trigger>
                      </Accordion.Header>
                      <Accordion.Content style={{ width: "100%", backgroundColor:'#EBEBEB', borderRadius: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={{flexDirection: "column", alignItems:'center'}}>
                        <Paragraph color="#01721A">Hadir</Paragraph>
                        <Paragraph>{el.hadir}</Paragraph>
                        </View>
                        <View style={{flexDirection: "column", alignItems:'center'}}>
                        <Paragraph color="#F6AE2D">Izin</Paragraph>
                        <Paragraph>{el.izin}</Paragraph>
                        </View>
                        <View style={{flexDirection: "column", alignItems:'center'}}>
                        <Paragraph color="#B95623">Alpha</Paragraph>
                        <Paragraph>{el.alpa}</Paragraph>
                        </View>
                        </View>
                      </Accordion.Content>
                    </Accordion.Item>
                  </>
                );
              })}
            </Accordion>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "#2F4858",
    width: "80%",
    height: 70,
    borderRadius: 20,
  },
  title: {
    fontSize: 30,
    alignItems: "center",
    fontWeight: "semibold",
    color: "#2F4858",
    padding: 15,
  },
  container: {
    borderWidth: 0.5,
    borderColor: "#2F4858",
    width: "100%",
    flex: 1,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
  },
});

export default AbsensiScreen;
