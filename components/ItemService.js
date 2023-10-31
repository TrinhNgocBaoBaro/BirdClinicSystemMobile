import React from "react";
import { StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import COLORS from "../constants/color";
import { ButtonFlex } from "./Button";

const ItemService = ({ item, navigation }) => {
    return (
        <View style={style.itemCard}>
            <Image source={{ uri: item.image }} style={{ height: 80, width: 80, borderRadius: 5 }} />
            <View style={{
                height: 100,
                marginLeft: 15,
                paddingVertical: 15,
                flex: 1,
            }}>
                <Text style={{fontSize: 16, marginBottom: 5, fontFamily: 'Inter-Bold' }}>{item.name}</Text>
                <View style={{flexDirection: "row"}}>
                <Text style={{ fontSize: 14, color: COLORS.grey, justifyContent: 'center', alignItems: 'center', marginRight:2}}>
                    <Icon name="information-circle-outline" size={17} color={COLORS.green} />                    
                </Text>
                <Text style={{fontFamily: 'Inter-Medium', fontSize: 12}}>{item.description}</Text>
                </View>
                
            </View>
            <View style={{ alignItems: "center", marginTop: 50}}>
                <View style={{}}>
                    <ButtonFlex title="Chi tiết" onPress={()=> navigation.navigate('DetailService', {booking: {service_type_id: item.id, service_type: item.name}} )} />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    itemCard: {
        height: 100,
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
