import React from "react"
import * as eva from "@eva-design/eva"
import HomeScreen from "./src/screens/HomeScreen"
import LoginScreen from "./src/screens/LoginScreen"
import JoinScreen from "./src/screens/JoinScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components"
import { myTheme } from "./src/lib/theme"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { Provider } from "react-redux"
import configureStore from "./src/redux/configureStore"
import { BottomTab } from "./src/components/navigations/BottomTab"

const { Navigator, Screen } = createBottomTabNavigator();

function App() {
  const store = configureStore()
  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={myTheme}>
          <NavigationContainer>
            <Navigator headerMode="none">
              <Screen name="HomeScreen" component={HomeScreen} />
              <Screen name="LoginScreen" component={LoginScreen} />
              <Screen name="JoinScreen" component={JoinScreen} />
              <Screen name="ProfileScreen" component={ProfileScreen} />
            </Navigator>
            <BottomTab />
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  )
}

export default App
