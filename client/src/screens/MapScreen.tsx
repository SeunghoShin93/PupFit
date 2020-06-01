import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, Dimensions, Alert } from "react-native"
import { Button, Text, Layout } from "@ui-kitten/components"
import * as Location from "expo-location"
import MapView, {Marker} from "react-native-maps"

const MapScreen = ({ navigation }) => {
  const [userMarker, setUserMarker] = useState(null)
  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync()
      const location = await Location.getCurrentPositionAsync()
      console.log(location)
    } catch (error) {
      Alert.alert("현재 위치 정보를 가져올 수 없습니다.", "슬프네요.")
    }
  }
  useEffect(() => {
    getLocation()
    // 강아지 위치를 가져와서 MapView의 initialRegion으로 설정
    // 사용자 위치를 가져와서 마커로 지정
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Map</Text>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 34.8401954,
          longitude: 128.5062913,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{latitude:34.8401954,longitude:128.5062913}}
          title={'현재위치'}
          description={'사용자의 현재 위치입니다.'}
        />
      </MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})

export default MapScreen
