import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"

export default function QRCode() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
		const reg = /^\d+$/;
    setScanned(true)
		AsyncStorage.setItem('deviceId', String(reg.test(data)))
  }

  if (hasPermission === null) {
    return <Text>퍼핏에게 카메라 권한을 주세요.</Text>
  }
  if (hasPermission === false) {
    return <Text>카메라에 대한 접근 권한이 없습니다.</Text>
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
				justifyContent: "flex-end",
				height: '90%'
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"탭하여 다시 인식"} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}
