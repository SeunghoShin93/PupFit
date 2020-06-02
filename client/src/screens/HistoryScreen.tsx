
import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, Dimensions, Alert, Image, View } from "react-native"
import { Button, Text, Layout, TopNavigation, TopNavigationAction, Divider } from "@ui-kitten/components"
import * as Location from "expo-location"
import MapView, {Marker} from "react-native-maps"
import { Icon } from "react-native-elements"
import { LineChart, Grid, XAxis, YAxis } from "react-native-svg-charts"
import { Circle } from 'react-native-svg'
interface HistoryProps {
  navigation: any
}


const HistoryScreen = ({ navigation }) => {
  useEffect(() => {

  })
  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const data = [27.0, 27.0, 26.8, 26.4, 26.0, 25.8, 25.4]
  
  
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back'/>
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon}/>
  );

  const TopNavigationSimpleUsageShowcase = () => (
    <TopNavigation
      accessoryLeft={BackAction}
      title='홍시의 일주일'
      subtitle='일주일 동안의 변화 추이를 한 눈에 확인할 수 있습니다.'
    />
  );

  const contentInset = { top: 23, bottom: 23 }

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
        <Circle
            key={ index }
            cx={ x(index) }
            cy={ y(value) }
            r={ 4 }
            stroke={ '#13A0F2' }
            fill={ 'white' }
        />
    ))
}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ color: '#70D9FB' }}>
      <TopNavigation
        accessoryLeft={TopNavigationSimpleUsageShowcase}
      />
      </Layout>
      <Divider/>
      <Layout style={{ alignItems: "center", marginTop: 10, marginBottom: 10}}>
        <Icon
          name='weight'
          type='font-awesome-5'
          color='#13A0F2'
          size={80}
          style={{ marginBottom: 15 }} />
          {/* 현재 체중 */}
        <Text category='h1' style={{ marginBottom: 5 }}> 25.4kg</Text>
        {/* 마지막 기록 날짜 */}
        <Text category='p2'>마지막 기록: 2020-06-02</Text>
      </Layout>
      <Divider/>
      <View style={{ height: 200, padding: 20, flexDirection: 'row'}}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={{
              fill: 'grey',
              fontSize: 10,
          }}
          numberOfTicks={4}
          formatLabel={(value) => `${value}kg`}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ height: 600, flex: 1 }}
            data={data}
            // gridMin={0}
            svg={{ stroke: '#A0ECFD', strokeWidth: 2 }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid />
            <Decorator />
          </LineChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={ data }
              formatLabel={ (value, index) => index }
              contentInset={{ left: 25, right: 25 }}
            />
        </View>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  layout: {
  
  }
})

export default HistoryScreen
