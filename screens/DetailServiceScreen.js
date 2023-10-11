import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native'
import Header from '../components/Header';
export default function DetailServiceScreen({navigation}) {
    return (
      <>
      <Header title='Spa chăm sóc' onPress={()=>navigation.goBack()}/>
      <View style={styles.container}>
        <Text>Detail Service Screen nè
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
