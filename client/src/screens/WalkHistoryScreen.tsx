import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';


interface WalkHistoryProps {
    navigation: {
        navigate: Function
    }
}

const WalkHistoryScreen: React.FC<WalkHistoryProps> = (props) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Layout style={styles.container}>
            <Text>HahA</Text>
        </Layout>
        </SafeAreaView>
    )

}

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
        fontFamily: "Cochin",
        fontSize: 20,
        fontWeight: "bold"

      },
})


export default WalkHistoryScreen