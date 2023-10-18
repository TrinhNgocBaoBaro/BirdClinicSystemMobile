import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
const ButtonFlex = ({ title, onPress, stylesText, stylesButton }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.buttonFlex, stylesButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonFlexText, stylesText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const ButtonFloatBottom = ({ title, onPress }) => {
  return (
    <View style={styles.containerButtonFloatBottom}>
      <View style={styles.boxButtonFloatBottom}>
        <TouchableOpacity activeOpacity={0.7} style={styles.buttonFloatBottom} onPress={onPress}>
          <Text style={styles.buttonFloatBottomText}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Style của Button Flex
  buttonFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: COLORS.green,
    borderRadius: 5,
    flexWrap: "wrap",
  },
  buttonFlexText: {
    color: COLORS.white,
    fontSize: 11,
    textAlign: "center",
    fontFamily: FONTS.bold,
  },

  // Style của Button FloatBottom
  containerButtonFloatBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  boxButtonFloatBottom: {
    backgroundColor: COLORS.white,
    height: 80,
    justifyContent: "center",
    elevation: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.darkGrey
  },
  buttonFloatBottom: {
    marginLeft: 80,
    marginRight: 80,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonFloatBottomText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 15,
  },
});

export { ButtonFlex, ButtonFloatBottom };
