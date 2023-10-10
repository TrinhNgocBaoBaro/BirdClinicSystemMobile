import React from 'react'
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView , StyleSheet, View, Image, Text, Dimensions, Pressable  } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export default function MainHeader({iconHeader, navigation}) {
    return (
        <SafeAreaView>
            <View style={styles.top}>
                <View style={{height: 40, width: 40,marginLeft: 20, justifyContent: 'center'}}>
                    <Icon name={iconHeader} size={25} color={"black"} />
                </View>
                <View style={{justifyContent: 'center'}}>
                    <Text>
                    <Text style={styles.typeText1}>Bird</Text>
                    <Text style={styles.typeText2}>Clinic</Text>
                    </Text>
                </View>
                <View style={{marginRight: 20, justifyContent: 'center'}}>
                    {/* <Image
                        source={{ uri: userDetails ? userDetails.photoURL : "https://banner2.cleanpng.com/20180619/epr/kisspng-avatar-photo-booth-computer-icons-email-stewardess-5b292bfebc29e1.5698032815294248947707.jpg" }}
                        style={{ height: 36, width: 36, borderRadius: 50 }}
                    /> */}
                    <Pressable onPress={()=> navigation.navigate("Profile")}>
                    <Image
                        source={{ uri:"https://banner2.cleanpng.com/20180619/epr/kisspng-avatar-photo-booth-computer-icons-email-stewardess-5b292bfebc29e1.5698032815294248947707.jpg" }}
                        style={{ height: 40, width: 40, borderRadius: 50 }}
                    />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    top: {
        marginTop: windowHeight * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        height: 80
    },

    typeText1: {
        fontSize: 24,
        color: COLORS.black,
        fontWeight: 'bold'
    },
    typeText2: {
        fontSize: 24,
        color: COLORS.green,
        fontWeight: 'bold'
    },
});


