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
  Text,
  Layout,
  Input,
  Button
} from "@ui-kitten/components"
import { TopBasic } from "../components/navigations/TopBasic"
import { SearchBar } from 'react-native-elements';

interface DogInfoProps {
  navigation: any
}

const DogInfoScreen: React.FC<DogInfoProps> = (props) => {
  const [search, updateSearch] = React.useState('')

  return (
    <SafeAreaView style={{ flex:1 }}>
      <TopBasic screenName="Register Your Dog" />
      <Layout>
        
        <SearchBar
          style={{ containerStyle: 'white'}}
          placeholder="견종 선택"
          onChangeText={(text) => updateSearch(text)}
          value={search}
        />
      </Layout>
      <Layout 
        style={{ 
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center' }}>
        <Button appearance='outline' status='info'>SAVE</Button>

      </Layout>



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})

export default DogInfoScreen;