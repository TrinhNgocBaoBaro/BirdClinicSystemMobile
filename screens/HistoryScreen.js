import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import MainHeader from '../components/MainHeader';
import { useIsFocused } from '@react-navigation/native';

export default function HistoryScreen({navigation}) {
const isFocused = useIsFocused();

React.useEffect(()=>{

 if(isFocused) console.log("forcus History")
},[isFocused])
  return (
    <>
      <MainHeader iconHeader={"folder-open-outline"} navigation={navigation}/>
      <View style={styles.container}>
        <Text>History Screen
        </Text>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


