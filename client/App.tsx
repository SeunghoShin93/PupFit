import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>PUPFIT</Text>
      <View style={styles.loginbtn}>
        <Button
          onPress={() => {
            alert("로그인 하고 싶군요!!");
          }}
          title="로그인"
          color="#000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "royalblue",
    alignItems: "center",
    justifyContent: "center",
  },
  quote: {
    fontSize: 80,
    color: "#fff",
    letterSpacing: 14
  },
  loginbtn: {
    borderColor: '#fff',
    borderWidth: 5,
    backgroundColor: '#fff'
  }
});
