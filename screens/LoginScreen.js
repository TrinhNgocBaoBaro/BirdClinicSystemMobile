import React from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [noti, setNoti] = React.useState();
  const [focus, setFocus] = React.useState(false);

  const handleLogin = async () => {
    if (phone === "" || password === "") {
      setNoti("Vui lòng nhập tài khoản hoặc mật khẩu!");
      return;
    }

    try {
      const response = await API.post(
        `/login/?phone=${phone}&password=${password}`,
        {
            phone: "0354187011",
            password: "1",
        }
      );
      if (response.data) {
        const userData = response.data.account;
        AsyncStorage.setItem(
          "UserLoggedInData",
          JSON.stringify({ userData, loggedIn: true })
        )
          .then(() => {
            navigation.navigate("Home");
          })
          .catch((error) => {
            console.log(error);
          });
        setNoti();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setNoti("Sai tên tài khoản hoặc mật khẩu!");
    }
  };

  const checkLogin = async () => {
    const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData")
    if(UserLoggedInData){
      let udata = JSON.parse(UserLoggedInData);
      console.log("--------udata---------")
      console.log(udata)
      console.log("--------udata---------")
      navigation.navigate("Home");
    }
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

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

        <TextInput
          style={{
            justifyContent: "center",
            padding: 20,
            height: 60,
            width: '80%',
            backgroundColor: COLORS.white,
            marginTop: 30,
            marginBottom: 0,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focus === true ? COLORS.green : COLORS.darkGrey,
          }}
          placeholder="Số điện thoại"
          inputMode="numeric"
          keyboardType="numeric"
          onChangeText={(newTextPhone) => setPhone(newTextPhone)}
        />
        <TextInput
          style={{
            justifyContent: "center",
            padding: 20,
            height: 60,
            width: '80%',
            backgroundColor: COLORS.white,
            marginVertical: 10,
            marginHorizontal: 50,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focus === true ? COLORS.green : COLORS.darkGrey,
          }}
          placeholder="Mật khẩu"
          onChangeText={(newTextPassword) => setPassword(newTextPassword)}
          onFocus={() => setFocus(!focus)}
          onPressOut={() => setFocus(!focus)}
          secureTextEntry={true}
        />
        <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.green,
            marginBottom: 20,
          }}
        >
          Quên mật khẩu?
        </Text>
        <ButtonFlex
          title="Đăng nhập"
          onPress={handleLogin}
          stylesButton={{
            borderRadius: 20,
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginBottom: 20,
            elevation: 5,
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
        <TouchableOpacity
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
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: FONTS.medium }}>Chưa có tài khoản? </Text>
          <TouchableOpacity activeOpacity={0.5}>
            <Text style={{ color: COLORS.green, fontFamily: FONTS.bold }}>
              Đăng ký
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
