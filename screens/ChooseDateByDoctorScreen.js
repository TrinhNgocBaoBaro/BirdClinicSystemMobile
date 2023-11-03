import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFlex, ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { FlatGrid } from "react-native-super-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";
import moment from "moment";
import createAxios from "../utils/axios";
const API = createAxios();

const ChooseDateByDoctorScreen = ({ navigation, route }) => {
  const [booking, setBooking] = React.useState(route.params.booking);
  const [veterinarian, setVeterinarian] = React.useState(
    route.params.veterinarian
  );
  const veterinarian_id = booking.veterinarian_id;

  const [dataTime, setDataTime] = React.useState([]);
  const [dataDoctorTime, setDataDoctorTime] = React.useState([]);

  const [selectedTime, setSelectedTime] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState("");
  const [showModalPickDate, setShowModalPickDate] = React.useState(false);
  const [hasDataTime, setHasDataTime] = React.useState(false);

  const today = getToday();

  const fetchDataTimeSlotDoctor = async () => {
    try {
      const response = await API.get(
        `/veterinarianSlotDetail/?veterinarian_id=${veterinarian_id}&date=${selectedDate}&status=un_available`
      );
      if (response.data) {
        console.log(response.data);
        // const dataTime = response.data.map(
        //   (item) => item.time_slot_clinic.slot_clinic
        // );
        const dataTime = response.data;
        console.log("-----------------");
        console.log(dataTime);
        setDataTime(dataTime);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (selectedDate) fetchDataTimeSlotDoctor();
  }, [selectedDate]);

  React.useEffect(() => {
    setHasDataTime(dataTime.length > 0);
  }, [dataTime]);

  React.useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleSelectTime = (item) => {
    setSelectedTime(item);
    console.log(item);
  };
  const handleSelectDate = (date) => {
    setSelectedDate(moment(date, "YYYY/MM/DD").format("YYYY-MM-DD"));
    setSelectedTime();
  };
  return (
    <>
      <Header
        title="Chọn thời gian"
        onPress={() => navigation.goBack()}
        onPressRight={() => navigation.navigate("Home")}
        rightIcon={"close"}
      />
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
            source={{ uri: veterinarian.image }}
            style={{ height: 50, width: 50, borderRadius: 50 }}
          />
          <Text style={{ fontFamily: FONTS.bold, marginLeft: 15 }}>
            Bs. {veterinarian.name}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowModalPickDate(!showModalPickDate)}
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
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18 }}>
            {selectedDate ? selectedDate : "Chọn ngày khám"}
          </Text>
        </TouchableOpacity>
        {selectedDate ? (
          hasDataTime ? (
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
                      borderWidth: 2,
                      borderColor:
                        selectedTime === item ? COLORS.green : "transparent",
                      marginTop:
                        index === 0 || index === 1 || index === 2 ? 10 : 0,
                    }}
                  >
                    <Text style={{ fontFamily: FONTS.bold }}>
                      {item.time_slot_clinic.slot_clinic.time}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.veterinarian_slot_detail_id}
              style={{ marginBottom: 80, paddingTop: 10 }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 80,
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
                  fontSize: 14,
                  marginLeft: 5,
                }}
              >
                Bác sĩ không có slot trong ngày này.
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 80,
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
                fontSize: 14,
                marginLeft: 5,
              }}
            >
              Vui lòng chọn ngày khám.
            </Text>
          </View>
        )}
      </View>
      <View>
        <Modal
          isVisible={showModalPickDate}
          hasBackdrop={true}
          animationInTiming={1000}
          animationOutTiming={300}
          animationIn="fadeIn"
          animationOut="slideOutDown"
          // onBackdropPress={() => setShowModalPickDate(!showModalPickDate)}
          style={{}}
        >
          <View
            style={{
              height: "auto",
              backgroundColor: COLORS.white,
              paddingBottom: 10,
              borderRadius: 10,
            }}
          >
            <DatePicker
              format={"YYYY-MM-DD"}
              options={{
                mainColor: COLORS.green,
                defaultFont: FONTS.semiBold,
                headerFont: FONTS.bold,
              }}
              style={{
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                padding: 10,
              }}
              mode="calendar"
              // minimumDate={today}
              selected={selectedDate}
              onSelectedChange={(date) => handleSelectDate(date)}
            />

            <ButtonFlex
              title="Hoàn tất"
              onPress={() => setShowModalPickDate(!showModalPickDate)}
              stylesButton={{
                paddingVertical: 20,
                marginLeft: 10,
                marginRight: 10,
              }}
              stylesText={{ fontSize: 16 }}
            />
          </View>
        </Modal>
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={selectedTime ? COLORS.green : COLORS.grey}
        onPress={() => {
          selectedTime
            ? navigation.navigate("ConfirmBookingAndSymptom", {
                booking: {
                  ...booking,
                  estimate_time: selectedTime.time_slot_clinic.slot_clinic.time,
                  time_id: selectedTime.time_slot_clinic_id,
                  arrival_date: selectedDate,
                  status: 'pending',
                  money_has_paid: '0'
                },
                veterinarian: {
                  name: veterinarian.name,
                  image: veterinarian.image,
                },
              })
            : "";
        }}
      />
    </>
  );
};

export default ChooseDateByDoctorScreen;

const styles = StyleSheet.create({});
