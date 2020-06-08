import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { TopBasic } from '../../components/navigations/TopBasic'
import GlobalStyles from '../GlobalStyles'

interface WalkProps {
    navigation: {
        navigate: Function
    }
}

const WalkScreen: React.FC<WalkProps> = ( props ) => {
    const navigateWalkMode = () => {
        props.navigation.navigate("WalkModeScreen")
    }
    const navigateWalkHistory = () => {
        props.navigation.navigate("WalkHistoryScreen")
    }

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea}>
            <TopBasic screenName="PUPFIT"/>
            <Layout style={styles.container}>

                <Layout style={styles.layout1}  >
                <TouchableOpacity onPress={navigateWalkMode} >
                
                <Text style={styles.baseText1} >산책 모드</Text>
                </TouchableOpacity>
                </Layout>
                {/* <View
                style={{
                borderBottomColor: 'black',
                borderBottomWidth: 2,
                }}
            /> */}
                <Layout style={styles.layout2} >
                <TouchableOpacity onPress={navigateWalkHistory} >
                <Text style={styles.baseText2}>오늘의{'\n'} 산책 기록</Text>
            </TouchableOpacity>
            </Layout>

            </Layout>

        </SafeAreaView>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    layout1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#13A0F2',
        // elevation: 4
    },
    layout2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#13A0F2',
        // elevation: 4
    },
    baseText1: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: "bold",
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10

      },
    baseText2: {
        textAlign: 'center',
        fontSize: 55,
        fontWeight: "bold",
        // color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 10

      },
})


export default WalkScreen;