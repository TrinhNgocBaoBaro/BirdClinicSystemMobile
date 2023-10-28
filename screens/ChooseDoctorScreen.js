import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { TouchableOpacity } from "react-native-gesture-handler";

const dataDoctor = [
  {
    id: "1",
    name: "Nguyễn Lê Hữu",
    image:
      "https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/285467574_549380576781071_1851860994034042931_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=24iSSJWlQysAX_a2Mk4&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfBFqwvXEwMP-KkeaiK-EkdcdhW7QlEncFvunDlIGvY-Sg&oe=653E704E",
  },
  {
    id: "2",
    name: "Phạm Ngọc Long",
    image:
      "https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-1/340074831_559902926125091_2246078200818242108_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OixUHMR2_rgAX_m7Ar5&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfCCsydKcfqCQB99Ey_lCVKx4fN7RpawLeEi37NkKcTtug&oe=653FF7A2",
  },
  {
    id: "3",
    name: "Nguyễn Trí Công",
    image:
      "https://scontent.fsgn15-1.fna.fbcdn.net/v/t1.6435-1/66648998_2324909901159592_8571786740266696704_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=1dRw9EPuq2AAX-_a4EW&_nc_ht=scontent.fsgn15-1.fna&oh=00_AfAxFj3rhclHziZZSZFW7htQYgzGKEaoAyVVgUHkhclybA&oe=656198EB",
  },
];

const ChooseDoctorScreen = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = React.useState(false);
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    console.log(item);
  };
  return (
    <>
      <Header title="Chọn bác sĩ" onPress={() => navigation.goBack()} />
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
            style={{ fontFamily: FONTS.medium, fontSize: 12, marginLeft: 10 }}
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
          keyExtractor={(item) => item.id}
        />
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={selectedItem ? COLORS.green : COLORS.grey}
        onPress={() =>
          selectedItem ? navigation.navigate("ChooseDateByDoctor", {Doctor: selectedItem}) : ""
        }
      />
    </>
  );
};

export default ChooseDoctorScreen;

const styles = StyleSheet.create({});
