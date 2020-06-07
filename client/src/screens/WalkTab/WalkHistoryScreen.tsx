import React from 'react';
import { View, SafeAreaView, StyleSheet, SectionList, TouchableOpacity, Alert } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Constants from "expo-constants";
import { TopBasic } from "../../components/navigations/TopBasic";
import { LinearGradient } from "expo-linear-gradient"

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
    // {title:1, data: {start: '2020-06-05 13:00:00', end: '2020-06-05 13:10:00', big: 3, small: 2, dist: 0.5 }},
    // {title:2, data: {start: '2020-06-05 14:00:00', end: '2020-06-05 14:10:00', big: 2, small: 1, dist: 1.5 }},
    // {title:3, data: {start: '2020-06-05 15:00:00', end: '2020-06-05 15:10:00', big: 1, small: 3, dist: 2.5 }}
]

  

const WalkHistoryScreen: React.FC<WalkHistoryProps> = (props) => {
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
    const Item = ({ data }) => (
        <View style={styles.item}>
                  <LinearGradient
          colors={["#83a4d4", "#b6fbff"]}
          style={{
            position: "absolute",
            left: 0,
            right: 10,
            top: 0,
            height: "160%",
            borderRadius: 8
          }}
        />
          <TouchableOpacity onPress={() => props.navigation.navigate("WalkHistoryMapScreen", {start: data })}>
            <Text style={styles.title}> 시작 시간 : {data}</Text>
            <Text style={styles.dist}> 거리 : 0.0km </Text>
          </TouchableOpacity>
        </View>
      );
    return (
        <SafeAreaView style={styles.container}>
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
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: 'white',
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10
    },
    dist: {
        fontSize: 20,
        color: 'white',
        // textShadowColor: 'rgba(0, 0, 0, 0.5)',
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