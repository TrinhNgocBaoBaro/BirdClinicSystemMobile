import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import { OTPVerification } from "@msg91comm/react-native-sendotp";
import { SvgBirdBackground } from "../components/Svg";
import { ButtonFlex } from "../components/Button";
import COLORS from "../constants/color";
import FONTS from "../constants/font";

const InputOTPScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = React.useState("");
  const [focusPhone, setFocusPhone] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.typeText1}>
          Sign
          <Text style={styles.typeText2}>Up</Text>
        </Text>
      </View>
      <SvgBirdBackground width={100} height={100} />
      <View 
        style={{
          width: '80%',
        }}>
        <TextInput
          style={{
            justifyContent: "center",
            padding: 20,
            paddingLeft: 70,
            height: 60,
            backgroundColor: COLORS.white,
            marginTop: 30,
            marginBottom: 0,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focusPhone === true ? COLORS.green : COLORS.darkGrey,
            fontFamily: FONTS.semiBold,
            elevation: 3,
          }}
          placeholder="Số điện thoại"
          inputMode="numeric"
          keyboardType="numeric"
          onChangeText={(newTextPhone) => setPhone(newTextPhone)}
          onFocus={() => setFocusPhone(!focusPhone)}
          onBlur={() => setFocusPhone(!focusPhone)}
        />
        <TouchableOpacity
          onPress={() => {}}
          style={{ position: "absolute", left: 20, top: 50 }}
        >
          <Text style={{fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.grey}}>+84 |</Text>
        </TouchableOpacity>
      </View>

      <ButtonFlex
        title="Xác minh số điện thoại"
        onPress={() => setModalVisible(true)}
        stylesButton={{
          borderRadius: 20,
          paddingHorizontal: 30,
          paddingVertical: 10,
          marginBottom: 20,
          elevation: 5,
          marginTop: 30
        }}
        stylesText={{ fontSize: 16, fontFamily: FONTS.semiBold }}
      />

      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontFamily: FONTS.medium }}>Đã có tài khoản? </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: COLORS.green, fontFamily: FONTS.bold }}>
            Quay lại đăng nhập
          </Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isModalVisible}>
        <OTPVerification
          onVisible={isModalVisible}
          identifier={"+84" + phone}
          onCompletion={(data) => {
            console.log(data); // Get your response of success/failure.
            if (data) {
              const newData = JSON.parse(data);
              if (newData.type === "success") {
                setModalVisible(false);
                navigation.navigate("Register", {phone: phone});
              } else if (newData.type === "error") {
                Alert.alert("Thông báo", "OTP không đúng.");
              } else if (newData.closeByUser) {
                navigation.goBack();
              }
            } else {
              Alert.alert("Thông báo", "Có lỗi xảy ra!");
            }
          }}
          widgetId={"336c6e617452343132343333"} // Get widgetId from MSG91 OTP Widget Configuration
          authToken={"411800TuqEAgy4b5WN657a0b32P1"}
          // Get authToken from MSG91 OTP Tokens
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  typeText1: {
    fontSize: 30,
    color: COLORS.black,
    fontFamily: "Inter-Black",
  },
  typeText2: {
    fontSize: 30,
    color: COLORS.green,
    fontFamily: "Inter-Black",
  },
});

export default InputOTPScreen;
