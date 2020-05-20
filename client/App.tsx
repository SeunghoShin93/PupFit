import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import JoinScreen from "./src/screens/JoinScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { myTheme } from "./src/lib/theme"
import { EvaIconsPack } from '@ui-kitten/eva-icons';


const { Navigator, Screen } = createStackNavigator();
function App() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={myTheme}>
      <NavigationContainer>
        <Navigator headerMode="none">
          <Screen name="Pupfit Homescreen" component={HomeScreen} />
          <Screen name="LoginScreen" component={LoginScreen} />
          <Screen name="JoinScreen" component={JoinScreen} />
        </Navigator>
      </NavigationContainer>
    </ApplicationProvider>
    </>
  );
}

export default App;
