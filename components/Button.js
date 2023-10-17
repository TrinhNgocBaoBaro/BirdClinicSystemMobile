import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import COLORS from "../constants/color";
import FONTS from '../constants/font';
const ButtonFlex = ({ title, onPress, stylesText, stylesButton }) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.5}
        style={[styles.button, stylesButton]}
        onPress={onPress}>
            <Text style={[styles.buttonText, stylesText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Đảm bảo nội dung button hiển thị theo chiều ngang
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    flexWrap: 'wrap', // Cho phép text wrap nếu nội dung quá dài
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 11,
    textAlign: 'center',
    fontFamily: FONTS.bold
  },
});

export {ButtonFlex};
