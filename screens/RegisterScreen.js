import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert
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
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen({ navigation, route }) {
  const [phone, setPhone] = React.useState(route?.params.phone);
  const [password, setPassword] = React.useState("");
  const [noti, setNoti] = React.useState();
  const [focusPassword, setFocusPassword] = React.useState(false);
  const [showHidePassword, setShowHidePassword] = React.useState(true);
  const [name, setName] = React.useState("");
  const [focusName, setFocusName] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [focusEmail, setFocusEmail] = React.useState(false);
  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const createCustomer = async () => {
    try {

      const responseAccount = await API.post(`/account/`, {
        email: email,
        password: password,
        phone: "0" + phone,
        role: "customer",
        status: "active",
      });
      if(responseAccount.data) {
        console.log("Data account: ", responseAccount.data)
        const formDataCreateCustomer = new FormData();
        const localUri = image.uri;
        const filename = localUri.split("/").pop();
        const fileExtension = filename.split(".").pop();
        formDataCreateCustomer.append("image", {
          uri: localUri,
          name: filename,
          type: `image/${fileExtension}`,
        });
        formDataCreateCustomer.append("account_id", responseAccount.data.account_id);
        formDataCreateCustomer.append("email", email);
        formDataCreateCustomer.append("address", "Việt Nam, Trái Đất");
        formDataCreateCustomer.append("name", name);
        formDataCreateCustomer.append("phone", "0"+phone);
        formDataCreateCustomer.append("status", "1");
  
        const responseCustomer = await API.postWithHeaders(`/customer/`, formDataCreateCustomer, {
          "Content-Type": "multipart/form-data",
        });
  
        if (responseCustomer) {
          console.log("Response customer trả về: ", responseCustomer);
          Alert.alert(
            "Thông báo",
            `Tạo tài khoản thành công!`
          );
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    console.log("Phone: ", phone);
  }, [phone]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.typeText1}>
            Regis
            <Text style={styles.typeText2}>ter</Text>
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 40,
            marginVertical: 10,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Icon name="checkmark-circle" size={21} color={COLORS.green} />
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              textAlign: "center",
              lineHeight: 23,
            }}
          >
            {" "}
            Số điện thoại +84{phone} đã được xác minh thành công!
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <View style={{borderRadius: 100, elevation: 3, padding: 5, backgroundColor: COLORS.white}}>
          <Image
            source={{
              uri: image
                ? image.uri
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
            resizeMode="cover"
          /></View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={pickImage}
            activeOpacity={0.7}
            style={{
              backgroundColor: COLORS.white,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              elevation: 3,
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            <Icon name="image-outline" size={20} color={COLORS.black} />
            <Text style={{ fontFamily: FONTS.semiBold }}>
              {" "}
              {image ? "Thay đổi hình ảnh" : "Chọn hình ảnh từ thư viện"}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            justifyContent: "center",
            padding: 20,
            height: 60,
            width: "80%",
            backgroundColor: COLORS.white,
            marginBottom: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focusName === true ? COLORS.green : COLORS.darkGrey,
            fontFamily: FONTS.semiBold,
            elevation: 3,
          }}
          placeholder="Họ tên"
          onChangeText={(newTextName) => setName(newTextName)}
          onFocus={() => setFocusName(!focusName)}
          onBlur={() => setFocusName(!focusName)}
        />
        <TextInput
          style={{
            justifyContent: "center",
            padding: 20,
            height: 60,
            width: "80%",
            backgroundColor: COLORS.white,
            marginBottom: 0,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focusEmail === true ? COLORS.green : COLORS.darkGrey,
            fontFamily: FONTS.semiBold,
            elevation: 3,
          }}
          placeholder="Email"
          onChangeText={(newTextEmail) => setEmail(newTextEmail)}
          onFocus={() => setFocusEmail(!focusEmail)}
          onBlur={() => setFocusEmail(!focusEmail)}
        />
        <View
          style={{
            width: "80%",
            marginHorizontal: 50,
            marginVertical: 10,
          }}
        >
          <TextInput
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              height: 60,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderRadius: 10,
              borderColor:
                focusPassword === true ? COLORS.green : COLORS.darkGrey,
              fontFamily: FONTS.semiBold,
              elevation: 3,
            }}
            placeholder="Mật khẩu"
            onChangeText={(newTextPassword) => setPassword(newTextPassword)}
            onFocus={() => setFocusPassword(!focusPassword)}
            onBlur={() => setFocusPassword(!focusPassword)}
            secureTextEntry={showHidePassword}
          />
          {password && (
            <TouchableOpacity
              onPress={() => setShowHidePassword(!showHidePassword)}
              style={{ position: "absolute", right: 20, top: 15 }}
            >
              {showHidePassword === true ? (
                <Icon name="eye" size={26} color={COLORS.grey} />
              ) : (
                <Icon name="eye-off" size={26} color={COLORS.grey} />
              )}
            </TouchableOpacity>
          )}
        </View>
        {/* <View style={{
          width: '80%',
          marginHorizontal: 50,
          marginVertical: 10,
        }}>
        <TextInput
          style={{
            justifyContent: "center",
            alignItems: 'center',
            padding: 20,
            height: 60,
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: focusPassword === true ? COLORS.green : COLORS.darkGrey,
            fontFamily: FONTS.semiBold,
            elevation: 3
          }}
          placeholder="Mật khẩu"
          onChangeText={(newTextPassword) => setPassword(newTextPassword)}
          onFocus={() => setFocusPassword(!focusPassword)}
          onBlur={() => setFocusPassword(!focusPassword)}
          secureTextEntry={showHidePassword}
        />
        {password &&
          <TouchableOpacity onPress={()=>setShowHidePassword(!showHidePassword)} style={{position: 'absolute', right: 20, top: 15}}>
          {showHidePassword === true ? 
          <Icon name="eye" size={26} color={COLORS.grey}/> 
          :
          <Icon name="eye-off" size={26} color={COLORS.grey}/>
          }         
        </TouchableOpacity>
        }  
        </View> */}
        {/* <Text
          style={{
            fontFamily: FONTS.medium,
            fontSize: 12,
            color: COLORS.green,
            marginBottom: 20,
          }}
        >
          Quên mật khẩu?
        </Text> */}
        <ButtonFlex
          title="Đăng ký"
          onPress={() => createCustomer()}
          stylesButton={{
            borderRadius: 20,
            paddingHorizontal: 30,
            paddingVertical: 10,
            marginBottom: 20,
            elevation: 5,
            marginTop: 20,
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
