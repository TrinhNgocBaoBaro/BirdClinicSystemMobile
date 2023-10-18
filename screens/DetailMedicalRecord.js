import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
const DetailMedicalRecord = ({ navigation }) => {
  return (
    <>
      <Header
        title="Chi tiết bệnh án"
        rightIcon="document-text-outline"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <Text>Ngày 18/10/2023</Text>
      </View>
    </>
  );
};

export default DetailMedicalRecord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
