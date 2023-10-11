import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native'
import MainHeader from '../components/MainHeader';
import COLORS from '../constants/color';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


export default function HomeScreen({ navigation }) {
    const [numberOfToday, setNumberOfToday] = React.useState(1)
    const [numberOfComing, setNumberOfComing] = React.useState(0)
    const [numberOfReExam, setNumberOfReExam] = React.useState(0)

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <>
            <MainHeader iconHeader={"ios-home-outline"} navigation={navigation} />
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <SegmentedControl
                        values={[`Hôm nay (${numberOfToday})`, 'Sắp tới', 'Tái khám']}
                        selectedIndex={selectedIndex}
                        onChange={(e) => {
                            setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
                        }}
                    />
                </View>
                {selectedIndex === 0 && (
                    <View style={styles.test}>
                        <Text style={{fontSize: 25}}>Hôm nay</Text>
                    </View>
                )}
                {selectedIndex === 1 && (
                    <View style={styles.test}>
                        <Text style={{fontSize: 25}}>Sắp tới</Text>
                    </View>
                )}
                {selectedIndex === 2 && (
                    <View style={styles.test}>
                        <Text style={{fontSize: 25}}>Tái khám</Text>
                    </View>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    test: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


