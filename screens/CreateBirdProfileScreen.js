import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import { ButtonFloatBottom } from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

import createAxios from "../utils/axios";
import { ButtonFlex } from "../components/Button";
const API = createAxios();

const dataGender = [
  { label: "Đực", value: "Đực" },
  { label: "Cái", value: "Cái" },
];

// const dataBreed = [
//     { label: "Chim sẻ", value: "1" },
//     { label: "Chim hút mật", value: "2" },
//     { label: "Vành khuyên", value: "3" },
//     { label: "Vành khuyên", value: "4" },
//     { label: "Vành khuyên", value: "5" },
//     { label: "Vành khuyên", value: "6" },
//     { label: "Vành khuyên", value: "7" },
//     { label: "Vành khuyên", value: "8" },
//     { label: "Vành khuyên", value: "9" },
// ];

const CreateBirdProfileScreen = ({ navigation }) => {
  const [valueGender, setValueGender] = React.useState(null);
  const [valueBreed, setValueBreed] = React.useState(null);
  const [valueName, setValueName] = React.useState("");
  const [valueColor, setValueColor] = React.useState("");
  const [valueHatchingDate, setValueHatchingDate] = React.useState("");
  const [image, setImage] = React.useState(null);

  const [userData, setUserData] = React.useState();
  const [dataBreed, setDataBreed] = React.useState();

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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const getUserData = async () => {
    const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
    if (UserLoggedInData) {
      let udata = JSON.parse(UserLoggedInData);
      console.log(udata.userData);
      setUserData(udata.userData);
    }
  };

  const fetchDataBirdBreed = async () => {
    try {
      const response = await API.get(`/bird-breed/`);
      if (response.data) {
        console.log("Đã fetch data bird breed");
        setDataBreed(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getUserData();
    fetchDataBirdBreed();
  }, []);

  //   React.useEffect(() => {
  //     console.log("Name: ", valueName)
  //   }, [valueName]);

  const createBirdProfile = async () => {
    try {
      const formDataCreateBird = new FormData();
      const localUri = image.uri;
      const filename = localUri.split("/").pop();
      const fileExtension = filename.split(".").pop();

      formDataCreateBird.append("image", {
        uri: localUri,
        name: filename,
        type: `image/${fileExtension}`,
      });
      formDataCreateBird.append("customer_id", userData.account_id);
      formDataCreateBird.append("name", valueName);
      formDataCreateBird.append("gender", valueGender);
      formDataCreateBird.append("hatching_date", valueHatchingDate);
      formDataCreateBird.append("ISO_microchip", "Không");
      formDataCreateBird.append("color", valueColor);
      formDataCreateBird.append("breed_id", valueBreed);
      formDataCreateBird.append("status", "1");

      const response = await API.postWithHeaders(`/bird/`, formDataCreateBird, {
        "Content-Type": "multipart/form-data",
      });

      if (response) {
        console.log("Response trả về: ", response);
        setValueName("");
        setValueColor("");
        setValueGender();
        setValueHatchingDate("");
        setValueBreed();
        setImage();
        Alert.alert(
          "Thông báo",
          `Tạo hồ sơ chim thành công! \nChim: ${valueName}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        title="Thêm hồ sơ chim"
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 80 }}
      >
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
            style={{ fontFamily: FONTS.medium, fontSize: 13, marginLeft: 10 }}
          >
            Vui lòng nhập đầy đủ thông tin hồ sơ bên dưới để thêm hồ sơ chim.
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
          <View style={{borderRadius: 8, elevation: 3, padding: 5, backgroundColor: COLORS.white}}>
          <Image
            source={{
              uri: image
                ? image.uri
                : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
            }}
            style={{ width: 300, height: 225, borderRadius: 5 }}
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
              marginBottom: 30,
            }}
          >
            <Icon name="image-outline" size={20} color={COLORS.black} />
            <Text style={{ fontFamily: FONTS.semiBold }}>
              {" "}
              {image ? "Thay đổi hình ảnh" : "Chọn hình ảnh từ thư viện"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <Text style={{ fontFamily: FONTS.semiBold }}>Tên chim:</Text>
          <TextInput
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.darkGrey,
              fontFamily: FONTS.semiBold,
              fontSize: 13
            }}
            value={valueName}
            placeholder="VD: Chào mào xanh, Vẹt đỏ..."
            onChangeText={(newTextName) => setValueName(newTextName)}
          />
        </View>
        <View style={{ marginHorizontal: 30, flexDirection: "row" }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontFamily: FONTS.semiBold }}>Màu sắc:</Text>
            <TextInput
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: COLORS.white,
                marginVertical: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: COLORS.darkGrey,
                fontFamily: FONTS.semiBold,
                fontSize: 13
              }}
              value={valueColor}
              placeholder="VD: Hồng đen, xanh lá.."
              onChangeText={(newTextColor) => setValueColor(newTextColor)}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: FONTS.semiBold }}>Giới tính:</Text>
            <Dropdown
              style={[styles.dropdown]}
              containerStyle={{ borderRadius: 10 }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={dataGender}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Chọn giới tính"}
              value={valueGender}
              onChange={(item) => {
                setValueGender(item.value);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={COLORS.grey}
                  name="male-female"
                  size={20}
                />
              )}
            />
          </View>
        </View>
        <View style={{ marginHorizontal: 30 }}>
          <Text style={{ fontFamily: FONTS.semiBold }}>Ngày nở:</Text>
          <TextInput
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              marginVertical: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS.darkGrey,
              fontFamily: FONTS.semiBold,
              fontSize: 13
            }}
            value={valueHatchingDate}
            placeholder={"♥ dd/MM/yyyy VD: 15/09/2023"}
            onChangeText={(newTextHatchingDate) =>
              setValueHatchingDate(newTextHatchingDate)
            }
          />
        </View>
        <View style={{ marginHorizontal: 30, marginBottom: 20 }}>
          <Text style={{ fontFamily: FONTS.semiBold }}>Giống:</Text>
          {dataBreed && (
            <Dropdown
              style={[styles.dropdown]}
              containerStyle={{ borderRadius: 10 }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              dropdownPosition={"top"}
              autoScroll={false}
              data={dataBreed}
              maxHeight={300}
              labelField="breed"
              valueField="breed_id"
              placeholder={"Chọn giống"}
              value={valueBreed}
              onChange={(item) => {
                setValueBreed(item.breed_id);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={COLORS.grey}
                  name="information-outline"
                  size={20}
                />
              )}
            />
          )}
        </View>
      </ScrollView>
      <ButtonFloatBottom
        title="Xác nhận"
        buttonColor={
          image &&
          valueName &&
          valueColor &&
          valueGender &&
          valueHatchingDate &&
          valueBreed
            ? COLORS.green
            : COLORS.grey
        }
        onPress={() => {
          if (
            image &&
            valueName &&
            valueColor &&
            valueGender &&
            valueHatchingDate &&
            valueBreed
          ) {
            createBirdProfile();
          } else {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin!")
          }
        }}
      />
    </>
  );
};

export default CreateBirdProfileScreen;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: COLORS.darkGrey,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    marginVertical: 10,
    width: "auto",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: COLORS.white,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: COLORS.lightGrey,
    fontFamily: FONTS.semiBold,
    fontSize: 13
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
