import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
const ItemBird = ({ item, navigation, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: 10,
        padding: 10,
        height: "auto",
        marginTop: 5,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          height: 90,
          width: "auto",
          borderRadius: 5,
          marginBottom: 5,
        }}
      />
      <Text
        style={{
          fontFamily: "Inter-Bold",
        }}
      >
        {item.name}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 12, fontFamily: FONTS.medium }}>
          {item.bird_breed.breed}
        </Text>
        <Text
          style={{ fontSize: 12, fontFamily: FONTS.bold, color: COLORS.grey }}
        >
          {item.gender}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemBird;
