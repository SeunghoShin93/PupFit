import React from "react"
import GlobalStyles from "./GlobalStyles"
import { SafeAreaView, StyleSheet, View, Alert, Image } from "react-native"
import { Button, Text, Layout, Icon, Card } from "@ui-kitten/components"
import { LinearGradient } from "expo-linear-gradient"
import { connect } from "react-redux"
import { ProgressCircle } from "react-native-svg-charts"
import { getCurrentWeather } from "../lib/api"
import * as Location from "expo-location"
import { TopBasic } from "../components/navigations/TopBasic"
import QRCode from "./DeviceRegister"
import { AsyncStorage } from "react-native"
import { Avatar } from "@ui-kitten/components"
import axios from 'axios'

interface HomeProps {
  navigation: any
  today: string[]
  weatherKey: string
}

const HomeScreen: React.FC<HomeProps> = props => {
  const [humidity, setHumidity] = React.useState(0)
  const [temp, setTemp] = React.useState("")
  const [feelsLike, setFeelsLike] = React.useState("")
  const [weather, setWeather] = React.useState("")
  const [discomfort, setDiscomfort] = React.useState("")
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("deviceId")
      if (value !== null) {
        console.log(`등록된 기기 번호는 ${value}입니다.`)
        return value
      }
    } catch (error) {
      console.log("등록된 기기 정보가 없습니다.")
      return false
    }
  }
  const [isRegistered, setRegistered] = React.useState(false)
  const [dogInfo, setDogInfo] = React.useState(null)
  const [dogPosition, setDogPosition] = React.useState('위치정보없음')
  React.useEffect(() => {
    console.log("홈 스크린 렌더링 완료!")
    const getDogPosition = async () => {
      try {
        const position = await axios.get('http://k02b2011.p.ssafy.io:8000/mia/1')
        alert(position.data)
      } catch {
        console.log('Failed fetch dog location')
      }
    }

    const getLocation = async () => {
      try {
        await Location.requestPermissionsAsync()
        const location = await Location.getCurrentPositionAsync()
        const lat = location.coords.latitude
        const lon = location.coords.longitude
        const weatherData = await getCurrentWeather(lat, lon, props.weatherKey)
        const humidity = weatherData.data.main.humidity
        const temp = (weatherData.data.main.temp - 273.15).toFixed(2)
        const feelsLike = (weatherData.data.main.feels_like - 273.15).toFixed(2)
        const weather = weatherData.data.weather[0].description
        setHumidity(humidity)
        setTemp(temp)
        setFeelsLike(feelsLike)
        setWeather(weather)
        const discomfort =
          0.81 * ((Number(temp) + 0.01) * (humidity / 100)) + 46.3
        setDiscomfort(discomfort.toFixed(2))
      } catch (error) {
        Alert.alert("현재 위치 정보를 가져올 수 없습니다.", "슬프네요.")
      }
    }
    if (!weather.length) {
      getLocation()
      getDogPosition()
    }

  }, [])

  const { today } = props

  return (
    <>
      {1 == 1 ? (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
          <TopBasic screenName="PUPFIT" />
          <Layout
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              height: 1600
            }}
          >
            <LinearGradient
              colors={["#bcc0f9", "#4Cf2F7"]}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 1400
              }}
            />
            <Text style={styles.headertoday} category="h1">
              {today[0]}년 {today[1]}월 {today[2]}일
            </Text>
            <Layout
              style={{
                width: 600,
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <Text style={styles.logo} category="h1">
                오늘의 홍시
              </Text>
              <View style={{}}>
                <Avatar
                  size={"giant"}
                  source={require("../../assets/neutral.png")}
                />
              </View>
            </Layout>
            <Text>📍홍시의 현재 위치:</Text>
          </Layout>
          <View style={styles.barWrapper}>
            <Layout style={styles.statusLayout}>
              <Text style={styles.containerTitle}>TODAY</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
              <Layout style={{ width: '50%'}}>
                <Text style={{textAlign:'center'}}>FEELING TODAY</Text>
                <Image style={{width: 140, height: 140, alignSelf: 'center'}} source={require(`../../assets/good.png`)} />
              </Layout>
              <Layout style={{backgroundColor: '#fff', width: '50%', flex: 1, justifyContent:'space-between'}}>
                <Text>체중: </Text>
                <Text>성별: </Text>
                <Text>견종: </Text>
                <Text>나이: </Text>
                <Text>오늘의 간식 횟수: </Text>
              </Layout>
            </View>
            </Layout>
 
          </View>
          <Layout style={styles.statusLayout}>
            <Text style={styles.containerTitle}>ACTIVITY</Text>
            <View style={styles.circleWrapper}>
              <Card style={styles.card}>
                <Text style={styles.centerText}>가만히 있기</Text>
                <ProgressCircle
                  style={{ height: 100 }}
                  strokeWidth={9}
                  progress={0.7}
                  progressColor={"#35C655"}
                />
                <Text style={styles.circleLabel}>19.6시간</Text>
              </Card>
              <Card style={styles.card}>
                <Text style={styles.centerText}>돌아다니기</Text>
                <ProgressCircle
                  style={{ height: 100 }}
                  strokeWidth={9}
                  progress={0.3}
                  progressColor={"#93DADE"}
                />
                <Text style={styles.circleLabel}>8시간</Text>
              </Card>
              <Card style={styles.card}>
                <Text style={styles.centerText}>뛰기 & 신나기</Text>
                <ProgressCircle
                  style={{ height: 100 }}
                  strokeWidth={9}
                  progress={0.9}
                  progressColor={"#FF632B"}
                />
                <Text style={styles.circleLabel}>23시간</Text>
              </Card>
            </View>
          </Layout>
          <View style={styles.barWrapper}>
            <Layout style={styles.statusLayout}>
              <Text style={styles.containerTitle}>오늘의 산책 지수</Text>
              <Text
                style={{
                  color: "#35C655",
                  borderColor: "#35C655",
                  fontSize: 40,
                  textAlign: "center",
                  fontWeight: "bold",
                  width: 80,
                  alignSelf: "center",
                  borderWidth: 2,
                  margin: 12,
                  borderRadius: 40,
                  height: 80,
                  lineHeight: 80,
                }}
              >
                {(Number(discomfort) + Number(feelsLike)).toFixed(0) || 0}
              </Text>
              <Text style={{textAlign: 'center'}}>
                습도:{humidity}, 기온:{temp}, 체감온도:{feelsLike},불쾌지수
                {discomfort}
              </Text>
            </Layout>
          </View>

        </SafeAreaView>
      ) : (
        <QRCode />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  logo: {
    margin: 20,
    marginTop: 0,
    fontSize: 50,
    color: "#fff",
    alignSelf: "flex-start",
    fontWeight: "100"
  },
  headertoday: {
    marginTop: 30,
    marginLeft: 20,
    marginBottom: 0,
    color: "#fff",
    fontSize: 25,
    alignSelf: "flex-start",
    fontWeight: "bold"
  },
  statusLayout: {
    backgroundColor: "#fff",
    minHeight: "22%",
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 10,
    elevation: 1,
    overflow: "hidden",
    marginVertical: 10
  },
  circleWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 4
  },
  circleLabel: {
    marginTop: -58,
    textAlign: "center"
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 0
  },
  containerTitle: {
    fontSize: 23,
    textAlign: "left",
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: "#f1f1f1",
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 3
  },
  centerText: {
    textAlign: "center"
  },
  barWrapper: {
    flex: 1
  }
})

export default connect(
  state => ({
    today: state.base.get("today"),
    weatherKey: state.base.get("weatherKey")
  }),
  dispatch => ({})
)(HomeScreen)
