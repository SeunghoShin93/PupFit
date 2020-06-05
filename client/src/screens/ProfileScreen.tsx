import React from "react"
import { SafeAreaView, StyleSheet, Image, View } from "react-native"
import { Text, Layout, Input } from "@ui-kitten/components"
import { BottomTab } from "../components/navigations/BottomTab"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Icon, SearchBar } from "react-native-elements"

interface ProfileProps {
  navigation: {
    navigate: Function
  }
}

const ProfileScreen: React.FC<ProfileProps> = (props) => {
  // const {
  //   name, age, goal_weight, height, breed,
  //   gender, desexed, pregnant, snack_allowed, dog_food
  // } = props.form

  // const handleChange = (value: string, name: string) => {
  //   const { AuthActions } = props
  //   AuthActions.changeInput({
  //     name,
  //     value,
  //     form: "login",
  //   })
  // }

  React.useEffect(() => {
    console.log("프로필 스크린 렌더링 완료!")
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: 29,
        }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "green",
        }}
      />
      <View style={{ flex: 2, margin: 10 }}>
        <View
          style={{
            flex: 0.3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text category="h1" style={{ textAlignVertical: "bottom" }}>
            홍시
          </Text>
          <Text style={{ textAlignVertical: "bottom" }}>4살 여아</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              height: "80%",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Layout style={styles.button}>
                <Text>견종</Text>
                <Text>보더콜리</Text>
              </Layout>
              <Layout style={styles.button}>
                <Text>체고</Text>
                <Text>몰라요</Text>
              </Layout>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Layout style={styles.button}>
                <Text>중성화 완료</Text>
              </Layout>
              <Layout style={styles.button}>
                <Text>임신 안 했어요</Text>
              </Layout>
            </View>
          </View>
          <Text>체고를 입력하지 않으면</Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              marginLeft: 15,
              borderRightColor: "grey",
              borderRightWidth: 1,
              ...styles.weightButton,
            }}
          >
            <Text style={{}}>현재 체중</Text>
            <Text category="h1">26kg</Text>
          </View>
          <View
            style={{
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              marginRight: 15,
              ...styles.weightButton,
            }}
          >
            <Text>목표 체중</Text>
            <Text category="h1">20kg</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Layout style={styles.button}>
            <Text>하루 최대 간식 횟수</Text>
            <Text category="h1">6번</Text>
          </Layout>
          <Layout style={styles.button}>
            <Text>사료 종류</Text>
            <Text category="h1">어쩌구</Text>
          </Layout>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 10,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderColor: "black",
  },
  weightButton: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
})

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(ProfileScreen)
