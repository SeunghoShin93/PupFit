import React from "react"
import * as eva from "@eva-design/eva"
import HomeScreen from "./src/screens/HomeScreen"
import LoginScreen from "./src/screens/LoginScreen"
import JoinScreen from "./src/screens/JoinScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import MapScreen from "./src/screens/MapScreen"
import WalkScreen from "./src/screens/WalkScreen"
import WalkModeScreen from "./src/screens/WalkModeScreen"
import HistoryScreen from "./src/screens/HistoryScreen"
import WalkHistoryScreen from "./src/screens/WalkHistoryScreen"
import DogInfoScreen from "./src/screens/DogInfoScreen"
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

const { Navigator, Screen } = createBottomTabNavigator()

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="오늘의 상태" />
    <BottomNavigationTab title="산책" />
    <BottomNavigationTab title="산책2" />
    <BottomNavigationTab title="프로필" />
    <BottomNavigationTab title="지난 기록" />
    <BottomNavigationTab title="정보 입력" />
  </BottomNavigation>
)

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>

    <Screen name="HomeScreen" component={HomeScreen} />
    <Screen name="MapScreen" component={MapScreen} />
    <Screen name="WalkScreen" component={WalkScreen} />
    <Screen name="ProfileScreen" component={ProfileScreen} />
    <Screen name="HistoryScreen" component={HistoryScreen} />
    <Screen name="DogInfoScreen" component={DogInfoScreen} />
    <Screen name="LoginScreen" component={LoginScreen} />
    <Screen name="JoinScreen" component={JoinScreen} />
    <Screen name="WalkModeScreen" component={WalkModeScreen} />
    <Screen name="WalkHistoryScreen" component={WalkHistoryScreen} />
    
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
)

function App() {
  const store = configureStore()
  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={myTheme}>
          <AppNavigator />
        </ApplicationProvider>
      </Provider>
    </>
  )
}

export default App
