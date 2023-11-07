import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MainHeader from "../components/MainHeader";
import COLORS from "../constants/color";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import createAxios from "../utils/axios";
const API = createAxios();
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToday } from "react-native-modern-datepicker";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import { UIActivityIndicator } from 'react-native-indicators';
const dataToday = [
  {
    id: "1",
    name: "Con vẹt xanh lá",
    estimate_time: "13:00",
    service_type: "Khám tổng quát",
    vet_name: "Phạm Ngọc Long",
  },
  {
    id: "2",
    name: "Con vẹt lam",
    estimate_time: "15:15",
    service_type: "Spa chăm sóc",
    vet_name: "Chưa xác định",
  },
];

const dataComing = [
  {
    id: "1",
    name: "Lê Hữu",
    estimate_time: "13:00",
    arrival_date: "03/11",
    service_type: "Khám tổng quát",
    vet_name: "Phạm Ngọc Long",
  },
  {
    id: "2",
    name: "Vẹt",
    estimate_time: "15:15",
    arrival_date: "05/11",
    service_type: "Spa chăm sóc",
    vet_name: "Chưa xác định",
  },
];

const dataReExam = [
  {
    id: "1",
    name: "Lê Hữu",
    arrival_date: "12/11/2023",
    service_type: "Khám tổng quát",
    vet_name: "Phạm Ngọc Long",
  },
  {
    id: "1sdas",
    name: "Lê Hữu",
    arrival_date: "12/11/2023",
    service_type: "Khám tổng quát",
    vet_name: "Phạm Ngọc Long",
  },
];

