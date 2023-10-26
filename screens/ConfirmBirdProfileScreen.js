import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import { SvgBirdIcon } from "../components/Svg";
import { ButtonFloatBottom } from "../components/Button";
const ConfirmBirdProfileScreen = ({ navigation, route }) => {
  const bird = route.params.Bird;
  return (
    <>
      <Header title="Xác nhận thông tin" onPress={() => navigation.goBack()} />
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
            <Text style={styles.textInfo}>{bird.name}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.textAttribute}>Giới tính</Text>
            <Text style={styles.textInfo}>{bird.sex}</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.textAttribute}>Ngày nở</Text>
            <Text style={styles.textInfo}>15/09/2023</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.textAttribute}>Màu sắc</Text>
            <Text style={styles.textInfo}>Xanh dương</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.textAttribute}>Giống</Text>
            <Text style={styles.textInfo}>Không</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.textAttribute}>Microchip</Text>
            <Text style={styles.textInfo}>Không</Text>
          </View>
          <View style={styles.rowInfo}>
            <Text style={styles.textAttribute}>Kích thước</Text>
            <Text style={styles.textInfo}>{bird.size}</Text>
          </View>
          <Image
            source={{ uri: bird.image }}
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
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={COLORS.green}
        onPress={() => navigation.navigate("SelectTypeBooking")}
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
