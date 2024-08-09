// App.js
import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import * as SecureStore from "expo-secure-store";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
export const OnboardContext = React.createContext(null);

function App() {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);
  React.useEffect(() => {
    async function checkOnboard() {
      const onboard = await SecureStore.getItemAsync("userOnboarded");
      if (onboard) setIsAppFirstLaunched(true);
    }
    checkOnboard();
  }, []);
  return (
    <OnboardContext.Provider value={{ setIsAppFirstLaunched }}>
      <NavigationContainer >
        <StatusBar style="auto" />
        {isAppFirstLaunched? (<Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>) : (<Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>)}
      </NavigationContainer>
    </OnboardContext.Provider>
  );
}

export default App;
