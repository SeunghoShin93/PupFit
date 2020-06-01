
import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, Dimensions, Alert } from "react-native"
import { Button, Text, Layout } from "@ui-kitten/components"
import * as Location from "expo-location"
import MapView, {Marker} from "react-native-maps"

const HistoryScreen = ({ navigation }) => {
  useEffect(() => {

  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>지난 이력</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})

export default HistoryScreen
