// App.js
import * as React from "react";
import { TamaguiProvider } from "tamagui";
import config from "./tamagui.config";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import * as SecureStore from "expo-secure-store";
import { useFonts } from "expo-font";
import OnboardingNavigator from "./screens/OnboardingStudentNavigator";
import StudentHome from "./screens/StudentNavigator";
import TeacherNavigator from "./screens/TeacherNavigator";

const Stack = createNativeStackNavigator();
export const OnboardContext = React.createContext(null);
export const SignedInContext = React.createContext(null);
export const RoleContext = React.createContext(null);

function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(true);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  React.useEffect(() => {
    async function checkLogin() {
      const token = await SecureStore.getItemAsync("accessToken");
      if (token) setIsSignedIn(true);
    }
    async function checkRole() {
      const role = await SecureStore.getItemAsync("role");
      setRole(role);
    }
    async function checkOnboard() {
      const onboard = await SecureStore.getItemAsync("userOnboarded");
      if (onboard) setIsAppFirstLaunched(false);
    }
    checkLogin();
    checkRole();
    checkOnboard();
  }, []);
  
  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config}>
      <SignedInContext.Provider value={{ setIsSignedIn }}>
        <RoleContext.Provider value={{ role, setRole }}>
          <OnboardContext.Provider
            value={{ isAppFirstLaunched, setIsAppFirstLaunched }}
          >
            <NavigationContainer>
              <StatusBar style="auto" />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isSignedIn ? (
                  <Stack.Screen name="Login" component={LoginScreen} />
                ) : role === "student" ? (
                  isAppFirstLaunched ? (
                    <Stack.Screen
                      name="Onboard"
                      component={OnboardingNavigator}
                    />
                  ) : (
                    <Stack.Screen name="StudentHome" component={StudentHome} />
                  )
                ) : (
                  <Stack.Screen
                    name="TeacherHome"
                    component={TeacherNavigator}
                  />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </OnboardContext.Provider>
        </RoleContext.Provider>
      </SignedInContext.Provider>
    </TamaguiProvider>
  );
}

export default App;
