import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native'
import COLORS from '../constants/color';

export default function DetailScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 10}}>Đang phát triển
         </Text>
         <Button color={COLORS.green} onPress={()=> navigation.goBack("Home")} title='Thoát!'/>
        <StatusBar style="auto" />
      </View>
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
