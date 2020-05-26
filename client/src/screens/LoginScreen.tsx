import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../redux/modules/auth"
import * as userActions from "../redux/modules/user"
import { Button, Text, Layout, Input, Icon } from "@ui-kitten/components"
import { TopBasic } from "../components/navigations/TopBasic"
import { Map } from "immutable"

interface LoginProps {
  navigation: {
    navigate: Function
  }
  form: {
    email: string
    password: string
  }
  error: string
  result: Object
  AuthActions: any
  UserActions: any
}

const LoginScreen: React.FC<LoginProps> = (props) => {
  const { email, password } = props.form
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)
  const handleChange = (value: string, name: string) => {
    const { AuthActions } = props
    AuthActions.changeInput({
      name,
      value,
      form: "login",
    })
  }
  React.useEffect(() => {
    console.log("로그인 스크린 렌더링 완료!")
  })
  const navigateLogin = () => {}
  const AlertIcon = (props: any) => {
    console.log(props)
    return <Icon {...props} name="alert-circle-outline" />
  }
  const navigateJoin = () => {
    props.navigation.navigate("JoinScreen")
  }
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry)
  }
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  )

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBasic
          navigation={props.navigation}
          prevScreenName="홈으로 돌아가기"
        />
        <Layout style={styles.loginHeader}>
          <Text style={styles.logo} category="h1">
            LOGIN HEADER
          </Text>
        </Layout>
        <Layout style={styles.columnFlex}>
          <Input
            onChangeText={(value) => handleChange(value, "email")}
            caption="이메일 주소를 입력해주세요."
            label="로그인 정보 입력"
            placeholder="puppy@pupfit.com"
            captionIcon={AlertIcon}
            value={email}
            style={{ margin: 20, marginBottom: 0 }}
          />
          <Input
            onChangeText={(value) => handleChange(value, "password")}
            caption="비밀번호를 입력해주세요.(6자리 이상)"
            placeholder="******"
            captionIcon={AlertIcon}
            value={password}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            style={{ margin: 20 }}
          />
        </Layout>
        <Layout
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={styles.loginBtn}
            size="large"
            status="warning"
            onPress={navigateLogin}
          >
            로그인
          </Button>
          <Button
            style={styles.loginBtn}
            size="large"
            status="danger"
            onPress={navigateLogin}
          >
            테스트
          </Button>
          <SafeAreaView style={styles.container}>
            <Text>퍼핏이 처음이라면?</Text>
            <Button
              style={styles.goJoin}
              size="large"
              status="success"
              onPress={navigateJoin}
              appearance="ghost"
            >
              회원가입
            </Button>
          </SafeAreaView>
        </Layout>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "right",
    justifyContent: "flex-end",
    width: 420,
  },
  goJoin: {
    margin: 10,
  },
  loginBtn: {
    width: "90%",
  },
  logo: {
    margin: 5,
    letterSpacing: 10,
    fontSize: 70,
  },
  columnFlex: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginHeader: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
  },
})
export default connect(
  (state) => ({
    form: state.auth.getIn(["login", "form"]),
    error: state.auth.getIn(["login", "error"]),
    result: state.auth.get("result"),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(LoginScreen)
