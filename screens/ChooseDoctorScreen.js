import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { TouchableOpacity } from "react-native-gesture-handler";
import createAxios from "../utils/axios";
const API = createAxios();

const ChooseDoctorScreen = ({ navigation, route }) => {
  const [booking, setBooking] = React.useState(route.params.booking);
  const service_type_id = booking.service_type_id;
  const [selectedItem, setSelectedItem] = React.useState(false);
  const [dataDoctor, setDataDoctor] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await API.get(
        `/vet/?service_id=S001&service_type_id=${service_type_id}`
      );
      if (response.data) {
        console.log(response.data);
        setDataDoctor(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (service_type_id) fetchData();
  }, [service_type_id]);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    console.log(item.veterinarian_id);
  };
  return (
    <>
      <Header
        title="Chọn bác sĩ"
        onPress={() => navigation.goBack()}
        rightIcon={"close"}
        onPressRight={() => navigation.navigate("Home")}
      />
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
            style={{ fontFamily: FONTS.medium, fontSize: 12, marginLeft: 5 }}
          >
            Vui lòng chọn 1 trong các bác sĩ sau.
          </Text>
        </View>
        <FlatList
          data={dataDoctor}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelectItem(item)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.white,
                padding: 15,
                marginHorizontal: 30,
                marginVertical: 10,
                borderRadius: 10,
                elevation: 3,
                borderWidth: 1,
                borderColor:
                  selectedItem === item ? COLORS.green : "transparent",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ height: 50, width: 50, borderRadius: 50 }}
              />
              <Text style={{ fontFamily: FONTS.bold, marginLeft: 15 }}>
                Bs. {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.veterinarian_id}
        />
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={selectedItem ? COLORS.green : COLORS.grey}
        onPress={() =>
          selectedItem
            ? navigation.navigate("ChooseDateByDoctor", {
                booking: {
                  ...booking,
                  veterinarian_id: selectedItem.veterinarian_id,
                },
                veterinarian: {
                  name: selectedItem.name,
                  image: selectedItem.image,
                },
              })
            : console.log("No item selected!")
        }
      />
    </>
  );
};

export default ChooseDoctorScreen;

const styles = StyleSheet.create({});