export default function HomeScreen({ navigation }) {
  const [numberOfToday, setNumberOfToday] = React.useState(0);
  const [numberOfComing, setNumberOfComing] = React.useState(0);
  const [numberOfReExam, setNumberOfReExam] = React.useState(0);
  const [userData, setUserData] = React.useState();

  const [loading, setLoading] = React.useState(0);

  const [dataToday, setDataToday] = React.useState();
  const [dataComing, setDataComing] = React.useState();

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const isFocused = useIsFocused();

  // const today = moment(getToday(), "YYYY/MM/DD").format("YYYY-MM-DD");
  const [today, setToday] = React.useState(
    moment(getToday(), "YYYY/MM/DD").format("YYYY-MM-DD")
  );

  const statusColors = {
    pending: { color: COLORS.orange, text: "Chờ xác nhận" },
    booked: { color: COLORS.pink, text: "Đã xác nhận" },
    checked_in: { color: COLORS.blue, text: "Đã check-in" },
    on_going: { color: COLORS.green, text: "Đang trong quá trình khám" },
    finish: { color: COLORS.green, text: "Hoàn thành khám bệnh" },
    cancelled: { color: COLORS.red, text: "Đã hủy lịch khám" },
  };

  const getUserData = async () => {
    const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
    if (UserLoggedInData) {
      let udata = JSON.parse(UserLoggedInData);
      console.log(udata.userData);
      setUserData(udata.userData);
    }
  };

  const fetchData = async () => {
    switch (selectedIndex) {
      case 0:
        try {
          console.log("Ngày hôm nay để bỏ vào API: ", today);
          const response = await API.get(
            `/booking/?arrival_date=${today}&account_id=${userData.account_id}`
          );
          if (response.data) {
            // const filterData = response.data.filter((e) => {
            //   return e.status !== "cancelled" && e.status !== "finish";
            // });
            const filterData = response.data;
            // console.log(filterData);
            setDataToday(filterData);
          }
        } catch (error) {
          console.log(error);
        }
        break;
      case 1:
        console.log("Các ngày còn lại để bỏ vào fillter: ", today);
        try {
          const response = await API.get(
            `/booking/?account_id=${userData.account_id}`
          );
          if (response.data) {
            const data = response.data;
            const filterData = data.filter((e) => {
              return (
                // e.status !== "cancelled" &&
                // e.status !== "finish" &&
                e.arrival_date > today
              );
            });
            setDataComing(filterData);
          }
        } catch (error) {
          console.log(error);
        }
        break;
      case 2:
        break;
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(() => {
    setDataToday()
    setDataComing()
    if (userData && today && isFocused) fetchData();
  }, [userData, selectedIndex, isFocused]);

  //   React.useEffect(()=>{
  //     if(today)  console.log("Today: ", today );
  //   },[today])

  React.useEffect(() => {
    if (dataToday) setNumberOfToday(dataToday.length);
  }, [dataToday]);

  React.useEffect(() => {
    if (dataComing) setNumberOfComing(dataComing.length);
  }, [dataComing]);

  React.useEffect(() => {
    setNumberOfReExam(dataReExam.length);
  }, [dataReExam]);

  return (
    <>
      <MainHeader iconHeader={"ios-home-outline"} navigation={navigation} />
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
          <SegmentedControl
            values={[
              `Hôm nay ` + `${numberOfToday !== 0 ? `(${numberOfToday})` : ""}`,
              `Sắp tới ` +
                `${numberOfComing !== 0 ? `(${numberOfComing})` : ""}`,
              `Tái khám ` +
                `${numberOfReExam !== 0 ? `(${numberOfReExam})` : ""}`,
            ]}
            selectedIndex={selectedIndex}
            fontStyle={{ fontFamily: FONTS.medium }}
            onChange={(e) => {
              setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>
        {selectedIndex === 0 &&
          (dataToday ? (
            dataToday.length === 0 ? (
              <View style={styles.empty}>
                <Image
                  source={require("../assets/EmptyHomeImage.jpg")}
                  style={{ height: 190, width: 280 }}
                />
                <Text style={styles.textEmpty}>
                  Chưa có lịch khám hôm nay !
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <FlatList
                  data={dataToday}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DetailBooking", {
                          booking_id: item.booking_id,
                        })
                      }
                      activeOpacity={0.8}
                      style={{
                        backgroundColor: COLORS.white,
                        padding: 10,
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                        borderRadius: 10,
                        elevation: 2,
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "transparent",
                      }}
                    >
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 8,
                          backgroundColor: COLORS.green,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS.bold,
                            color: COLORS.white,
                            fontSize: 16,
                          }}
                        >
                          {item.estimate_time}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        <Text
                          style={{ fontFamily: FONTS.semiBold, fontSize: 16 }}
                        >
                          {item.bird.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            fontSize: 12,
                            color: COLORS.grey,
                          }}
                        >
                          {item.service_type}
                        </Text>

                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            fontSize: 12,
                            color: COLORS.grey,
                          }}
                        >
                          <Icon
                            name="people-outline"
                            size={18}
                            color={COLORS.green}
                            style={{ marginLeft: 10 }}
                          />{" "}
                          Bs. {item.veterinarian.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            fontSize: 12,
                            color: statusColors[item.status]
                              ? statusColors[item.status].color
                              : statusColors["on_going"].color,
                          }}
                        >
                          <Icon
                            name="ellipse"
                            size={12}
                            color={
                              statusColors[item.status]
                                ? statusColors[item.status].color
                                : statusColors["on_going"].color
                            }
                            style={{ marginLeft: 10 }}
                          />{" "}
                          {statusColors[item.status]
                            ? statusColors[item.status].text
                            : statusColors["on_going"].text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.booking_id}
                />
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
              }}
            >
              <UIActivityIndicator size={40} color={COLORS.green} />
            </View>
          ))}
        {selectedIndex === 1 &&
          (dataComing ? (
            dataComing.length === 0 ? (
              <View style={styles.empty}>
                <Image
                  source={require("../assets/EmptyHomeImage.jpg")}
                  style={{ height: 190, width: 280 }}
                />
                <Text style={styles.textEmpty}>
                  Chưa có lịch khám sắp tới !
                </Text>
              </View>
            ) : (
              <View style={{ flex: 1, backgroundColor: COLORS.white }}>
                <FlatList
                  data={dataComing}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DetailBooking", {
                          booking_id: item.booking_id,
                        })
                      }
                      activeOpacity={0.8}
                      style={{
                        backgroundColor: COLORS.white,
                        padding: 10,
                        marginHorizontal: 20,
                        marginTop: 10,
                        marginBottom: 5,
                        borderRadius: 10,
                        elevation: 2,
                        flexDirection: "row",
                        borderWidth: 1,
                        borderColor: "transparent",
                      }}
                    >
                      <View
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 8,
                          backgroundColor: COLORS.green,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: FONTS.bold,
                            color: COLORS.white,
                            fontSize: 12,
                          }}
                        >
                          {moment(item.arrival_date, "YYYY-MM-DD").format(
                            "DD/MM"
                          )}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.bold,
                            color: COLORS.white,
                            fontSize: 16,
                          }}
                        >
                          {item.estimate_time}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        <Text
                          style={{ fontFamily: FONTS.semiBold, fontSize: 16 }}
                        >
                          {item.bird.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            fontSize: 12,
                            color: COLORS.grey,
                          }}
                        >
                          {item.service_type}
                        </Text>

                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            fontSize: 12,
                            color: COLORS.grey,
                          }}
                        >
                          <Icon
                            name="people-outline"
                            size={18}
                            color={COLORS.green}
                            style={{ marginLeft: 10 }}
                          />{" "}
                          Bs. {item.veterinarian.name}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.medium,
                            fontSize: 12,
                            color: statusColors[item.status]
                              ? statusColors[item.status].color
                              : statusColors["on_going"].color,
                          }}
                        >
                          <Icon
                            name="ellipse"
                            size={12}
                            color={
                              statusColors[item.status]
                                ? statusColors[item.status].color
                                : statusColors["on_going"].color
                            }
                            style={{ marginLeft: 10 }}
                          />{" "}
                          {statusColors[item.status]
                            ? statusColors[item.status].text
                            : statusColors["on_going"].text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.booking_id}
                />
              </View>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
              }}
            >
              <UIActivityIndicator size={40} color={COLORS.green} />
            </View>
          ))}
        {selectedIndex === 2 &&
          (dataReExam.length === 0 ? (
            <View style={styles.empty}>
              <Image
                source={require("../assets/EmptyHomeImage.jpg")}
                style={{ height: 190, width: 280 }}
              />
              <Text style={styles.textEmpty}>Chưa có lịch tái khám !</Text>
            </View>
          ) : (
            <View style={{ flex: 1, backgroundColor: COLORS.white }}>
              <FlatList
                data={dataReExam}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => {}}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: COLORS.white,
                      padding: 10,
                      marginHorizontal: 20,
                      marginTop: 10,
                      marginBottom: 5,
                      borderRadius: 10,
                      elevation: 2,
                      flexDirection: "row",
                      borderWidth: 1,
                      borderColor: "transparent",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                        paddingLeft: 15,
                      }}
                    >
                      <Text
                        style={{ fontFamily: FONTS.semiBold, fontSize: 16 }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.medium,
                          fontSize: 12,
                          color: COLORS.grey,
                        }}
                      >
                        {item.service_type}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.medium,
                          fontSize: 12,
                          color: COLORS.grey,
                        }}
                      >
                        <Icon
                          name="people-outline"
                          size={18}
                          color={COLORS.green}
                          style={{ marginLeft: 10 }}
                        />{" "}
                        Bs. {item.vet_name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: FONTS.medium,
                          fontSize: 12,
                          color: COLORS.grey,
                        }}
                      >
                        <Icon
                          name="calendar-outline"
                          size={18}
                          color={COLORS.green}
                          style={{ marginLeft: 10 }}
                        />{" "}
                        {item.arrival_date}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: FONTS.semiBold,
                          color: COLORS.green,
                        }}
                      >
                        Đặt lịch{" "}
                      </Text>
                      <Icon
                        name="arrow-forward-outline"
                        size={15}
                        color={COLORS.green}
                      />
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  empty: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  textEmpty: {
    color: COLORS.grey,
    fontFamily: FONTS.bold,
    fontSize: 17,
    marginTop: 10,
  },
});
