// App.js
import * as React from "react";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import AbsensiScreen from "./screens/AbsensiScreen";
import SubjectListScreen from "./screens/SubjectsList";

const Stack = createNativeStackNavigator();
export const OnboardContext = React.createContext(null);

function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  React.useEffect(() => {
    async function checkOnboard() {
      const onboard = await SecureStore.getItemAsync("userOnboarded");
      if (onboard) setIsAppFirstLaunched(true);
    }
    checkOnboard();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <OnboardContext.Provider value={{ setIsAppFirstLaunched }}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAppFirstLaunched ? (
              <>
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Absensi" component={AbsensiScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MataPelajaran" component={SubjectListScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </OnboardContext.Provider>
    </TamaguiProvider>
  );
}

export default App;