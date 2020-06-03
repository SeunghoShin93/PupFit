import React, { useState, useEffect } from "react"
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import { Button, Text, Layout, Spinner, Icon } from "@ui-kitten/components"
import { TopBasic } from "../components/navigations/TopBasic";

const WalkModeScreen = ({  }) => {
  const [userMarker, setUserMarker] = useState(null);
  const [walkMode, setWalkMode] = React.useState(false);
  const onPressWalkModeHandler = () => {
    setWalkMode(!walkMode);
  };
  const pulseIconRef = React.useRef();
    
  React.useEffect(() => {
    pulseIconRef.current.startAnimation();

  }, []);
  const renderPulseIcon = (props) => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animationConfig={{ cycles: Infinity }}
      animation='zoom'
      name='activity'
    />
  );

     const Shit = (props) => {
       if (!props.walkMode){
           return null
       }
       return (
       <>
       <Button>
        응아
    </Button>
    <Button>
        쉬
    </Button>
    </>)
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <TopBasic screenName="산책 모드" />

    <Layout style={styles.container}>
    <Layout style={styles.topbar}>
    <Shit walkMode={walkMode} />
    </Layout>

    

    <Layout style={styles.layout}>
    <Button
        appearance='ghost'
        status='danger'
        size='giant'
        accessoryLeft={renderPulseIcon}
        style={styles.spinner}
        />
      <TouchableOpacity onPress={onPressWalkModeHandler}>
        <Text style={styles.circle}>

            {walkMode ? '산책 중' : '산책 시작'}
        </Text>
    {/* <Spinner style={styles.spinner} size='large'/> */}
        </TouchableOpacity>
        </Layout>

    </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  
    flexDirection: 'column',
},
layout: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
},
topbar: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
},
  icon: {
    width: 32,
    height: 32,
  },
  circle: {
    borderWidth: 5, 
    borderRadius: 120,
    borderColor: '#666699',
    width: 250, 
    height: 250, 
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: 250,
    fontSize: 30,
    fontWeight: "bold"
  },
  spinner: {
    alignItems: 'center',
    textAlign: 'center',
      
  }
})

export default WalkModeScreen
