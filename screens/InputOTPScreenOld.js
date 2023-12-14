import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, 
} from "react-native";
import COLORS from "../constants/color";
import { TextInput } from "react-native-gesture-handler";
import { SvgBirdBackground } from "../components/Svg";
import { ButtonFlex } from "../components/Button";
import FONTS from "../constants/font";
import createAxios from "../utils/axios";
const API = createAxios();
// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

// import { socket } from "../App";
// import io from "socket.io-client";
// const socket = io("https://clinicsystem.io.vn");
// export {socket}
export default function InputOTPScreenOld({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [noti, setNoti] = React.useState();
  const [focusPhone, setFocusPhone] = React.useState(false);
  const [focusPassword, setFocusPassword] = React.useState(false);
  const [showHidePassword, setShowHidePassword] = React.useState(true);

  let textInput = useRef(null);
  const lengthInput = 6;
  const [internalVal, setInternalVal] = React.useState("");
  const onChangeText = (value) => {
    setInternalVal(value)
  };

  React.useEffect(() => {
    textInput.focus();
  }, []);

  React.useEffect(()=>{
    console.log("TextInternalVal: ", internalVal)
  },[internalVal])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.typeText1}>
            Bird
            <Text style={styles.typeText2}>Clinic</Text>
          </Text>
        </View>
        <SvgBirdBackground width={100} height={100} />

        {/* <TextInput
          style={{
            justifyContent: "center",
            padding: 20,
            height: 60,
            width: "80%",
            backgroundColor: COLORS.white,
            marginTop: 30,
            marginBottom: 0,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focusPhone === true ? COLORS.green : COLORS.darkGrey,
            fontFamily: FONTS.semiBold,
            elevation: 3,
          }}
          placeholder="Nhập OTP"
          inputMode="numeric"
          keyboardType="numeric"
          onChangeText={(newTextPhone) => setPhone(newTextPhone)}
          onFocus={() => setFocusPhone(!focusPhone)}
          onBlur={() => setFocusPhone(!focusPhone)}
        /> */}
        <Text style={{ fontFamily: FONTS.semiBold, marginTop: 40, marginBottom: 10 }}>Nhập mã OTP bên dưới</Text>
        <View>
          <TextInput
            ref={(input)=> textInput = input}
            onChangeText={onChangeText}
            style={{ width: 1, height: 1 }}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
            autoFocus={true}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  style={{
                    paddingVertical: 11,
                    width: 40,
                    margin: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1.5,
                    borderBottomColor: index === internalVal.length ? COLORS.green : COLORS.black
                  }}
                  key={index}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 16, fontFamily: FONTS.semiBold }}
                    onPress={() => textInput.focus()}
                  >
                    {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                  </Text>
                </View>
              ))
              }
          </View>
        </View>
        <ButtonFlex
          title="Xác nhận"
          //   onPress={handleLogin}
          stylesButton={{
            borderRadius: 20,
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginBottom: 20,
            elevation: 5,
            marginTop: 30,
          }}
          stylesText={{ fontSize: 16 }}
        />
        {noti && (
          <Text
            style={{ fontFamily: FONTS.bold, fontSize: 12, color: COLORS.red }}
          >
            {noti}
          </Text>
        )}
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 40,
            padding: 10,
            width: 250,
            backgroundColor: COLORS.greyPastel,
            elevation: 3,
            borderRadius: 10,
          }}
        >
          <Image
            source={require("../assets/GoogleLogin.png")}
            style={{ height: 30, width: 30, borderRadius: 50, marginRight: 10 }}
          />
          <Text style={{ fontFamily: FONTS.bold }}>Sign In with Google</Text>
        </TouchableOpacity> */}
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: FONTS.medium }}>Đã có tài khoản? </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: COLORS.green, fontFamily: FONTS.bold }}>
              Quay lại đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
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
