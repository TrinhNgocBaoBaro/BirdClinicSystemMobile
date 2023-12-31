import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import MainHeader from '../components/MainHeader';
import { useIsFocused } from '@react-navigation/native';
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import FONTS from '../constants/font';
import COLORS from '../constants/color';
import Icon from "react-native-vector-icons/Ionicons";
import createAxios from "../utils/axios";
const API = createAxios();
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default function HistoryScreen({navigation}) {

  const [userData, setUserData] = React.useState();
  const [dataHistory, setDataHistory] = React.useState();
  const [dataBoarding, setDataBoarding] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const isFocused = useIsFocused();

  const statusColors = {
    pending: { color: COLORS.orange, text: "Chờ xác nhận" },
    booked: { color: COLORS.pink, text: "Đã xác nhận" },
    checked_in: { color: COLORS.blue, text: "Đã check-in" },
    on_going: { color: COLORS.green, text: "Đang trong quá trình thực hiện" },
    finish: { color: COLORS.green, text: "Hoàn thành khám bệnh" },
    cancelled: { color: COLORS.red, text: "Đã hủy lịch khám" },
  };

  const getUserData = async () => {
    const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
    if (UserLoggedInData) {
      let udata = JSON.parse(UserLoggedInData);
      // console.log(udata.userData);
      setUserData(udata.userData);
    }
  };

  const fetchData = async () => {
    switch (selectedIndex) {
      case 0:
        try {
          const response = await API.get(
            `/booking/?account_id=${userData.account_id}`
          );
          if (response.data) {
            // const filterData = response.data.filter((e) => {
            //   return e.status === "finish";
            // });
            const filterData = response.data.sort((a,b)=>  b.arrival_date.localeCompare(a.arrival_date));

            console.log("Đã fetch data history");
            setDataHistory(filterData);
          }
        } catch (error) {
          console.log(error);
        }
        break;
      case 1:
        try {
          const response = await API.get(
            `/booking/?status=on_going&account_id=${userData.account_id}`
          );
          if (response.data) {
            const data = response.data;
            // console.log(response.data)
            const filterData = data.filter((e) => {
              return (
                e.service_type_id === "ST003"
              );
            });
            const sortData = filterData.sort((a,b)=>  b.arrival_date.localeCompare(a.arrival_date));
            setDataBoarding(sortData);
          }
        } catch (error) {
          console.log(error);
        }
        break;
    }
  };

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(()=>{
    if(userData && isFocused ) fetchData();
  },[userData, selectedIndex, isFocused])


  return (
    <>
      <MainHeader iconHeader={"folder-open-outline"} navigation={navigation}/>
      <View style={styles.container}>
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
      <SegmentedControl
            values={[
              'Lịch sử',
              'Theo dõi nội trú',
            ]}
            selectedIndex={selectedIndex}
            fontStyle={{ fontFamily: FONTS.medium }}
            onChange={(e) => {
              setSelectedIndex(e.nativeEvent.selectedSegmentIndex);
            }}
          />
      </View>
      {selectedIndex === 0 &&
            dataHistory && (
            dataHistory.length ===0 ? (
              <View style={styles.empty}>
                <Image
                  source={require("../assets/EmptyHistoryImage.jpg")}
                  style={{ height: 190, width: 280 }}
                />
                <Text style={styles.textEmpty}>
                  Chưa có lịch sử khám bệnh !
                </Text>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={()=> navigation.navigate("Booking")}
                  style={{alignItems: 'center',flexDirection: 'row', padding: 10, elevation: 2, backgroundColor: COLORS.white, borderRadius: 10, marginTop: 10}}>
                  <Icon name="add" size={22} color={COLORS.green}/>
                  <Text style={{fontFamily: FONTS.bold, color: COLORS.green}}>{" "}Đặt lịch ngay</Text>
                </TouchableOpacity>
              </View>
            ):(
           <View style={{ flex: 1, backgroundColor: COLORS.white }}>
           <FlatList
             data={dataHistory}
             renderItem={({ item, index }) => (
               <TouchableOpacity
                 onPress={() => { item.status === 'finish' ? item.service_type_id === "ST003" ? navigation.navigate("DetailHistoryBoarding", {booking_id: item.booking_id, account_id: userData.account_id, isTracking: false}) : navigation.navigate("DetailHistoryBooking", {booking_id: item.booking_id}) : {}}}
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
                       color: COLORS.grey,
                     }}
                   >
                     <Icon
                       name="calendar-outline"
                       size={18}
                       color={COLORS.green}
                       style={{ marginLeft: 10 }}
                     />{" "}
                     {moment(item.arrival_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
                   </Text>
                   <Text
                     style={{
                       fontFamily: FONTS.medium,
                       fontSize: 12,
                       color: statusColors[item.status]
                              ? statusColors[item.status].color
                              : statusColors["on_going"].color,
                       marginTop: 5
                     }}
                   >
                     <Icon
                       name="ellipse"
                       size={10}
                       color={statusColors[item.status]
                        ? statusColors[item.status].color
                        : statusColors["on_going"].color}
                       style={{ marginLeft: 10 }}
                     />{" "}
                     {statusColors[item.status] ? statusColors[item.status].text : statusColors["on_going"].text }
                   </Text>
                 </View>
                 {item.status === 'finish' &&
                 <View
                   style={{ flexDirection: "row", alignItems: "center" }}
                 >
                   <Text
                     style={{
                       fontFamily: FONTS.semiBold,
                       color: COLORS.green,
                     }}
                   >
                     Xem chi tiết{" "}
                   </Text>
                   <Icon
                     name="arrow-forward-outline"
                     size={15}
                     color={COLORS.green}
                   />
                 </View>
                }
               </TouchableOpacity>
             )}
             keyExtractor={(item) => item.booking_id}
           />
         </View>)
         )
        }
      {selectedIndex === 1 &&
            dataBoarding && (
            dataBoarding.length === 0 ? (
              <View style={styles.empty}>
              <Image
                source={require("../assets/EmptyHistoryImage.jpg")}
                style={{ height: 190, width: 280 }}
              />
              <Text style={styles.textEmpty}>
                Chưa có lịch sử nội trú !
              </Text>
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={()=> navigation.navigate("Booking")}
                style={{alignItems: 'center',flexDirection: 'row', padding: 10, elevation: 2, backgroundColor: COLORS.white, borderRadius: 10, marginTop: 10}}>
                <Icon name="add" size={22} color={COLORS.green}/>
                <Text style={{fontFamily: FONTS.bold, color: COLORS.green}}>{" "}Đặt lịch ngay</Text>
              </TouchableOpacity>
            </View>
            ) : (
           <View style={{ flex: 1, backgroundColor: COLORS.white }}>
           <FlatList
             data={dataBoarding}
             renderItem={({ item, index }) => (
               <TouchableOpacity
                 onPress={() => navigation.navigate("DetailHistoryBoarding", {booking_id: item.booking_id, account_id: userData.account_id, isTracking: true})}
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
                       color: COLORS.grey,
                     }}
                   >
                     <Icon
                       name="calendar-outline"
                       size={18}
                       color={COLORS.green}
                       style={{ marginLeft: 10 }}
                     />{" "}
                     {moment(item.arrival_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
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
                     Xem chi tiết{" "}
                   </Text>
                   <Icon
                     name="arrow-forward-outline"
                     size={15}
                     color={COLORS.green}
                   />
                 </View>
               </TouchableOpacity>
             )}
             keyExtractor={(item) => item.booking_id}
           />
         </View>))
        }
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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


