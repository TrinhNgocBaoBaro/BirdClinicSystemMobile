import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Button} from 'react-native'

export default function DetailScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Detail Screen nè
         </Text>
         <Button onPress={()=> navigation.goBack("Home")} title='Back!'/>
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
