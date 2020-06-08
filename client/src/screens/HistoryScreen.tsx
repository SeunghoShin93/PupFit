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
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
  ViewPager,
  Tab,
  TabView,
  Card,
} from "@ui-kitten/components"
import {Text as SVGText} from 'react-native-svg'
import { bindActionCreators } from "redux"
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
  BarChart,
  Path,
} from "react-native-svg-charts"
import { Circle } from "react-native-svg"
import GlobalStyles from "./GlobalStyles"
import { TopBasic } from "../components/navigations/TopBasic"
import { connect } from "react-redux"
import * as snackActions from "../redux/modules/snack"
import * as scale from "d3-scale"
import * as shape from "d3-shape"
import dateFns from "date-fns"
import moment from "moment"
// import {  format, compareAsc } from 'date-fns'
interface HistoryProps {
  navigation: any
}
export interface TabViewProps extends ViewPagerProps<TabProps> {
  tabBarStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}
const HistoryScreen: React.FC<HistoryProps> = (props) => {
  const [feedCount, setFeedCount] = React.useState(0)
  const weight = [27.0, 27.0, 26.8, 26.4, 26.0, 25.8, 25.4]
  const data = [
    {
      value: 27.0,
      date: new Date(2018, 0, 2, 17),
    },
    {
      value: 27.0,
      date: new Date(2018, 0, 2, 17),
    },
    {
      value: 26.8,
      date: new Date(2018, 0, 2, 17),
    },
    {
      value: 26.4,
      date: new Date(2018, 0, 2, 17),
    },
    {
      value: 26.0,
      date: new Date(2018, 0, 2, 17),
    },
    {
      value: 25.8,
      date: new Date(2018, 0, 2, 17),
    },
    {
      value: 25.4,
      date: new Date(2018, 0, 2, 17),
    },
  ]
  const exercise = [3.0, 1.5, 4.0, 3.0, 2.6, 6.0, 1.0]
  const snack = [12, 11, 15, 5, 8, 10, 25]

  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const colorGradient = (percentage) => {}
  const colorDivider = ((feedCount / 12) * 255).toFixed(0)

  const TabChartIcon = (props) => (
    <Icon {...props} name="chart-line" type="font-awesome-5" />
  )
  const TabSnackIcon = (props) => (
    <Icon {...props} name="cookie-bite" type="font-awesome-5" />
  )
  const TabBallIcon = (props) => (
    <Icon {...props} name="heartbeat" type="font-awesome-5" />
  )
  const NavigationIcon = (props) => (
    <Icon {...props} name="paw" type="font-awesome-5" />
  )
  const NavigationAction = () => <TopNavigationAction icon={NavigationIcon} />
  const TopNavigationSimpleUsageShowcase = () => (
    <TopNavigation
      accessoryLeft={NavigationAction}
      title="홍시의 일주일"
      subtitle="일주일 동안의 기록을 한 눈에 확인할 수 있습니다."
      style={{ backgroundColor: "rgba(4, 149, 238, 0.08)" }}
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

  const dataSmall = [50, 10, 40, 95, 85]
  const axesSvg = { fontSize: 9, fill: "black" }
  const verticalContentInset = { top: 10, bottom: 10 }
  const xAxisHeight = 10
  const CUT_OFF = 20
  const Labels = ({ ...props }) => {
  const {x,y,bandwidth,data} = props
  const xFinder = (idx) => x(idx) + bandwidth / 2
    return data.map((value, index) => (
      <SVGText
        key={index}
        x={xFinder(index)}
        y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
        fontSize={14}
        fill={value >= CUT_OFF ? "white" : "black"}
        alignmentBaseline={"middle"}
        textAnchor={"middle"}
      >
        {value}
      </SVGText>
    ))
  }

  
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <TopBasic screenName="HISTORY" />
      {/* <Divider style={{ borderColor: '#B3B3B3', borderWidth: 1 }} /> */}
      <Layout
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(4, 149, 238, 0.08)",
        }}
      >
        <TopNavigation
          accessoryLeft={TopNavigationSimpleUsageShowcase}
          style={{ height: "10%", backgroundColor: "rgba(4, 149, 238, 0.08)" }}
        />
      </Layout>
      {/* <Divider style={{ borderColor: '#B3B3B3', borderWidth: 1 }}/> */}
      <TabView
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        style={(styles.HistoryTabBar, styles.HistoryIndicator)}
        
      >
        <Tab title="체중" icon={TabChartIcon}>
          <Layout
            style={{ alignItems: "center", marginTop: 10, marginBottom: 10 }}
          >
            <Icon
              name="weight"
              type="font-awesome-5"
              color="#0495EE"
              size={80}
              style={{ marginBottom: 15 }}
            />
            <Text category="h1" style={{ marginBottom: 5 }}>
              {" "}
              25.4kg
            </Text>
            <Text category="p2">마지막 기록: 2020-06-02</Text>
            <View style={{ height: 300, padding: 20, flexDirection: "row" }}>
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
                  style={{ height: 300, flex: 1 }}
                  data={weight}
                  // gridMin={0}
                  svg={{ stroke: "#0273CC", strokeWidth: 1 }}
                  contentInset={{ top: 25, bottom: 25 }}
                >
                  <Grid direction={Grid.Direction.HORIZONTAL} />
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
        <Tab title="간식" icon={TabSnackIcon}>
          <Layout>
            <Layout
              style={{
                flexDirection: "row",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Layout
                style={{
                  alignItems: "center",
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                <Icon
                  name="bone"
                  type="font-awesome-5"
                  color="#13A0F2"
                  size={80}
                  style={{ marginBottom: 15 }}
                />
                <Text category="h3" style={{ marginBottom: 5 }}>
                  8 번
                </Text>
                <Text category="p2">이번 주 평균 간식 섭취 횟수</Text>
              </Layout>
            </Layout>
            {/* <Layout style={{ height: 300 }}> */}
            <View
              style={{
                marginTop: 50,
                height: 250,
                // width: "93%",
                flexDirection: "row",
                justifyContent: "center",
                // backgroundColor: "gray"
              }}
            >
              <View style={{ flex: 1 }}>
                <BarChart
                  style={{ flex: 1 }}
                  data={snack}
                  svg={{ fill: "rgba(4, 149, 238, 0.48)" }}
                  gridMin={0}
                  // spacing={0.2}
                  yMin={0}
                  // numberOfTicks={5}
                >
                  <Grid direction={Grid.Direction.HORIZONTAL} />
                  <Labels />
                </BarChart>
                <XAxis
                  style={{
                    marginHorizontal: 0,
                    height: xAxisHeight,
                    marginTop: 2,
                    // backgroundColor: "red"
                  }}
                  data={snack}
                  scale={scale.scaleBand}
                  svg={Object.assign(axesSvg, { fill: "black" })}
                />
              </View>
            </View>
            {/* </Layout> */}
            {/* <Layout style={{ minHeight: 350 }}>
              <View style={styles.circleWrapper}>
                <Card style={styles.card}>
                  <ProgressCircle
                    style={{ height: 200 }}
                    strokeWidth={9}
                    progress={feedCount / 12}
                    progressColor={`rgb(${colorDivider},${255-Number(colorDivider)} , 64)`}
                  />
                  <Text style={styles.centerText}>{feedCount} / 12 </Text>
                </Card>
              </View>
            </Layout>
            <Button style={{width: 300, height: 50, backgroundColor: "#3459"}} onPress={() => setFeedCount(feedCount+1)}>와 간식이다!!!!!!</Button>
            <Button style={{width: 300, height: 50, backgroundColor: "#3459"}} onPress={() => setFeedCount(0)}>초기화</Button> */}
          </Layout>
        </Tab>
        <Tab title="활동량" icon={TabBallIcon}>
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
              <Text category="p2">이번 주 평균 활동량</Text>
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
  card: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  centerText: {
    textAlign: "center",
    fontSize: 40,
    position: "absolute",
    translateX: 176,
    translateY: 93,
  },
  circleWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  HistoryTabBar: {
    color: 'black'
  },
  HistoryIndicator: {
    color: 'black'
  }
})

export default connect(
  (state) => ({
    feedCount: state.snack.get("feedCount"),
    maximumFeedCount: state.snack.get("maximumFeedCount"),
  }),
  (dispatch) => ({
    SnackActions: bindActionCreators(snackActions, dispatch),
  })
)(HistoryScreen)
