import React from 'react';
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { TopBasic } from '../../components/navigations/TopBasic'


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
        <SafeAreaView style={{ flex: 1 }}>
            <TopBasic screenName="PUPFIT"/>
            <Layout style={styles.container}>

            <Layout style={styles.layout} level='2'  >
            <TouchableOpacity onPress={navigateWalkMode} >
            
            <Text style={styles.baseText} >산책 모드</Text>
            </TouchableOpacity>
            </Layout>

            <Layout style={styles.layout} level='1' >
            <TouchableOpacity onPress={navigateWalkHistory} >
            <Text style={styles.baseText}>오늘의 산책 기록</Text>
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
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    baseText: {
        
        fontSize: 20,
        fontWeight: "bold"

      },
})


export default WalkScreen;