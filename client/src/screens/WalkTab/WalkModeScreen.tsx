import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Button, Text, Layout, } from "@ui-kitten/components"
import { TopBasic } from "../../components/navigations/TopBasic";
import axios from 'axios';
import GlobalStyles from '../GlobalStyles'


interface WalkModeProps {
  navigation: {
    navigate: Function
  }
}

const WalkModeScreen: React.FC<WalkModeProps> = (props) => {
  const [walkMode, setWalkMode] = React.useState(false);
  const [big, setBig] = React.useState(0);
  const [small, setSmall] = React.useState(0);
  const [startTime, setStartTime] = React.useState('');
  const [s, setS] = React.useState(new Date());

  
  const onPressWalkModeHandler = () => {
    let current_datetime = new Date();
    setS(current_datetime);
    let formatted_date = current_datetime.getHours() + "시 " + current_datetime.getMinutes() + "분 " + current_datetime.getSeconds() + "초";
    
    setStartTime(formatted_date);
    setTimeout(() => {setWalkMode(true)}, 500);
  };

  const addBigHandler = () => {
    setBig(big+1);
  };

  const addSmallHandler = () => {
    setSmall(small+1);
  };

  const Shit = (props) => {
    if (!props.walkMode){
        return null
    }
    return (
      <>
        <Layout style={styles.topbar}>
          <Layout style={{flex: 1, flexDirection: 'row'}}>
          <Button onPress={addSmallHandler} status='warning' style={styles.button}>
            쉬 {small}
          </Button>
          <Button onPress={addBigHandler} status='danger' style={styles.button}>
            응아 {big}
          </Button>
          </Layout>
          <Layout >
            <Text> {'\n'} 시작 시간 : {startTime} </Text>
          </Layout>
        </Layout>
      </>
    )
  };
  const GpsInfo = (props) => {
    if (props.walkMode){
        return null
    }
    return (
      <>
        <Layout style={{ marginTop: 30}}>
          <Text style={{ textAlign: 'center'}}> 정확한 위치 측정을 위해 {'\n'}바깥에서 시작 버튼을 눌러주세요!</Text>
        </Layout>
      </>
    )
  };

  const finishAlert = () =>
    Alert.alert(
      "산책 종료",
       '고생하셨습니다!',
      [
        {
          text: "확 인",
          onPress: () => props.navigation.navigate("HomeScreen"),
        },
        // { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const Finisher = (props) => {
    if (!props.walkMode) {
      return null
    }
    return (
      <>
        <Button onPress={walkModeFinish} status='info' size='giant' style={{ 
          marginBottom: 20,
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          shadowOffset: {width: 5, height: 2},
          marginLeft: 4,
          marginRight: 4,
          }}>
          산책 종료
        </Button>
        <Button onPress={walkModeCancel} status='basic' size='medium' style={{ 
          marginBottom: 50,
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          shadowOffset: {width: 5, height: 2},
          marginLeft: 4,
          marginRight: 4,
          }}>
          산책 모드 취소
        </Button>
      </>
    )
  };

  const axios = require('axios');

  const tConvert = (n) => {
    return n < 10 ? '0' + n : n
  };

  const walkDataPost = () => {

    const time = s.getFullYear().toString() + '-' + tConvert(s.getMonth() + 1) + '-' + tConvert( s.getDate()) + ' ' + tConvert( s.getHours() ) + ':' + tConvert( s.getMinutes() ) + ':' + tConvert( s.getSeconds() );
    setStartTime(time)
    const data = {
      starttime: time,
      small: small,
      big: big,
    }
      
    axios.post('http://k02b2011.p.ssafy.io:8000/health/1/walking/', 
      data)
    .then((res) => 
      console.log(res))
    
    .catch((e) => 
      console.log(e))
  }

  // 산책 종료 : 모든 값 초기화 및 데이터 전송
  const walkModeFinish = () => {
    walkDataPost();
    setTimeout(()=> {finishAlert()}, 1000);
    setTimeout(()=>  {
    neutralizer() }, 2000); 
    }

    // 초기화
    const neutralizer = () => {
      setBig(0);
      setSmall(0);
      setStartTime('');
      setWalkMode(false);
    }
    
  // 산책 취소
  const walkModeCancel = () => {
    setWalkMode(false);
    neutralizer();
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <TopBasic screenName="산책 모드" />
      <Layout style={styles.container}>
        <Shit walkMode={walkMode} />
        <Layout style={styles.layout}>      
          <TouchableOpacity onPress={onPressWalkModeHandler}>
            <Layout style={styles.circle}>
              <Layout style={styles.circle3}>
              <Layout style={styles.circle2}>
                <Text style={styles.circleText}>
                {walkMode ? '산책 중' : '산책 시작'}
                </Text>
              </Layout>
              </Layout>
            </Layout>
          </TouchableOpacity>
          <Layout>
            <GpsInfo walkMode={walkMode} />
            <Finisher walkMode={walkMode} />
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
  },
  layout: {
      flex: 8,
      justifyContent: 'center',
      alignItems: 'center',
  },
  topbar: {
      flex: 1.5,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 30
  },
  circle: {
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    shadowOffset: {width: 10, height: 5},
    // borderWidth: 5, 
    borderRadius: 120,
    // borderColor: '#13a0f2',
    // backgroundColor: '#5ec87e',
    backgroundColor: '#53b56c',
    width: 219, 
    height: 219, 
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
    lineHeight: 222,
    alignItems: 'center',
    textAlign: 'center',
  },
  circle2: {
    shadowOffset: {width: 10, height: 5},
    backgroundColor: '#5ec87e',
    // borderWidth: 5, 
    borderRadius: 100,
    // borderColor: '#13a0f2',
    width: 200, 
    height: 200, 
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 200,
    fontSize: 35,
    // marginTop: 18,
    color: '#0c65ad',
    fontWeight: "bold",
    
  },
  circleText: {
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 197,
    fontSize: 35,
    color: 'white',
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10
    
  },
  circle3: {
    backgroundColor: '#72d399',
    borderRadius: 130,
    width: 209, 
    height: 209, 
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 210,
  },
  button: {
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    shadowOffset: {width: 5, height: 2},
    marginLeft: 4,
    marginRight: 4,
  }
})

export default WalkModeScreen