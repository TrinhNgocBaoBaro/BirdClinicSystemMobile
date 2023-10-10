import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, SafeAreaView, Dimensions, Pressable } from "react-native";
import React from "react";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height

export default function ProfileScreen({ navigation }) {
  const cacheAndCellularItems = [
    {
      icon: "person-circle-outline",
      text: "Cài đặt tài khoản",
      sub: "create-outline",
    },
  ];
  const accountItems = [
    {
      icon: "language-outline",
      text: "Ngôn ngữ",
      sub: "chevron-forward-outline",
    },
    {
      icon: "chatbubble-ellipses-outline",
      text: "Phản hồi",
      sub: "chevron-forward-outline"
    },
    {
      icon: "star-outline",
      text: "Đánh giá ứng dụng",
      sub: "chevron-forward-outline",
    },
    {
      icon: "download-outline",
      text: "Cập nhật",
      sub: "chevron-forward-outline"
    },
  ];

  const renderSettingsItem = ({ icon, text, sub }) => (
    <TouchableOpacity activeOpacity={0.8}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 20,
        backgroundColor: COLORS.white,
      }}>
      <Icon name={icon} size={24} color="grey" />
      <Text style={{
        marginLeft: 15,
        fontWeight: 600,
        fontSize: 15,
        minWidth: 200,
      }}>
        {text}
      </Text>
      <Icon
        name={sub}
        size={24}
        color="grey"
        style={{
          marginLeft: 70,
          fontWeight: 600,
          fontSize: 24,
        }} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.top}>
        <Pressable onPress={()=> navigation.goBack()}>
        <View style={{ height: 40, width: 40, marginLeft: 20, justifyContent: 'center' }}>
          <Icon name="chevron-back-outline" size={30} color={"black"} />
        </View>
        </Pressable>
        <View style={{ justifyContent: 'center' }}>
          <Text>
            <Text style={styles.typeText1}>Bird</Text>
            <Text style={styles.typeText2}>Clinic</Text>
          </Text>
        </View>
        <View style={{ marginRight: 20, height: 40, width: 40, justifyContent: 'center' }}>
        </View>
      </View>
      <View style={styles.itemCard}>
        <Image
          source={{ uri: "https://banner2.cleanpng.com/20180619/epr/kisspng-avatar-photo-booth-computer-icons-email-stewardess-5b292bfebc29e1.5698032815294248947707.jpg" }}
          style={{ height: 50, width: 50, borderRadius: 50 }}
        />
        <View
          style={{
            height: 100,
            marginLeft: 25,
            paddingVertical: 32,
            flex: 1,
          }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            Trịnh Ngọc Bảo
          </Text>
          <Text style={{ fontSize: 13, color: "grey" }}>
            ngbao1592001@gmail.com
          </Text>
        </View>
        <View>
          <Icon
            name="notifications-outline"
            size={28}
            color={"grey"}
          />
        </View>
      </View>

      <ScrollView style={{ marginHorizontal: 20 }}>
        {/* Account */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginVertical: 10 }}>Tài khoản </Text>
          <View
            style={{
              backgrounColor: "grey",
              borderRadius: 5,
              overflow: "hidden",
              elevation: 2
            }}
          >
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={{ marginBottom: 12 ,elevation: 2}}>
          <Text style={{ marginVertical: 10 }}>Cài đặt</Text>
          <View
            style={{
              borderRadius: 5,
              backgrounColor: COLORS.gray,
              overflow: "hidden",
              elevation: 2
            }}
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ justifyContent: "center", alignItems: "center" }}
              onPress={()=>{navigation.navigate("Login")}}
          >
            <View style={styles.btnContainer}>
              <Text style={styles.btnText}>
                <Text>Đăng xuất</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemCard: {
    height: 80,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    marginVertical: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "500",
    fontSize: 16,
    
  },
  btnContainer: {
    backgroundColor: "red",
    height: 35,
    width: 130,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    
  },
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: COLORS.green,
  },
  top: {
    marginTop: windowHeight * 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 80
  },

  typeText1: {
    fontSize: 24,
    color: COLORS.black,
    fontWeight: 'bold'
  },
  typeText2: {
    fontSize: 24,
    color: COLORS.green,
    fontWeight: 'bold'
  },
});

