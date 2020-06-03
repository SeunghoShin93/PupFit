import React from "react"
import GlobalStyles from "./GlobalStyles"
import { SafeAreaView, StyleSheet, View, Alert } from "react-native"
import { Button, Text, Layout, Icon, Card } from "@ui-kitten/components"
import { LinearGradient } from "expo-linear-gradient"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { BottomTab } from "../components/navigations/BottomTab"
import { ProgressCircle } from "react-native-svg-charts"
import { getCurrentWeather } from "../lib/api"
import * as Location from "expo-location"
import { TopBasic } from '../components/navigations/TopBasic'
interface HomeProps {
  navigation: any
  today: string[]
  weatherKey: string
}

const HomeScreen: React.FC<HomeProps> = (props) => {
  const [humidity, setHumidity] = React.useState(0)
  const [temp, setTemp] = React.useState("")
  const [feelsLike, setFeelsLike] = React.useState("")
  const [weather, setWeather] = React.useState("")
  const [discomfort, setDiscomfort] = React.useState("")
  React.useEffect(() => {
    console.log("홈 스크린 렌더링 완료!")

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
        const discomfort = 0.81 * ((Number(temp) + 0.01) * (humidity / 100)) + 46.3
        setDiscomfort(discomfort.toFixed(2))
      } catch (error) {
        Alert.alert("현재 위치 정보를 가져올 수 없습니다.", "슬프네요.")
      }
    }
    if (!weather.length) {
      getLocation()
    }
  }, [])
  const navigateLogin = () => {
    props.navigation.navigate("LoginScreen")
  }

  const navigateJoin = () => {
    props.navigation.navigate("JoinScreen")
  }

  const navigateProfile = () => {
    props.navigation.navigate("ProfileScreen")
  }
  const { today } = props

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <TopBasic screenName="PUPFIT"/>
      <Layout
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          maxHeight: "55%",
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#bcc0f9",  "#4Cf2F7"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <Text style={styles.headertoday} category="h1">
          {today[0]}년 {today[1]}월 {today[2]}일
        </Text>
        <Text style={styles.logo} category="h1">
          오늘의 홍시
        </Text>
        <Text category="h1">
          93Kg <Text category="h3">-2.8%</Text>
        </Text>
      </Layout>
      <Layout style={styles.statusLayout}>
        <Text style={styles.containerTitle}>홍시의 오늘 활동량</Text>
        <View style={styles.circleWrapper}>
          <Card style={styles.card} status="success">
            <Text style={styles.centerText}>가만히 있기</Text>
            <ProgressCircle
              style={{ height: 100 }}
              strokeWidth={9}
              progress={0.7}
              progressColor={"#35C655"}
            />
            <Text style={styles.circleLabel}>19.6시간</Text>
          </Card>
          <Card style={styles.card} status="primary">
            <Text style={styles.centerText}>돌아다니기</Text>
            <ProgressCircle
              style={{ height: 100 }}
              strokeWidth={9}
              progress={0.3}
              progressColor={"#93DADE"}
            />
            <Text style={styles.circleLabel}>8시간</Text>
          </Card>
          <Card style={styles.card} status="danger">
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
        <Layout style={styles.barCard}>
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            오늘의 산책 지수
          </Text>
          <Text>
            습도:{humidity}, 기온:{temp}, 체감온도:{feelsLike}, 날씨{weather}, 불쾌지수{discomfort}
          </Text>
        </Layout>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    margin: 20,
    fontSize: 30,
    color: "#fff",
    alignSelf: "flex-start",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  headertoday: {
    color: "#fff",
    textShadowColor: "#000",
    textShadowRadius: 5,
    fontSize: 20,
    alignSelf: "center",
  },
  statusLayout: {
    backgroundColor: "#fff",
    marginTop: -125,
    height: "20%",
    width: "90%",
    marginHorizontal: "5%",
    borderRadius: 30,
    elevation: 7,
  },
  circleWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circleLabel: {
    marginTop: -58,
    textAlign: "center",
  },
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
  },
  barWrapper: {
    flex: 1,
  },
  barCard: {
    width: "90%",
    elevation: 7,
    margin: "5%",
    height: "50%",
  },
})

export default connect(
  (state) => ({
    today: state.base.get("today"),
    weatherKey: state.base.get("weatherKey"),
  }),
  (dispatch) => ({})
)(HomeScreen)
