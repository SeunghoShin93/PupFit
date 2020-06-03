import React, { useState, useEffect } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Alert,
  Image,
  View,
} from "react-native"
import {
  Button,
  Text,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Divider,
  ViewPager,
  Tab,
  TabView,
} from "@ui-kitten/components"
import * as Location from "expo-location"
import MapView, { Marker } from "react-native-maps"
import { Icon } from "react-native-elements"
import {
  LineChart,
  Grid,
  XAxis,
  YAxis,
  ProgressCircle,
  AreaChart,
  Path,
} from "react-native-svg-charts"
import { Circle } from "react-native-svg"
interface HistoryProps {
  navigation: any
}

const HistoryScreen = ({ navigation }) => {
  useEffect(() => {})
  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const weight = [27.0, 27.0, 26.8, 26.4, 26.0, 25.8, 25.4]
  const exercise = [3.0, 1.5, 4.0, 3.0, 2.6, 6.0, 1.0]
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  // const date = ['5/1', '5/10', '5/15', '5/20', '5/25', '6/1']
  // const data = [
  //   {
  //       date: new Date(2015, 5, 1),
  //       weight: 27.0
  //   },
  //   {
  //       date: new Date(2015, 5, 10),
  //       weight: 26.8
  //   },
  //   {
  //       date: new Date(2015, 5, 15),
  //       weight: 26.4
  //   },
  //   {
  //       date: new Date(2015, 5, 20),
  //       weight: 26.0
  //   },
  //   {
  //       date: new Date(2015, 5, 25),
  //       weight: 25.8
  //   },
  //   {
  //       date: new Date(2015, 6, 1),
  //       weight: 25.4
  //   },
  // ]
  // const keys = ['date', ]
  const BackIcon = (props) => <Icon {...props} name="pie-chart" />

  const BackAction = () => <TopNavigationAction icon={BackIcon} />

  const TopNavigationSimpleUsageShowcase = () => (
    <TopNavigation
      accessoryLeft={BackAction}
      title="홍시의 일주일"
      subtitle="일주일 동안의 기록을 한 눈에 확인할 수 있습니다."
    />
  )

  const contentInset = { top: 23, bottom: 23 }

  const Decorator = ({ x, y, data }) => {
    return data.map((value, index) => (
      <Circle
        key={index}
        cx={x(index)}
        cy={y(value)}
        r={4}
        stroke={"#13A0F2"}
        fill={"white"}
      />
    ))
  }

  const Line = ({ line }) => <Path d={line} stroke={"#0273CC"} fill={"none"} />
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(4, 149, 238, 0.08)" }}
    >
      <Layout>
        <TopNavigation accessoryLeft={TopNavigationSimpleUsageShowcase} />
      </Layout>
      <Divider />
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title="체중">
          <Layout
            style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
          >
            <Icon
              name="weight"
              type="font-awesome-5"
              color="#13A0F2"
              size={80}
              style={{ marginBottom: 15 }}
            />
            {/* 현재 체중 */}
            <Text category="h1" style={{ marginBottom: 5 }}>
              {" "}
              25.4kg
            </Text>
            {/* 마지막 기록 날짜 */}
            <Text category="p2">마지막 기록: 2020-06-02</Text>

            {/* <Divider/> */}
            <View style={{ height: 400, padding: 20, flexDirection: "row" }}>
              <YAxis
                data={weight}
                contentInset={contentInset}
                svg={{
                  fill: "grey",
                  fontSize: 10,
                }}
                numberOfTicks={4}
                formatLabel={(value) => `${value}kg`}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                  style={{ height: 600, flex: 1 }}
                  data={weight}
                  // gridMin={0}
                  svg={{ stroke: "#A0ECFD", strokeWidth: 2 }}
                  contentInset={{ top: 20, bottom: 20 }}
                  animate
                >
                  <Grid />
                  <Decorator />
                </LineChart>
                <XAxis
                  style={{ marginHorizontal: -10 }}
                  data={weight}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 25, right: 25 }}
                />
              </View>
            </View>
          </Layout>
        </Tab>
        <Tab title="사료 / 간식">
          <Layout>
            <Layout
              style={{
                backgroundColor: "black",
                flexDirection: "row",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Layout
                style={{
                  backgroundColor: "white",
                  alignItems: "center",
                  marginLeft: 20,
                  marginRight: 20,
                }}
              >
                <Icon
                  name="bone"
                  type="font-awesome-5"
                  color="#13A0F2"
                  size={80}
                  style={{ marginBottom: 15 }}
                />
                {/* 현재 체중 */}
                <Text category="h3" style={{ marginBottom: 5 }}>
                  1400g
                </Text>
                {/* 마지막 기록 날짜 */}
                <Text category="p2">마지막 기록: 2020-06-02</Text>
              </Layout>
              <Layout
                style={{
                  alignItems: "center",
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                <Icon
                  name="cookie-bite"
                  type="font-awesome-5"
                  color="#13A0F2"
                  size={80}
                  style={{ marginBottom: 15 }}
                />
                {/* 현재 체중 */}
                <Text category="h3" style={{ marginBottom: 5 }}>
                  8 번
                </Text>
                {/* 마지막 기록 날짜 */}
                <Text category="p2">마지막 기록: 2020-06-02</Text>
              </Layout>
            </Layout>

            <Layout style={{ marginTop: 20 }}>
              <Text
                category="label"
                style={{
                  marginStart: 100,
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                8 / 10
              </Text>
              <ProgressCircle
                style={{ height: 200 }}
                progress={0.8}
                progressWidth={2}
                progressColor={"rgb(134, 65, 244)"}
                startAngle={-Math.PI}
                endAngle={Math.PI}
                // svg={{ stroke: '#A0ECFD', strokeWidth: 2 }}
              />
            </Layout>
          </Layout>
        </Tab>
        <Tab title="활동량">
          <Layout>
            <Layout
              style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
            >
              <Icon
                name="dog"
                type="font-awesome-5"
                color="#13A0F2"
                size={80}
                style={{ marginBottom: 15 }}
              />
              {/* 현재 체중 */}
              <Text category="h1" style={{ marginBottom: 5 }}>
                6 km
              </Text>
              {/* 마지막 기록 날짜 */}
              <Text category="p2">마지막 기록: 2020-06-02</Text>
            </Layout>
            <View style={{ height: 400, padding: 20, flexDirection: "row" }}>
              <YAxis
                data={exercise}
                contentInset={{ top: 20, bottom: 80 }}
                svg={{
                  fill: "grey",
                  fontSize: 9,
                }}
                numberOfTicks={4}
                formatLabel={(value) => `${value}km`}
              />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <AreaChart
                  style={{ height: 300 }}
                  data={exercise}
                  svg={{ fill: "rgba(4, 149, 238, 0.08)" }}
                  contentInset={{ top: 20, bottom: 20 }}
                >
                  <Grid />
                  <Line />
                  <Decorator />
                </AreaChart>
                <XAxis
                  style={{ marginHorizontal: -10 }}
                  data={exercise}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 25, right: 25 }}
                />
              </View>
            </View>
          </Layout>
        </Tab>
      </TabView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  layout: {},
})

export default HistoryScreen
