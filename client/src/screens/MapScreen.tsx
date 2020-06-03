import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, Dimensions, Alert } from "react-native"
import { Button, Text, Layout } from "@ui-kitten/components"
import * as Location from "expo-location"
import MapView, {Marker} from "react-native-maps"

const MapScreen = ({  }) => {
  const [userMarker, setUserMarker] = useState(null)
  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync()
      const location = await Location.getCurrentPositionAsync()
      console.log(location.coords.latitude, location.coords.longitude)
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
          latitude: 36.348310901195,
          longitude: 127.29743274887,
          latitudeDelta: 0.0045,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{latitude:36.348310901195,longitude:127.29743274887}}
          title={'현재위치'}
          description={'사용자의 현재 위치입니다.'}
          onPress={() => console.log('haha')}
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
