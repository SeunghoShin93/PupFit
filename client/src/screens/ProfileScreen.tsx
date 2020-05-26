import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text
} from "react-native"
import {BottomTab} from '../components/navigations/BottomTab'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

interface ProfileProps {
  navigation: {
    navigate: Function
  }

}

const ProfileScreen: React.FC<ProfileProps> = (props) => {

  React.useEffect(() => {
    console.log("프로필 스크린 렌더링 완료!")
  })


  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text>HAPPY DOG PROFILE</Text>
        <Text>와우 정말 행복한 홍시네요</Text>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({

})

export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(ProfileScreen)
