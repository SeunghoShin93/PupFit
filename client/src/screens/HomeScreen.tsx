import React from "react"
import { SafeAreaView, StyleSheet } from "react-native"
import { Button, Text, Layout } from "@ui-kitten/components"
import { LinearGradient } from "expo-linear-gradient"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { BottomTab } from "../components/navigations/BottomTab"

interface HomeProps {
  navigation: any
  today: string[]
}

const HomeScreen: React.FC<HomeProps> = (props) => {
  const navigateLogin = () => {
    props.navigation.navigate("LoginScreen")
  }

  const navigateJoin = () => {
    props.navigation.navigate("JoinScreen")
  }

  const navigateProfile = () => {
    props.navigation.navigate("ProfileScreen")
  }
  const { today } = props
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "55%",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#ace0f9", "#4CC2F7"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <Text style={styles.headertoday} category="h1">
          {today[0]}년 {today[1]}월 {today[2]}일
        </Text>
        <Text style={styles.logo} category="h1">
          홍시의 오늘
        </Text>
        <Text category="s1">반려견 스마트 헬스케어</Text>
      </Layout>
      <Layout>
        <Text>하이</Text>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    margin: 20,
    fontSize: 30,
    color: "#fff",
    alignSelf: "flex-start",
  },
  headertoday: {
    marginRight: 20,
    color: "#fff",
    alignSelf: "flex-end"
  }
})

export default connect(
  (state) => ({
    today: state.base.get("today"),
  }),
  (dispatch) => ({})
)(HomeScreen)
