import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, Layout, Input, Icon } from "@ui-kitten/components";
import { TopBasic } from "../components/navigations/TopBasic";

const JoinScreen = ({navigation}) => {
  const AlertIcon = (props: string) => (
    <Icon {...props} name="alert-circle-outline" />
  );

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props: string) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
      <TopBasic navigation={navigation} prevScreenName="로그인" />
        <Layout style={styles.loginHeader}>
          <Text style={styles.logo} category="h1">
            SIGNUP HEADER
          </Text>
        </Layout>
        <Layout style={styles.columnFlex}>
          <Input
            onChangeText={(email) => onChangeEmail(email)}
            caption="이메일 주소를 입력해주세요."
            label="로그인 정보 입력"
            placeholder="puppy@pupfit.com"
            captionIcon={AlertIcon}
            value={email}
            style={{ margin: 20, marginBottom: 0 }}
          />
          <Input
            onChangeText={(password) => onChangePassword(password)}
            caption="비밀번호를 입력해주세요.(6자리 이상)"
            placeholder="******"
            captionIcon={AlertIcon}
            value={password}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            style={{ margin: 20, marginBottom: 0 }}
          />
          <Input
            onChangeText={(password) => onChangePassword(password)}
            caption="비밀번호를 다시 입력해주세요."
            placeholder="******"
            captionIcon={AlertIcon}
            value={password}
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            style={{ margin: 20, marginBottom: 0 }}
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
            onPress={null}
          >
            회원가입
          </Button>
        </Layout>
      </SafeAreaView>
    </>
  );
};

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
});

export default JoinScreen;
