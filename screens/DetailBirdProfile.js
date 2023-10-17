import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/color";
import Header from "../components/Header";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import FONTS from "../constants/font";
import { ButtonFlex } from "../components/Button";
import Icon from "react-native-vector-icons/Ionicons";

const dataMedicalRecord = [
  {
    id: "1",
    dateMedical: "25/03/2022",
  },
  {
    id: "2",
    dateMedical: "24/07/2022",
  },
  {
    id: "3",
    dateMedical: "30/09/2022",
  },
  {
    id: "4",
    dateMedical: "14/03/2023",
  },
  {
    id: "5",
    dateMedical: "26/04/2023",
  },
  {
    id: "6",
    dateMedical: "15/09/2023",
  },
  {
    id: "7",
    dateMedical: "15/09/2023",
  },
  {
    id: "8",
    dateMedical: "15/09/2023",
  },
];

const DetailBirdProfile = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <Header
        title="Chi tiết hồ sơ"
        rightIcon={
          selectedIndex === 0 ? "create-outline" : "document-text-outline"
        }
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <SegmentedControl
            values={["Thông tin", "Hồ sơ bệnh án"]}
            selectedIndex={selectedIndex}
            fontStyle={{ fontFamily: FONTS.medium }}
            onChange={(e) => {
              setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        {selectedIndex === 0 && (
          <View style={styles.birdProfileContainer}>
            <View style={styles.grayBackground}></View>
            <View style={styles.outBorderImage}>
              <Image
                source={{ uri: route.params.BirdDetail.image }}
                style={{ height: 190, width: 190, borderRadius: 100 }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: COLORS.white,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  color: COLORS.green,
                  fontFamily: FONTS.bold,
                  fontSize: 18,
                }}
              >
                {route.params.BirdDetail.name}
              </Text>
            </View>
            <View style={styles.profileContainer}>
              <View
                style={{
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.white,
                  padding: 10,
                  width: 120,
                }}
              >
                <Text style={styles.textAttribute}>15/09/2023</Text>
                <Text style={styles.textNameAttribute}>Ngày nở</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.white,
                  padding: 10,
                  width: 120,
                }}
              >
                <Text style={styles.textAttribute}>Đực</Text>
                <Text style={styles.textNameAttribute}>Giới tính</Text>
              </View>
              <View style={{ alignItems: "center", padding: 10, width: 120 }}>
                <Text style={styles.textAttribute}>Lớn</Text>
                <Text style={styles.textNameAttribute}>Kích thước</Text>
              </View>
            </View>
            <View style={styles.profileContainer}>
              <View
                style={{
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.white,
                  padding: 10,
                  width: 120,
                }}
              >
                <Text style={styles.textAttribute}>Xám vàng</Text>
                <Text style={styles.textNameAttribute}>Màu sắc</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  borderRightWidth: 1,
                  borderColor: COLORS.white,
                  padding: 10,
                  width: 120,
                }}
              >
                <Text style={styles.textAttribute}>Không</Text>
                <Text style={styles.textNameAttribute}>Giống</Text>
              </View>
              <View style={{ alignItems: "center", padding: 10, width: 120 }}>
                <Text style={styles.textAttribute}>Không</Text>
                <Text style={styles.textNameAttribute}>Microchip</Text>
              </View>
            </View>
          </View>
        )}
        {selectedIndex === 1 && (
          // <View style={styles.empty}>
          //   <Image
          //     source={require("../assets/EmptyMedicalRecord.jpg")}
          //     style={{
          //       height: 250,
          //       width: 250,
          //       resizeMode: "contain",
          //       marginTop: -50,
          //     }}
          //   />

          //   <Text style={{ color: COLORS.grey, fontFamily: FONTS.bold }}>
          //     Chưa có hồ sơ bệnh án.
          //   </Text>
          // </View>
          <FlatList
            data={dataMedicalRecord}
            renderItem={({ item, index }) => (
              <View
                style={{
                  flexDirection: "row",
                  height: "auto",
                  backgroundColor: COLORS.white,
                  marginTop: 5,
                  marginHorizontal: 20,
                  marginBottom: 15,
                  borderRadius: 10,
                  elevation: 5,
                  padding: 10,
                }}
              >
                <Icon
                  name={"document-text-outline"}
                  size={70}
                  color={COLORS.green}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={[styles.textAttribute, { color: COLORS.black }]}>
                    Ngày khám: {item.dateMedical}
                  </Text>
                  <Icon
                    name={"information-circle-outline"}
                    size={30}
                    color={COLORS.green}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  birdProfileContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    marginTop: 20,
  },
  outBorderImage: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 200,
    width: 200,
    elevation: 3,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    width: 360,
    elevation: 2,
    backgroundColor: COLORS.green,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 300,
  },
  textNameAttribute: {
    fontFamily: FONTS.medium,
    color: COLORS.white,
  },
  textAttribute: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 15,
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  grayBackground: {
    position: "absolute",
    top: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.greyPastel,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default DetailBirdProfile;
