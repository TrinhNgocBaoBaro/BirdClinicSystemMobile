import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/color";
import Header from "../components/Header";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/MaterialIcons";
import ItemMedicalRecord from "../components/ItemMedicalRecord";
import createAxios from "../utils/axios";
const API = createAxios();

const dataMedicalRecord = [
  {
    id: "1",
    dateMedical: "18/11/2023",
  },
  {
    id: "2",
    dateMedical: "03/12/2023",
  },
  {
    id: "3",
    dateMedical: "24/12/2023",
  },
  // {
  //   id: "4",
  //   dateMedical: "14/03/2023",
  // },
  // {
  //   id: "5",
  //   dateMedical: "26/04/2023",
  // },
  // {
  //   id: "6",
  //   dateMedical: "15/09/2023",
  // },
  // {
  //   id: "7",
  //   dateMedical: "15/09/2023",
  // },
  // {
  //   id: "8",
  //   dateMedical: "15/09/2023",
  // },
];

const DetailBirdProfile = ({ navigation, route }) => {
  const birdId = route.params.bird_id
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [dataBird, setDataBird] = React.useState();

  const fetchDataBird = async () => {
    try {
      const response = await API.get(`/bird/${birdId}`);
      if (response.data) {
        console.log("Đã fetch data bird")
        setDataBird(response.data);
        }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(()=>{
    if(birdId) fetchDataBird();
  },[birdId])

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
          dataBird &&
          <View style={styles.birdProfileContainer}>
            <View style={{position: 'absolute', right: 20, top: 10, padding: 3, backgroundColor: COLORS.darkGrey, borderRadius: 50, elevation: 3}}>                
              <TouchableOpacity activeOpacity={0.7} onPress={()=>console.log('onClickEdit')} style={{padding: 10, backgroundColor: COLORS.white, borderRadius: 50}}>
              <Icon name="mode-edit" size={18} color={COLORS.grey}/>
              </TouchableOpacity>        
            </View>
            <View style={styles.grayBackground}></View>
            <View style={styles.outBorderImage}>
              <Image
                source={{ uri: dataBird.image || "https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" }}
                style={{ height: 190, width: 190, borderRadius: 100 }}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 30,
                paddingVertical: 10,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  color: COLORS.black,
                  fontFamily: FONTS.bold,
                  fontSize: 18,
                  marginBottom: 5
                }}
              >
                {dataBird.name}
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontFamily: FONTS.semiBold,
                  fontSize: 13,
                }}
              >
                {dataBird.hatching_date}
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
                <Text style={styles.textAttribute}>{dataBird.gender}</Text>
                <Text style={styles.textNameAttribute}>Giới tính</Text>
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
                <Text style={styles.textAttribute}>{dataBird.color}</Text>
                <Text style={styles.textNameAttribute}>Màu sắc</Text>
              </View>
              <View style={{ alignItems: "center", padding: 10, width: 120 }}>
                <Text style={styles.textAttribute}>{dataBird.bird_breed.bird_size.size}</Text>
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
                  width: 180,
                }}
              >
                <Text style={styles.textAttribute}>{dataBird.bird_breed.breed}</Text>
                <Text style={styles.textNameAttribute}>Giống</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  borderColor: COLORS.white,
                  padding: 10,
                  width: 180,
                }}
              >
                <Text style={styles.textAttribute}>{dataBird.ISO_microchip}</Text>
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
              <ItemMedicalRecord item={item} onPress={()=> navigation.navigate("DetailMedicalRecord")}/>
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
    height: 205,
    width: 205,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 100,
    width: 360,
    backgroundColor: COLORS.green,
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 300,
    borderWidth: 5,
    borderColor: "white"
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default DetailBirdProfile;
