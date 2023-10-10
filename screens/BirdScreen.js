import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import MainHeader from '../components/MainHeader';
export default function BirdScreen({navigation}) {
  return (
    <>
      <MainHeader iconHeader={"skull-outline"} navigation={navigation}/>
      <View style={styles.container}>
        <Text>Bird Screen
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


