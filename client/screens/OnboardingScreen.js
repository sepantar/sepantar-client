import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { OnboardContext } from "../App";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const COLORS = { primary: "#fff", yellow: "#F6AE2D" };

const onboardingSlides = [
  {
    id: "1",
    image: require("../assets/onboarding1.png"),
    title: "Sepantar itu apa sih?",
    subtitle:
      "Sepantar adalah aplikasi yang bisa mempermudah kegiatan belajar kamu di sekolah.",
  },
  {
    id: "2",
    image: require("../assets/onboarding2.png"),
    title: "Ngebantu?? Gimana caranya?",
    subtitle:
      "Sepantar punya fitur untuk membuatkan rencara belajar untuk materi yang diberikan oleh gurumu supaya kamu bisa belajar mandiri secara efektif di rumah.",
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation()
  const { setIsAppFirstLaunched } = React.useContext(OnboardContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const Slide = ({ item }) => {
    return (
      <View style={{ flex: 1, alignItems: "center", height, width }}>
        <Image
          source={item.image}
          style={{ width: "100%", resizeMode: "contain" }}
        />

        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    );
  };
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.2,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            // marginTop: 0,
          }}
        >
          {onboardingSlides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlide == index && {
                  backgroundColor: "#F6AE2D",
                  width: 25,
                },
              ]}
            />
          ))}
        </View>
        {currentSlide === onboardingSlides.length - 1 ? (
          <View style={{ flex: 1, marginTop: 10 }}>
            <TouchableOpacity style={[styles.btn]} onPress={handleOnboard}>
              <Text style={{ color: "white" }}>Ih Keren, Yuk Mulai!</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, marginTop: 10 }}>
            <TouchableOpacity style={[styles.btn]} onPress={goNextSlide}>
              <Text style={{ color: "white" }}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlide + 1;
    if (nextSlideIndex != onboardingSlides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlide(nextSlideIndex);
    }
  };
  const updateCurrentSlide = (e) => {
    const constantOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(constantOffsetX / width);
    setCurrentSlide(currentIndex);
  };
  const handleOnboard = async () => {
    await SecureStore.setItemAsync("userOnboarded", "true");
    setIsAppFirstLaunched(false);
    navigation.replace("Home");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlide}
        pagingEnabled
        data={onboardingSlides}
        contentContainerStyle={{ height: height * 0.8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={(item) => item.id}
        // style={{width: width}}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#2F4858",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    color: "#2F4858",
    fontSize: 15,
    marginTop: 15,
    maxWidth: "79%",
    textAlign: "center",
    lineHeight: 20,
  },
  indicator: {
    height: 5,
    width: 10,
    backgroundColor: "#FEDC9F",
    marginHorizontal: 3,
    borderRadius: 2,
  },
  btn: {
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#2F4858",
    justifyContent: "center",
    alignItems: "center",
  },
  skip: {
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnboardingScreen;
