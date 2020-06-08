import React from "react";
import { Layout,  Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

interface TopBasicProps {
  screenName: string;
  navigation?: any;
}

export const TopBasic: React.FC<TopBasicProps> = (props) => {


  return (
    <Layout style={styles.container} level='1'>
      <Text style={styles.header}>{props.screenName}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  header: {
    backgroundColor: "#fff",
    borderBottomColor: "#c1c1c1",
    color: '#000',
    elevation: 3,
    borderBottomWidth: 1,
    textAlign:'center',
    fontSize: 25,
    paddingVertical: 5
  }
});