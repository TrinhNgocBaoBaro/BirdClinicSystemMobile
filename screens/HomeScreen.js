import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native'
import MainHeader from '../components/MainHeader';
import COLORS from '../constants/color';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


export default function HomeScreen({ navigation }) {
    const [segmented, setSegmented] = React.useState('0')
    const [selectedIndex, setSelectedIndex] = React.useState(undefined);

    return (
        <>
            <MainHeader iconHeader={"ios-home-outline"} navigation={navigation} />
            <View style={styles.container}>
                {/* <Button onPress={() => navigation.navigate("Detail")} title='Click!' /> */}
                <StatusBar style="auto" />
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                    <SegmentedControl
                        values={['Hôm nay (1)', 'Sắp tới', 'Tái khám']}
                        selectedIndex={selectedIndex}
                        onChange={(event) => {
                            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                            // setSegmented({selectedIndex: segmented})
                        }}
                    />
                </View>
                {selectedIndex === 0 && (
                    <View style={styles.test}>
                        <Text>Hôm nay</Text>
                    </View>
                )}
                {selectedIndex === 1 && (
                    <View style={styles.test}>
                        <Text>Sắp tới</Text>
                    </View>
                )}
                {selectedIndex === 2 && (
                    <View style={styles.test}>
                        <Text>Tái khám</Text>
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


