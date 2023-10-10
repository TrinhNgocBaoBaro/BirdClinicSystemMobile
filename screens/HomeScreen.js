import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native'
import MainHeader from '../components/MainHeader';

export default function HomeScreen({ navigation }) {
    return (
        <>
            <MainHeader iconHeader={"ios-home-outline"} navigation={navigation}/>
            <View style={styles.container}>
                <Text>Home Screen nef cha
                </Text>
                <Button onPress={() => navigation.navigate("Detail")} title='Click!' />
                <StatusBar style="auto" />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


