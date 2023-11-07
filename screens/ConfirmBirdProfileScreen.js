import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import { SvgBirdIcon } from "../components/Svg";
import { ButtonFloatBottom } from "../components/Button";
import { UIActivityIndicator } from 'react-native-indicators';
import createAxios from "../utils/axios";
const API = createAxios();
const ConfirmBirdProfileScreen = ({ navigation, route }) => {
  const [booking, setBooking] = React.useState(route.params.booking);
  const [dataBirdInfo, setDataBirdInfo] = React.useState();
  console.log(
    "------------------------------------------------------------------------------"
  );
  console.log(booking);
  const bird_id = booking.bird_id;
  console.log("Bird ID: ", bird_id);

  const fetchData = async () => {
    try {
      const response = await API.get(`/bird/${bird_id}`);
      if (response.data) {
        console.log(response.data);
        setDataBirdInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (bird_id) fetchData();
  }, [bird_id]);

  return (
    <>
      <Header title="Xác nhận thông tin" onPress={() => navigation.goBack()} />
      {dataBirdInfo ? (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
          <View
            style={{
              margin: 20,
              backgroundColor: COLORS.white,
              borderRadius: 5,
              elevation: 3,
              padding: 10,
              // borderWidth: 1,
              // borderColor: COLORS.green
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <SvgBirdIcon width={50} height={50} />
                <Text style={{ fontFamily: FONTS.bold }}>THÔNG TIN CHIM</Text>
              </View>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Tên</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.name}</Text>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Giới tính</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.gender}</Text>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Ngày nở</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.hatching_date}</Text>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Màu sắc</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.color}</Text>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Giống</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.breed}</Text>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Microchip</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.ISO_microchip}</Text>
            </View>
            <View style={styles.rowInfo}>
              <Text style={styles.textAttribute}>Kích thước</Text>
              <Text style={styles.textInfo}>{dataBirdInfo.size}</Text>
            </View>
            <Image
              source={{ uri: dataBirdInfo.image }}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                height: 100,
                width: 100,
                borderRadius: 5,
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <UIActivityIndicator size={40} color={COLORS.green} />
        </View>
      )}

      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={COLORS.green}
        onPress={() =>
          navigation.navigate("SelectTypeBooking", { booking: booking })
        }
      />
    </>
  );
};

export default ConfirmBirdProfileScreen;

const styles = StyleSheet.create({
  rowInfo: {
    flexDirection: "row",
    marginBottom: 10,
  },
  textAttribute: {
    width: 90,
    fontFamily: FONTS.bold,
    color: COLORS.grey,
  },
  textInfo: {
    fontFamily: FONTS.bold,
    color: COLORS.black,
  },
});
