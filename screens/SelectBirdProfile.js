import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { ButtonFloatBottom } from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import createAxios from "../utils/axios";
const API = createAxios();
const dataBird1 = [
  {
    id: "1",
    name: "Con vẹt xanh lá",
    image:
      "https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg",
    gender: "Đực",
    size: "Lớn",
  },
  {
    id: "2",
    name: "Con vẹt lam",
    image:
      "https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg",
    gender: "Cái",
    size: "Siêu nhỏ",
  },
];

const SelectBirdProfile = ({ navigation, route }) => {
  const [booking, setBooking] = React.useState(route.params.booking);
  const [selectedItem, setSelectedItem] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [dataBird, setDataBird] = React.useState();
  const getUserData = async () => {
    const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
    if (UserLoggedInData) {
      let udata = JSON.parse(UserLoggedInData);
      console.log(udata.userData);
      setUserData(udata.userData);
    }
  };

  const fetchData = async () => {
    try {
      const response = await API.get(`/bird/all/${userData.customer_id}`);
      if (response.data) {
        console.log(response.data);
        setDataBird(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(() => {
    if (userData) fetchData();
  }, [userData]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    console.log(item.bird_id);
  };
  return (
    <>
      <Header
        title="Chọn hồ sơ chim"
        onPress={() => navigation.goBack()}
        rightIcon="create-outline"
      />
      <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 50,
            marginVertical: 30,
          }}
        >
          <Icon
            name="information-circle-outline"
            size={23}
            color={COLORS.green}
          />
          <Text
            style={{ fontFamily: FONTS.medium, fontSize: 12, marginLeft: 10 }}
          >
            Vui lòng chọn 1 trong các hồ sơ bên dưới, hoặc bấm vào biểu tượng ở
            trên để thêm hồ sơ chim.
          </Text>
        </View>

        {dataBird ? (
          dataBird.length !== 0 ? (
            <FlatList
              data={dataBird}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleSelectItem(item)}
                  activeOpacity={0.8}
                  style={[
                    {
                      backgroundColor: COLORS.white,
                      padding: 10,
                      marginHorizontal: 20,
                      marginTop: 10,
                      marginBottom: 5,
                      borderRadius: 10,
                      elevation: 2,
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "transparent",
                    },
                    item === selectedItem
                      ? {
                          borderWidth: 1,
                          borderColor: COLORS.green,
                          elevation: 5,
                        }
                      : "",
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 80, width: 80, borderRadius: 5 }}
                  />
                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                      paddingLeft: 20
                    }}
                  >
                    <Text style={{ fontFamily: FONTS.semiBold, fontSize: 16 }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.medium,
                        fontSize: 12,
                        color: COLORS.grey,
                      }}
                    >
                      Size: {item.size}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.medium,
                        fontSize: 12,
                        color: COLORS.grey,
                      }}
                    >
                      Giới tính: {item.gender}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.bird_id}
              style={{ marginBottom: 80 }}
            />
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.white }}>
              <Text style={{fontFamily: FONTS.semiBold}}>Mình khẳng định bạn không có chim!</Text>
            </View>
          )
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.white }}>
            <ActivityIndicator size="large" color={COLORS.green} />
          </View>
        )}
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={selectedItem ? COLORS.green : COLORS.grey}
        onPress={() => {
          if (selectedItem)
            navigation.navigate("ConfirmBirdProfile", {
              booking: {
                ...booking,
                bird_id: selectedItem.bird_id,
                account_id: userData.account_id,
                customer_name: userData.name,
              },
            });
          else console.log("No item selected");
        }}
      />
    </>
  );
};

export default SelectBirdProfile;

const styles = StyleSheet.create({});
