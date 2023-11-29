import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/color";
import { ButtonFlex } from "./Button";
import FONTS from "../constants/font";
const ItemService = ({ item, navigation }) => {
    return (
        <View style={style.itemCard}>
            <Image source={{ uri: item.image }} style={{ height: 100, width: 110, borderRadius: 5 }}  resizeMode="contain"/>
            <View style={{
                height: 100,
                marginLeft: 15,
                paddingVertical: 15,
                flex: 1,
            }}>
                <Text style={{fontSize: 16, marginBottom: 5, fontFamily: FONTS.bold }}>{item.name}</Text>
                <View style={{flexDirection: "row"}}>
                <Text style={{fontFamily: FONTS.medium, fontSize: 12}}>{item.description}</Text>
                </View>
                
            </View>
            <View style={{ alignItems: "center", marginTop: 70}}>
                <View style={{}}>
                    <ButtonFlex title="Chi tiết" stylesButton={{paddingHorizontal: 20}} onPress={()=> navigation.navigate('DetailService', {booking: {service_type_id: item.id, service_type: item.name}} )} />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    itemCard: {
        height: "auto",
        elevation: 2,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        padding: 10,
        marginVertical: 5,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default ItemService;
