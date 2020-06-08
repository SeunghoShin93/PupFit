import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Constants from "expo-constants";
import { TopBasic } from "../../components/navigations/TopBasic";
import { LinearGradient } from "expo-linear-gradient";
import GlobalStyles from '../GlobalStyles'

interface WalkHistoryProps {
    navigation: {
        navigate: Function
    }
}

const dummies = [
    {
      title: "아침",
      data: ["09:00:00"]
    },
    {
      title: "낮",
      data: ["14:00:00"]
    },
    {
      title: "밤",
      data: [ "19:00:00"]
    },
]

  

const WalkHistoryScreen: React.FC<WalkHistoryProps> = (props) => {

    const [datalist, setDataList] = useState([]);
    const [receive, setReceive] = useState(false);
    const data = []; 
    const date = []; // 중복 제거 된 산책 날짜 (section)
    const date2 = [];
    const date3 = {};

    const dateListMaker = (d1) => {
      for (const i in d1) {
        const d2 = d1[i].startTime.split('T')
        let add = 1;
    
        for (const e in date) {
           if (date[e] === d2[0]) {
            add -= 1;
            break
           }
        }
        if (add===1) {
          date3[d2[0]] = []
          date.push(d2[0])
        }
        else {
          date3[d2[0]].push(d2[1])
      }
      }
    }

    useEffect(()=> {
      fetch('http://172.30.1.7:8000/health/1/walking/list', {
        method: 'get',
      })
      .then((response) => response.json())
      .then((resData) =>{ 
      setDataList(resData.data);
      setReceive(true);
      Loader();
      })
    }, []);

    const confirmAlert = (data) =>{
    const d = JSON.stringify(data.target);
    Alert.alert(
      "확인용",
       '' + d,
      [
        {
          text: "확 인",
          onPress: () => console.log('check'),
        },
        // { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    };

    const onPressHandler = (e) => {
        confirmAlert(e)
    };

    const Loader = () => {
      if (!receive) {
        return null
      }
      return dateListMaker(datalist);
    };

    const Item = ({ data }) => (
        <View style={styles.item}>
                  <LinearGradient
          colors={["#83a4d4", "#b6fbff"]}
          style={styles.linear}
        />
          <TouchableOpacity onPress={() => props.navigation.navigate("WalkHistoryMapScreen", {start: data })}>
            <Text style={styles.title}> 시작 시간 : {data}</Text>
                      <View
            style={{
              borderBottomColor: 'white',
              borderBottomWidth: 2,
            }}
          />
            <Text style={styles.dist}> 거리 : 0.0km </Text>
          </TouchableOpacity>
        </View>
      );


    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <TopBasic screenName="오늘의 산책 기록" />
            <SectionList
            sections={dummies}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item data={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.sectionHeader}>{title}</Text>
            )}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseText: {
        fontSize: 16,
        fontWeight: "bold"

    },
    item: {
        // backgroundColor: "#13A0F2",
        padding: 20,
        marginVertical: 8,
        color: 'white',
        shadowOpacity: 0.24,
        shadowRadius: 6.27,
        shadowOffset: {width: 5, height: 8},
    },
    linear: {
        position: "absolute",
        left: 0,
        right: 10,
        top: 0,
        height: "160%",
        borderRadius: 8,
        borderWidth:3,
        borderColor: 'white'
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10
    },
    dist: {
        fontSize: 20,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 50,
        paddingBottom: 2,
        fontWeight: 'bold',
        marginLeft: 10
      },
})


export default WalkHistoryScreen