import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { SvgDoctor, SvgCalendar } from "../components/Svg";
const SelectTypeBookingScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = React.useState(false);
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    console.log(item)
  }
  return (
    <>
      <Header
        title="Chọn hình thức đặt lịch"
        onPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
            Vui lòng chọn 1 trong các hình thức sau.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>handleSelectItem("chooseDoctor")}
          style={{
            padding: 20,
            marginHorizontal: 50,
            marginVertical: 10,
            backgroundColor: COLORS.white,
            elevation: 3,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: selectedItem === 'chooseDoctor' ? COLORS.green : 'transparent'
          }}
        >
            <SvgDoctor width={100} height={100}/>
            <Text style={{marginTop: 10, fontFamily: FONTS.bold}}>THEO BÁC SĨ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={()=>handleSelectItem("chooseDate")}
          style={{
            padding: 20,
            marginHorizontal: 50,
            marginVertical: 10,
            backgroundColor: COLORS.white,
            elevation: 3,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: selectedItem === 'chooseDate' ? COLORS.green : 'transparent'
          }}
        >
            <SvgCalendar width={100} height={100}/>
            <Text style={{marginTop: 10, fontFamily: FONTS.bold}}>THEO NGÀY</Text>
        </TouchableOpacity>
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={ selectedItem ? COLORS.green : COLORS.grey}
        onPress={() => {
          if (selectedItem === 'chooseDoctor') {
            navigation.navigate('ChooseDoctor');
          } else if (selectedItem === 'chooseDate') {
            navigation.navigate('ScreenChooseDate');
          }
        }}
      />
    </>
  );
};

export default SelectTypeBookingScreen;

const styles = StyleSheet.create({});
