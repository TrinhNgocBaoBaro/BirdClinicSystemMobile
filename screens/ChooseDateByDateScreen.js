import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { ButtonFlex, ButtonFloatBottom } from "../components/Button";
import { FlatGrid } from "react-native-super-grid";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import DatePicker, {
  getFormatedDate,
  getToday,
} from "react-native-modern-datepicker";
import { Calendar } from "react-native-calendars";

import moment from "moment";
import createAxios from "../utils/axios";
const API = createAxios();

const ChooseDateByDateScreen = ({navigation, route}) => {
    const [booking, setBooking] = React.useState(route.params.booking);
    console.log(booking.service_type_id)
    const [dataTime, setDataTime] = React.useState([]);
    const [showModalPickDate, setShowModalPickDate] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState("");
    const [showModalPickDepartureDate, setShowModalPickDepartureDate] = React.useState(false);
    const [selectedDepartureDate, setSelectedDepartureDate] = React.useState("");
    const [minimunDepartureDate, setMinimunDepartureDate] = React.useState("");
    const [configMinimumDate, setConfigMinimumDate] = React.useState();
    const [dataDateClinic, setDataDateClinic] = React.useState([]);

    const [selectedTime, setSelectedTime] = React.useState();
    const [hasDataTime, setHasDataTime] = React.useState(false);
    // const today = getToday();
    const today = moment(getToday(), "YYYY/MM/DD").format("YYYY-MM-DD");

    const fetchDataTimeSlotClinic = async () => {
        try {
          const response = await API.get(
            `/time-slot-clinic/?date=${selectedDate}&service_type_id=${booking.service_type_id}`
          );
          if (response.data) {
            console.log(response.data);
            const dataTime = response.data;
            console.log("-----------------");
            const sortArray = response.data.sort((a,b)=>  a.time.localeCompare(b.time))
            console.log("sortArray: ", sortArray);
            setDataTime(sortArray);
          }
        } catch (error) {
          console.log(error);
        }
      };

    const fetchDataConfig = async () => {
        try {
          const response = await API.get(`/config/`);
          if (response.data) {
            const dataConfig = response.data.at_least_day_boarding;
            console.log("-----------------: ",dataConfig);
            setConfigMinimumDate(dataConfig);
          }
        } catch (error) {
          console.log(error);
        }
      };

      const fetchDataDateClinic = async () => {
        try {
          const response = await API.get(
            `/time-slot-clinic/?service_type_id=${booking.service_type_id}`
          );
          if (response.data) {
            // console.log("Data date: ",response.data.veterinarian_slot_details);
            const filterData = response.data.filter((item,index)=>
            {
              if(item.date >= today){
                return ({date: item.date})
              }
            }
            )
            setDataDateClinic(filterData);
            console.log("FilterData: ", filterData)
          }
        } catch (error) {
          console.log(error);
        }
      };

    React.useEffect(()=>{
        if(booking && today) {console.log(booking); fetchDataDateClinic();}
    },[booking])

    // React.useEffect(() => {
    //     if (selectedDate) fetchDataTimeSlotClinic();
    //   }, [selectedDate]);
    
    React.useEffect(() => {
        setHasDataTime(dataTime.length > 0);
    }, [dataTime]);    

    React.useEffect(() => {
        console.log(selectedDate);
      }, [selectedDate]);

    React.useEffect(() => {
        fetchDataConfig();
    }, []);

    const handleSelectDate = (date) => {

        // setSelectedDate(moment(date, "YYYY/MM/DD").format("YYYY-MM-DD"));
        // setSelectedTime();
        setSelectedDate(date.dateString);
        setSelectedTime();

        let dateString = date.dateString;
        let startDate = new Date(dateString);
        startDate.setDate(startDate.getDate() + configMinimumDate)
        let endDate = startDate.toISOString().slice(0, 10);
        setMinimunDepartureDate(endDate);
       
 
    };

    React.useEffect(()=>{
      if(selectedDepartureDate) {
        if(minimunDepartureDate > selectedDepartureDate) setSelectedDepartureDate();
      }
    },[minimunDepartureDate])

    const handleSelectDepartureDate = (date) => {
        setSelectedDepartureDate(moment(date, "YYYY/MM/DD").format("YYYY-MM-DD"));
        // setSelectedDepartureDate(date.dateString);
        setSelectedTime();
  };

    const handleSelectTime = (item) => {
        setSelectedTime(item);
        console.log(item);
      };

      const markedDates = dataDateClinic.reduce((accumulator, currentValue) => {
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
      <View style={{flex: 1, backgroundColor: COLORS.white}}>

        {booking.service_type_id === "ST003" ?
        <>
        <View>
        {selectedDate &&
        <View style={{position: 'absolute', top: 20, left:50, backgroundColor: COLORS.white, zIndex: 1, paddingHorizontal: 5, borderRadius: 10}}>
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.green }}>Ngày tiếp nhận</Text>
        </View>
        }
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowModalPickDate(!showModalPickDate)}
        style={{
          height: 80,
          backgroundColor: COLORS.white,
          marginHorizontal: 30,
          marginTop: 30,
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
          {selectedDate ? selectedDate : "Chọn ngày tiếp nhận"}
        </Text>
        </TouchableOpacity>
        </View>
        <View>
        {selectedDepartureDate &&
        <View style={{position: 'absolute', top:10, left:50, backgroundColor: COLORS.white, zIndex: 1, paddingHorizontal: 5, borderRadius: 10}}>
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15, color: selectedDate ? COLORS.green : COLORS.grey }}>Ngày kết thúc</Text>
        </View>
        } 
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => selectedDate ? setShowModalPickDepartureDate(!showModalPickDepartureDate): {}}
          style={{
            height: 80,
            backgroundColor: selectedDate ? COLORS.white : COLORS.greyPastel,
            marginHorizontal: 30,
            marginBottom: 10,
            marginTop: 20,
            borderRadius: 10,
            elevation: 3,
            borderWidth: 2,
            borderColor: selectedDate ? COLORS.green : COLORS.grey,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
            
          }}
        >
          <Text style={{ fontFamily: FONTS.semiBold, fontSize: 18, color: selectedDate ? COLORS.black : COLORS.grey }}>
            {selectedDepartureDate ? selectedDepartureDate : "Chọn ngày kết thúc"}
          </Text>
        </TouchableOpacity>
        <Text style={{fontFamily: FONTS.bold, fontStyle: "italic", fontSize: 15, marginLeft: 20}} >* Phòng khám quy định ít nhất {configMinimumDate && configMinimumDate} ngày</Text>
        </View>
        </>
        :
        <View>
        {selectedDate &&
          <View style={{position: 'absolute', top: 10, left:50, backgroundColor: COLORS.white, zIndex: 1, paddingHorizontal: 5, borderRadius: 10}}>
            <Text style={{ fontFamily: FONTS.semiBold, fontSize: 15, color: COLORS.green }}>{booking.service_type_id === "ST001" ?  "Ngày khám" : "Ngày tiếp nhận"}</Text>
          </View>
          }
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setShowModalPickDate(!showModalPickDate)}
        style={{
          height: 120,
          backgroundColor: COLORS.white,
          marginHorizontal: 30,
          marginBottom: 10,
          marginTop: 20,
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
          {selectedDate ? moment(selectedDate, "YYYY-MM-DD").format("DD/MM/YYYY") :  booking.service_type_id === "ST001" ?  "Chọn ngày khám" : "Chọn ngày tiếp nhận"}
        </Text>
        </TouchableOpacity>
        </View>
        }
        

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
                      {item.time}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              keyExtractor={(item) => item.time_slot_clinic_id}
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
                Phòng khám không có slot trong ngày này.
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
        <Modal
          isVisible={showModalPickDate}
          hasBackdrop={true}
          animationInTiming={1500}
          animationOutTiming={1000}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        //   onBackdropPress={() => setShowModalPickDate(!showModalPickDate)}
          style={{}}
          onModalHide={()=>fetchDataTimeSlotClinic()}

        >
          <View
            style={{
              height: "auto",
              backgroundColor: COLORS.white,
              paddingBottom: 10,
              borderRadius: 10,
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
              // onSelectedChange={(date) => handleSelectDate(date)}
              onDateChange={(date) => handleSelectDate(date)}
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
                // console.log("selected day", day);
                // setSelectedDate(day.dateString);
                handleSelectDate(day)
                setDataTime([{time: "Đang tải..."}])
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
        <Modal
          isVisible={showModalPickDepartureDate}
          hasBackdrop={true}
          animationInTiming={1500}
          animationOutTiming={1000}
          animationIn="slideInUp"
          animationOut="slideOutDown"
        //   onBackdropPress={() => setShowModalPickDate(!showModalPickDate)}
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
              minimumDate={minimunDepartureDate ? minimunDepartureDate : today} 
              selected={selectedDepartureDate}
              onSelectedChange={(date) => handleSelectDepartureDate(date)}
            />

            <ButtonFlex
              title="Hoàn tất"
              onPress={() => setShowModalPickDepartureDate(!showModalPickDepartureDate)}
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
      {booking.service_type_id === "ST003" ?
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={selectedTime && selectedDepartureDate ? COLORS.green : COLORS.grey}
        onPress={() => {
          selectedTime && selectedDepartureDate
            ? navigation.navigate("ConfirmBookingAndSymptom", {
                booking: {
                  ...booking,
                  estimate_time: selectedTime.time,
                  time_id: selectedTime.time_slot_clinic_id,
                  arrival_date: selectedDate,
                  status: 'pending',
                  money_has_paid: '0',
                  departure_date: selectedDepartureDate ? selectedDepartureDate : ""
                },
              })
            : "";
        }}
      /> :
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={selectedTime ? COLORS.green : COLORS.grey}
        onPress={() => {
          selectedTime
            ? navigation.navigate("ConfirmBookingAndSymptom", {
                booking: {
                  ...booking,
                  estimate_time: selectedTime.time,
                  time_id: selectedTime.time_slot_clinic_id,
                  arrival_date: selectedDate,
                  status: 'pending',
                  money_has_paid: '0',
                  departure_date: selectedDepartureDate ? selectedDepartureDate : ""
                },
              })
            : "";
        }}
      />
    }
    </>
  );
};

export default ChooseDateByDateScreen;

const styles = StyleSheet.create({});
