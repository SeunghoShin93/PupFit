import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  Image
} from "react-native"
import {
  Text,
  Layout,
  Input,
} from "@ui-kitten/components"
import {BottomTab} from '../components/navigations/BottomTab'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Icon, Button } from 'react-native-elements'

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
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{
          height: 29
        }}
      >
      </Layout>
      <Layout
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 30,
          backgroundColor: "#EAF1F3"
        }}
      >
        <Text>프로필 사진 등록 및 변경</Text>
      </Layout>
      <Layout
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            
          }}
        >
          <Input
            label="이름"
            placeholder="아이의 이름을 입력해주세요"
          />
        </Layout>
      <Layout
        style={{
          flex: 2,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Layout
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#E89586"
          }}
        >
          <Layout
            style={{
              flex: 1,
              backgroundColor: "#E89586"
            }}
          >
            <Input
              label="나이"
              placeholder="아이의 나이를 입력해주세요"
            />
          </Layout>
          <Layout
            style={{
              flex: 1,
              backgroundColor: "#E89586"
            }}
          >
            <Input
              label="견종"
              placeholder="아이의 견종을 입력해주세요"
            />
          </Layout>
          <Layout
            style={{
              flex: 1,
              backgroundColor: "#E89586"
            }}
          >
            <Input
              label="체고"
              placeholder="아이의 체고를 입력해주세요"
            />
          </Layout>
        </Layout>
        <Layout
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#CCDBF0"
          }}
        >
          <Layout
            style={{
              width: "100%",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#A9C2C1",
            }}
          >
            <Text>성별</Text>
            <Button icon={<Icon name='venus' type="font-awesome-5"/>} />
            <Button icon={<Icon name='mars' type="font-awesome-5"/>} />
          </Layout>
          <Layout
            style={{
              flex: 1,
              backgroundColor: "#A9C2C1",
            }}
          >
            <Button title="중성화" />
          </Layout>
          <Layout
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#A9C2C1",
            }}
          >
            <Button title="임신했어요" />
          </Layout>
        </Layout>
      </Layout>
      <Layout
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Layout
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Input
            label="현재 체중"
            placeholder="현재 체중을 입력해주세요"
          />
        </Layout>
        <Layout
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Input
            label="목표 체중"
            placeholder="목표 체중을 입력해주세요"
          />
        </Layout>
      </Layout>
      <Layout
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Input
          label="하루 간식 양"
          placeholder="하루에 간식을 몇 개씩 줄까요?"
        />
      </Layout>
      <Layout
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Text>사료</Text>
      </Layout>
    </SafeAreaView>
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
