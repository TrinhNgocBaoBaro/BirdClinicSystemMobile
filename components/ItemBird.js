import React from 'react'
import { View, Text, Image } from 'react-native'
import COLORS from "../constants/color";

const ItemBird = ({item, navigation}) => {
  return (
    <View
              style={{
                backgroundColor: COLORS.white,
                elevation: 2,
                borderRadius: 8,
                padding: 10,
                height: 'auto',
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
              <Text style={{
                fontFamily: "Inter-Bold"
              }}>{item.name}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>   
              <Text style={{fontSize: 12, fontFamily: "Inter-Medium"}}>Size: {item.size}</Text>
              <Text style={{fontSize: 12, fontFamily: "Inter-Medium"}}>{item.sex}</Text>
              </View>
           

            </View>
  )
}

export default ItemBird