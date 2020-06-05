import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Button, Text, Layout, } from "@ui-kitten/components"
import { TopBasic } from "../components/navigations/TopBasic";
import axios from 'axios';

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
  const [endTime, setEndTime] = React.useState('');
  const [s, setS] = React.useState(new Date());
  const [e, setE] = React.useState(new Date());



  const onPressWalkModeHandler = () => {
    // setEndTime(new Date());
    let current_datetime = new Date();
    setS(current_datetime);
    let formatted_date = current_datetime.getHours() + "시" + current_datetime.getMinutes() + "분" + current_datetime.getSeconds() + "초";
    setStartTime(formatted_date);
    setTimeout(() => {setWalkMode(true)}, 500);
  };

  const addBigHandler = () => {
    setBig(big+1);
  };

  const addSmallHandler = () => {
    setSmall(small+1);
  };

  // const pulseIconRef = React.useRef();
    
  // React.useEffect(() => {
  //   pulseIconRef.current.startAnimation();
  // }, []);

  // const renderPulseIcon = (props) => (
  //   <Icon
  //     {...props}
  //     ref={pulseIconRef}
  //     animationConfig={{ cycles: Infinity }}
  //     animation='zoom'
  //     name='activity'
  //   />
  // );

  const Shit = (props) => {
    if (!props.walkMode){
        return null
    }
    return (
      <>
        <Layout style={styles.topbar}>
          <Layout style={{flex: 1, flexDirection: 'row'}}>
          <Button onPress={addSmallHandler} status='warning'>
            쉬 {small}
          </Button>
          <Button onPress={addBigHandler} status='danger'>
            응아 {big}
          </Button>
          </Layout>
          <Layout >
            <Text> {'\n'} 시작 시간 : {startTime}</Text>
          </Layout>
        </Layout>
      </>
    )
  };

  const finishAlert = () =>
    Alert.alert(
      "산책 종료",
       '종료: ' + endTime,
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
        <Button onPress={walkModeFinish} status='info' size='giant' style={{ marginBottom: 20}}>
          산책 종료
        </Button>
        <Button onPress={walkModeCancel} status='basic' size='medium' style={{ marginBottom: 50}}>
          산책 모드 취소
        </Button>
      </>
    )
  };
  const setEnd = () => {
    const current_datetime2 = new Date();
    setE(current_datetime2);
    const formatted_date2 = current_datetime2.getHours() + "시" + current_datetime2.getMinutes() + "분" + current_datetime2.getSeconds() + "초";
    setEndTime(formatted_date2);
  }
  const axios = require('axios');

  const walkDataPost = () => {
    const data = {
      starttime: "2020-06-05 22:20:20",
      big: big,
      small: small
    }
    
      axios.post('http://192.168.35.197:8000/health/1/walking/', {
        params: {
        starttime: "2020-06-05 22:20:20",
        big: big,
        small: small
      }
      
    }).then((res) => alert(res)).catch((e) => alert(e))
    
    
    // .then((res) => {
    //   alert(res)
    // })
    // .catch(e => {
    //   alert(e);
    //   alert( new Date().toLocaleString())
    // })

  }

  // 산책 종료 : 모든 값 초기화 및 데이터 전송
  const walkModeFinish = () => {
    setEnd();
    // setTimeout(()=> {}, 1500);
    setTimeout(()=> {finishAlert()}, 1500);
    setTimeout(()=>  {
    neutralizer() }, 2000); 
    walkDataPost()
       
    }

  
    // 초기화
    const neutralizer = () => {
      setBig(0);
      setSmall(0);
      setStartTime('');
      setEndTime('');
      setWalkMode(false);
    }
    
  // 산책 취소
  const walkModeCancel = () => {
    setWalkMode(false);
    neutralizer();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBasic screenName="산책 모드" />
      <Layout style={styles.container}>
        <Shit walkMode={walkMode} />
        <Layout style={styles.layout}>
          {/* <Button
            appearance='ghost'
            status='danger'
            size='giant'
            accessoryLeft={renderPulseIcon}
          /> */}
              
          <TouchableOpacity onPress={onPressWalkModeHandler}>
            <Text style={styles.circle}>
              {walkMode ? '산책 중' : '산책 시작'}
            </Text>
        {/* <Spinner style={styles.spinner} size='large'/> */}
          </TouchableOpacity>
          <Layout>
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
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: 20,
      marginBottom: 30
  },
  icon: {
    width: 32,
    height: 32,
  },
  circle: {
    borderWidth: 5, 
    borderRadius: 120,
    borderColor: '#666699',
    width: 250, 
    height: 250, 
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 250,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  spinner: {
    alignItems: 'center',
    textAlign: 'center',
  }
})

export default WalkModeScreen