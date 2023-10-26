import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import MainHeader from "../components/MainHeader";
import COLORS from "../constants/color";
import { ButtonFlex } from "../components/Button";
import ItemBird from "../components/ItemBird";
const data = [
  {
    id: "1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg",
    name: "Ngoc Long",
    size: "Vừa",
    sex: "Cái"
  },
  {
    id: "2",
    image:
      "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/202984001/1200",
    name: "Tri cong",
    size: "Vừa",
    sex: "Đực"
  },
  {
    id: "3",
    image:
      "https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg",
    name: "LeHuu",
    size: "Vừa",
    sex: "Cái"

  },
  {
    id: "4",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg",
    name: "Ngoc Bao",
    size: "Vừa",
    sex: "Đực"
  },
  {
    id: "5",
    image:
      "https://debspark.audubon.org/sites/default/files/styles/hero_mobile/public/western_tanager_usfws.jpg?itok=30SSiFxC",
    name: "Ngoc Long",
    size: "Vừa",
    sex: "Đực"
  },
  {
    id: "6",
    image:
      "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png?w=590&h=800&756A88D1-C0EA-4C21-92BE0BB43C14B265",
    name: "Quang Khai",
    size: "Vừa",
    sex: "Cái"
  },
  {
    id: "7",
    image:
      "https://www.thespruce.com/thmb/7i24MewNuomTbv-I9mUxLx8l-yc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-a-bird-385521-hero-645b1041792147b88f3ccdf712f11a04.jpg",
    name: "Hai Nam",
    size: "Vừa",
    sex: "Cái"
  },
];

export default function BirdScreen({ navigation }) {

  return (
    <>
      <MainHeader navigation={navigation} />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <FlatGrid
          itemDimension={130}
          spacing={30}
          data={data}
          renderItem={({ item }) => (
            <ItemBird item={item} navigation={navigation} onPress={()=>navigation.navigate('DetailBirdProfile',{BirdDetail: item})}/>
          )}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 410 }}
        />
        <View style={{ marginHorizontal: 100, marginVertical: 20 }}>
          <ButtonFlex title="Thêm hồ sơ chim" stylesText={{ fontSize: 13 }} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
