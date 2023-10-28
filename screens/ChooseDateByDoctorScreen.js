import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { FlatGrid } from "react-native-super-grid";
import { TouchableOpacity } from "react-native-gesture-handler";

const dataTime = [
  { id: "1", time: "7:00" },
  { id: "2", time: "8:00" },
  { id: "3", time: "8:10" },
  { id: "4", time: "9:15" },
  { id: "5", time: "10:00" },
  { id: "6", time: "10:00" },
  { id: "7", time: "10:00" },
  { id: "8", time: "10:00" },
  { id: "9", time: "10:00" },
  { id: "10", time: "10:00" },
  { id: "11", time: "10:00" },
  { id: "123", time: "10:00" },
  { id: "111223", time: "10:00" },
  { id: "1321", time: "10:00" },
  { id: "1231", time: "10:00" },
  { id: "15671", time: "10:00" },
  { id: "1831", time: "10:00" },
  { id: "13231", time: "10:00" },
  { id: "1321", time: "10:00" },
  { id: "13781", time: "10:00" },
  { id: "12871", time: "10:00" },
  { id: "13571", time: "10:00" },
  { id: "15731", time: "10:00" },
  { id: "197891", time: "10:00" },
];


const ChooseDateByDoctorScreen = ({ navigation, route }) => {
  const [selectedTime, setSelectedTime] = React.useState();
  const doctor = route.params.Doctor;
  // console.log("doctor:", doctor)

  const [hasDataTime, setHasDataTime] = React.useState(false);
  React.useEffect(() => {
    setHasDataTime(dataTime.length > 0);
  }, [dataTime]);

  const handleSelectTime = (item) => {
    setSelectedTime(item);
    console.log(item);
  };

  return (
    <>
      <Header title="Chọn thời gian" onPress={() => navigation.goBack()}  rightIcon={"close"}/>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View
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
            borderColor: "transparent",
            marginTop: 30,
          }}
        >
          <Image
            source={{ uri: doctor.image }}
            style={{ height: 50, width: 50, borderRadius: 50 }}
          />
          <Text style={{ fontFamily: FONTS.bold, marginLeft: 15 }}>
            Bs. {doctor.name}
          </Text>
        </View>
        <View
          style={{
            height: 120,
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            marginVertical: 10,
            borderRadius: 10,
            elevation: 3,
            borderWidth: 2,
            borderColor: COLORS.green,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontFamily: FONTS.bold }}>Chọn ngày khám</Text>
        </View>
        {hasDataTime ? (
          <FlatGrid
            itemDimension={70}
            spacing={30}
            data={dataTime}
            renderItem={({ item, index }) => (
              <>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    handleSelectTime(item);
                  }}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.white,
                    padding: 10,
                    borderRadius: 10,
                    elevation: 3,
                    borderWidth: 1,
                    borderColor:
                      selectedTime === item ? COLORS.green : "transparent",
                    marginTop:
                      index === 0 || index === 1 || index === 2 ? 10 : 0,
                  }}
                >
                  <Text style={{ fontFamily: FONTS.bold }}>{item.time}</Text>
                </TouchableOpacity>
              </>
            )}
            keyExtractor={(item) => item.id}
            style={{ marginBottom: 80, paddingTop: 10 }}
          />
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 80
            }}
          >
            <Icon
              name="information-circle-outline"
              size={23}
              color={COLORS.green}
            />
            <Text
              style={{
                fontFamily: FONTS.medium,
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              Vui lòng chọn ngày khám.
            </Text>
          </View>
        )}
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={COLORS.grey}
        onPress={() => navigation.navigate("Profile")}
      />
    </>
  );
};

export default ChooseDateByDoctorScreen;

const styles = StyleSheet.create({});
