import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/color";
import FONTS from "../constants/font";

const ItemMedicalRecord = ({ item, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}
      style={{
        flexDirection: "row",
        height: "auto",
        backgroundColor: COLORS.white,
        marginTop: 5,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 5,
        padding: 10,
      }}
    >
      <Icon name={"document-text-outline"} size={70} color={COLORS.green} />
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: COLORS.black,
            fontFamily: FONTS.bold,
            fontSize: 15,
            marginBottom: 10,
          }}
        >
          Ngày: {item.dateMedical}
        </Text>
        <Icon
          name={"information-circle-outline"}
          size={30}
          color={COLORS.green}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemMedicalRecord;

const styles = StyleSheet.create({});
