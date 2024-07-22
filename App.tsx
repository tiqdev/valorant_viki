import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import store from "./src/stores";
import AgentsScreen from "./src/screens/Agents";
import AgentDetailScreen from "./src/screens/AgentDetail";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export type RootStackParamList = {
  Agents: undefined;
  AgentDetail: { agentId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

// Fontları yüklemek için gerekli işlev
const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "montserrat-black": require("./assets/fonts/Montserrat-Black.ttf"),
  });
};

const App: React.FC = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontLoaded(true);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null; // Burada bir placeholder ya da splash ekranı gösterebilirsiniz
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Agents">
          <Stack.Screen
            name="Agents"
            component={AgentsScreen}
            options={{ title: "Agents List" }}
          />
          <Stack.Screen
            name="AgentDetail"
            component={AgentDetailScreen}
            options={{ title: "Agent Details" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
