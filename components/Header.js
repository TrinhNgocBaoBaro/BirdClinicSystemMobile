import React from 'react'
import { SafeAreaView, StyleSheet, View, Image, Text, Dimensions, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/color';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export default function Header({ title, rightIcon, onPress }) {
    return (
        <SafeAreaView>
            <View style={styles.top}>
                <Pressable onPress={onPress}>
                    <View style={{ height: 40, width: 40, marginLeft: 20, justifyContent: 'center' }}>
                        <Icon name="chevron-back-outline" size={30} color={COLORS.white} />
                    </View>
                </Pressable>
                <View style={{ justifyContent: 'center' }}>                   
                        <Text style={styles.textTitle}>{title}</Text>
                </View>
                <View 
                    style={{ 
                        marginRight: 20, 
                        width:40, 
                        height: 40,
                        justifyContent: 'center' }}>
                        <Icon name={rightIcon} size={30} color={COLORS.white} />
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
        backgroundColor: COLORS.green,
        height: 80
    },

    textTitle: {
        fontSize: 22,
        color: COLORS.white,
        fontFamily: 'Inter-SemiBold'
    },

});


