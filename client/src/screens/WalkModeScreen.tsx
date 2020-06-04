import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { Button, Text, Layout, Spinner, Icon } from "@ui-kitten/components"
import { TopBasic } from "../components/navigations/TopBasic";

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

  const onPressWalkModeHandler = () => {
    setWalkMode(true);
    let current_datetime = new Date();
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds() ;
    setStartTime(formatted_date)
  };

  const addBigHandler = () => {
    setBig(big+1);
  };

  const addSmallHandler = () => {
    setSmall(small+1);
  };

  const pulseIconRef = React.useRef();
    
  React.useEffect(() => {
    pulseIconRef.current.startAnimation();
  }, []);

  const renderPulseIcon = (props) => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='zoom'
      name='activity'
    />
  );

  const Shit = (props) => {
    if (!props.walkMode){
        return null
    }
    return (
      <>
        <Layout style={styles.topbar}>
          <Button onPress={addSmallHandler} status='warning'>
            쉬 {small}
          </Button>
          <Button onPress={addBigHandler} status='danger'>
            응아 {big}
          </Button>
        </Layout>
      </>
    )
  };

  const finishAlert = () =>
    Alert.alert(
      "산책 종료",
      "고생하셨습니다!" + big + small + '시작: ' + startTime + '종료: ' + endTime,
      [
        {
          text: "확 인",
          onPress: () => console.log("walkMode Finished"),
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

  // 산책 종료 : 모든 값 초기화 및 데이터 전송
  const walkModeFinish = () => {
    let current_datetime = new Date()
    let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    setEndTime(formatted_date);
    setWalkMode(false);
    console.log('응아: ' + big);
    console.log('쉬: ' + small);
    setBig(0);
    setSmall(0);
    props.navigation.navigate("HomeScreen");
    finishAlert()
  };

  // 산책 취소
  const walkModeCancel = () => {
    setWalkMode(false);
    setBig(0);
    setSmall(0);
  };

  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBasic screenName="산책 모드" />
      <Layout style={styles.container}>
        <Shit walkMode={walkMode} />
        <Layout style={styles.layout}>
          <Button
            appearance='ghost'
            status='danger'
            size='giant'
            accessoryLeft={renderPulseIcon}
          />
              
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
      flex: 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
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
