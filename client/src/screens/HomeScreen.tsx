import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, Layout } from '@ui-kitten/components';
import {BottomTab} from '../components/navigations/BottomTab'

const HomeScreen = ({navigation}) => {

  const navigateLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const navigateJoin = () => {
    navigation.navigate('JoinScreen')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.logo} category='h1'>PUPFIT</Text>
        <Text category='s1'>반려견 스마트 헬스케어</Text>
      </Layout>
      <Layout style={{ flex: 1, flexDirection: 'row', flexWrap: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={styles.button} size="large" status="warning" onPress={navigateLogin}>로그인</Button>
        <Button style={styles.button} size="large" status="danger" onPress={navigateJoin}>회원가입</Button>
        <Button style={styles.button} size="large" status="primary" onPress={navigateJoin}>기기등록</Button>
        <Button style={styles.button} size="large" status="success" onPress={navigateJoin}>강아지등록</Button>
      </Layout>
      <BottomTab />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    margin: 10
  },
  logo: {
    margin: 5,
    letterSpacing: 10,
    fontSize: 50
  }
});

export default HomeScreen