import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Dimensions } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import MainHeader from "../components/MainHeader";
import COLORS from "../constants/color";
import { ButtonFlex } from "../components/Button";
import FONTS from "../constants/font";
import ItemBird from "../components/ItemBird";
import createAxios from "../utils/axios";
const API = createAxios();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { UIActivityIndicator } from 'react-native-indicators';


// const dataBird = [
//   // {
//   //   id: "1",
//   //   image:
//   //     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg",
//   //   name: "Ngoc Long",
//   //   size: "Vừa",
//   //   sex: "Cái"
//   // },
//   // {
//   //   id: "2",
//   //   image:
//   //     "https://cdn.download.ams.birds.cornell.edu/api/v1/asset/202984001/1200",
//   //   name: "Tri cong",
//   //   size: "Vừa",
//   //   sex: "Đực"
//   // },
//   // {
//   //   id: "3",
//   //   image:
//   //     "https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg",
//   //   name: "LeHuu",
//   //   size: "Vừa",
//   //   sex: "Cái"

//   // },
//   // {
//   //   id: "4",
//   //   image:
//   //     "https://upload.wikimedia.org/wikipedia/commons/3/32/House_sparrow04.jpg",
//   //   name: "Ngoc Bao",
//   //   size: "Vừa",
//   //   sex: "Đực"
//   // },
//   // {
//   //   id: "5",
//   //   image:
//   //     "https://debspark.audubon.org/sites/default/files/styles/hero_mobile/public/western_tanager_usfws.jpg?itok=30SSiFxC",
//   //   name: "Ngoc Long",
//   //   size: "Vừa",
//   //   sex: "Đực"
//   // },
//   // {
//   //   id: "6",
//   //   image:
//   //     "https://static.scientificamerican.com/sciam/cache/file/7A715AD8-449D-4B5A-ABA2C5D92D9B5A21_source.png?w=590&h=800&756A88D1-C0EA-4C21-92BE0BB43C14B265",
//   //   name: "Quang Khai",
//   //   size: "Vừa",
//   //   sex: "Cái"
//   // },
//   // {
//   //   id: "7",
//   //   image:
//   //     "https://www.thespruce.com/thmb/7i24MewNuomTbv-I9mUxLx8l-yc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/what-is-a-bird-385521-hero-645b1041792147b88f3ccdf712f11a04.jpg",
//   //   name: "Hai Nam",
//   //   size: "Vừa",
//   //   sex: "Cái"
//   // },
// ];

const deviceHeight = Dimensions.get('window').height
export default function BirdScreen({ navigation }) {
  const [userData, setUserData] = React.useState();
  const [dataBird, setDataBird] = React.useState();

  const isFocused = useIsFocused();

  const getUserData = async () => {
    const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
    if (UserLoggedInData) {
      let udata = JSON.parse(UserLoggedInData);
      console.log(udata.userData);
      setUserData(udata.userData);
    }
  };

  const fetchDataBird = async () => {
    try {
      const response = await API.get(`/bird/all/${userData.account_id}`);
      if (response.data) {
        console.log("Đã fetch data bird")
        setDataBird(response.data);
        }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(()=>{
    setDataBird()
    if(userData && isFocused) fetchDataBird();
  },[userData, isFocused])

  return (
    <>
      <MainHeader navigation={navigation} />
      <View style={styles.container}>
        <StatusBar style="auto" />
        {dataBird ? (dataBird.length === 0 ? (
          <View style={{ height: deviceHeight* 0.65, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require("../assets/splashbirdpng.png")} style={{width: 400, height: 300}}/>
            <Text style={styles.textEmpty}>Chưa có hồ sơ chim !</Text>
          </View>
        ) : 
        (
          <FlatGrid
          itemDimension={130}
          spacing={20}
          data={dataBird}
          renderItem={({ item }) => (
            <ItemBird item={item} navigation={navigation} onPress={()=>navigation.navigate('DetailBirdProfile',{bird_id: item.bird_id})}/>
          )}
          keyExtractor={(item) => item.bird_id}
          style={{ maxHeight: deviceHeight* 0.65 }}
        />
        )
          
          
        ):
        (<View
          style={{
            height: deviceHeight* 0.65,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <UIActivityIndicator size={40} color={COLORS.green} />
        </View>)
        }
        
        <View style={{ marginHorizontal: 100, marginVertical: 20 }}>
          <ButtonFlex onPress={()=>navigation.navigate("CreateBirdProfile")} title="Thêm hồ sơ chim" stylesText={{ fontSize: 15 }} stylesButton={{paddingVertical:15, borderRadius: 10, elevation: 2}} />
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
  textEmpty: {
    color: COLORS.grey,
    fontFamily: FONTS.bold,
    fontSize: 17,
    marginTop: 10,
  },
});
