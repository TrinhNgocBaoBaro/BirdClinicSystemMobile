import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFlex, ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { FlatGrid } from "react-native-super-grid";
import Modal from "react-native-modal";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";
import { Calendar } from "react-native-calendars";

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
  const [dataDateDoctor, setDataDateDoctor] = React.useState([]);

  const [selectedTime, setSelectedTime] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState("");
  const [showModalPickDate, setShowModalPickDate] = React.useState(false);
  const [hasDataTime, setHasDataTime] = React.useState(false);

  const today = moment(getToday(), "YYYY/MM/DD").format("YYYY-MM-DD");

  const fetchDataTimeSlotDoctor = async () => {
    try {
      const response = await API.get(
        `/veterinarian-slot-detail/?veterinarian_id=${veterinarian_id}&date=${selectedDate}&status=available`
      );
      if (response.data) {
        // console.log(response.data);
        const sortArray = response.data.sort((a, b) =>
          a.time_slot_clinic.slot_clinic.time.localeCompare(
            b.time_slot_clinic.slot_clinic.time
          )
        );
        setDataTime(sortArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataDateDoctor = async () => {
    try {
      const response = await API.get(
        `/vet/${veterinarian_id}`
      );
      if (response.data) {
        // console.log("Data date: ",response.data.veterinarian_slot_details);
        const filterData = response.data.veterinarian_slot_details.filter((item,index)=>
        {
          if(item.date >= today){
            return ({date: item.date})
          }
        }
        )
        setDataDateDoctor(filterData);
        console.log("FilterData: ", filterData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if(today && veterinarian_id) fetchDataDateDoctor();
  }, []);

  // React.useEffect(() => {
  //   console.log("DataDateDoctor: ", dataDateDoctor)
  // }, [dataDateDoctor]);

    // React.useEffect(() => {
  //   if (selectedDate) fetchDataTimeSlotDoctor();
  // }, [selectedDate]);

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

  const markedDates = dataDateDoctor.reduce((accumulator, currentValue) => {
    const { date } = currentValue;
    accumulator[date] = { selected: true }; //selectedColor: blue
    return accumulator;
  }, {});
  

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
        <View>
        {selectedDate &&
        <View style={{position: 'absolute', top: 0, left:50, backgroundColor: COLORS.white, zIndex: 1, paddingHorizontal: 5, borderRadius: 10}}>
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.green }}>Ngày khám</Text>
        </View>
        }
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
            {selectedDate ? moment(selectedDate, "YYYY-MM-DD").format("DD/MM/YYYY") : "Chọn ngày khám"}
          </Text>
        </TouchableOpacity>
        </View>
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
          animationOutTiming={1000}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          // onBackdropPress={() => setShowModalPickDate(!showModalPickDate)}
          style={{}}
          onModalHide={()=>fetchDataTimeSlotDoctor()}
        >
          <View
            style={{
              height: "auto",
              backgroundColor: COLORS.white,
              paddingBottom: 10,
              borderRadius: 10,
              overflow: 'hidden',
              elevation: 10
            }}
          >
            {/* <DatePicker
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
              minimumDate={today}
              selected={selectedDate}
              onSelectedChange={(date) => handleSelectDate(date)}
            /> */}

            <Calendar
              style={{
                margin: 10
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: COLORS.green,
                selectedDayTextColor: '#ffffff',
                todayTextColor: COLORS.green,
                dayTextColor: '#d9d9d9',
                textDisabledColor: '#d9d9d9',
                textDayHeaderFontFamily: FONTS.bold,
                textDayFontFamily: FONTS.semiBold,
                textMonthFontFamily: FONTS.semiBold,
                indicatorColor: "red",
                arrowColor: COLORS.green,
              }}
              onDayPress={(day) => {
                setShowModalPickDate(!showModalPickDate);
                console.log("selected day", day);
                setSelectedDate(day.dateString);
                setDataTime([{veterinarian_slot_detail_id: 1, time_slot_clinic: {slot_clinic: {time: "Đang tải..."}}}])
              }}
              minDate={today}
              markedDates={markedDates}
            />

            <ButtonFlex
              title="Đóng"
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
                  status: "pending",
                  money_has_paid: "0",
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
