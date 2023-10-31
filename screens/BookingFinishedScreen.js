import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import { ButtonFlex } from "../components/Button";
import createAxios from "../utils/axios";
const API = createAxios();


const BookingFinishedScreen = ({navigation,route}) => {
  const [booking, setBooking] = React.useState(route.params.booking);
     console.log("Booking Final nè: ", booking)

  const [thongBao, setThongBao] = React.useState("");
  const fetchData = async () => {
    try {
      const response = await API.post(
        `/booking`,
        booking
      );
      if (response) {
        console.log(response);
        setThongBao("Success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (booking) fetchData();
  }, [booking]);


  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/success-icon.png")}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        <Text
          style={{ fontFamily: FONTS.bold, fontSize: 18, marginBottom: 10 }}
        >
          Đặt lịch khám thành công!
        </Text>
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 15,
            textAlign: "center",
            width: "80%",
            marginBottom: 150,
          }}
        >
          Cảm ơn bạn đã đặt lịch của phòng khám chúng tôi.
        </Text>
        <ButtonFlex
          title="Quay lại trang chủ"
          onPress={()=>navigation.navigate('Trang chủ')}
          stylesButton={{ paddingVertical: 10, paddingHorizontal: 80 }}
          stylesText={{ fontSize: 15 }}
        />
      </View>
    </>
  );
};

export default BookingFinishedScreen;

const styles = StyleSheet.create({});
