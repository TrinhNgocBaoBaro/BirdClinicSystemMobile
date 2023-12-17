import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import React, { useRef, useCallback, useMemo } from "react";
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView  } from '@gorhom/bottom-sheet';

import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { UIActivityIndicator } from "react-native-indicators";
import moment from "moment";
import { TwoButtonFloatBottom } from "../components/Button";
import createAxios from "../utils/axios";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";

const API = createAxios();

const DetailHistoryBoardingScreen = ({ navigation, route }) => {
  const [bookingId, setBookingId] = React.useState(route.params.booking_id);
  const [accountId, setAccountId] = React.useState(route.params.account_id);
  const isTracking = route.params.isTracking


  const [dataBooking, setDataBooking] = React.useState();
  const [dataBoarding, setDataBoarding] = React.useState();
  const [dataMediaBoarding, setDataMediaBoarding] = React.useState();
  const [dataServiceForm, setDataServiceForm] = React.useState([]);
  const [requestingServiceForm, setRequestingServiceForm] = React.useState([]);
  const [dataBill, setDataBill] = React.useState([]);

  const [load, setLoad] = React.useState(false);
  const isFocused = useIsFocused();


  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['35%', '80%'], []);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const bottomBillSheetRef = useRef();
  const snapPointsBill = useMemo(() => ['35%', '80%'], []);
  const handleClosePressBill = () => bottomBillSheetRef.current?.close();
  const handleOpenPressBill = () => bottomBillSheetRef.current?.expand();

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchDataServiceForm();

  }, []);

  const handleSheetChangesBill = useCallback((index) => {
    console.log('handleSheetChangesBill', index);
  }, []);


  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );



  const fetchDataHistoryBoarding = async () => {
    try {
      const response = await API.get(`/booking/${bookingId}`);
      if (response.data) {
        //  console.log("dataHistoryBoarding: ",response.data);
        setDataBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataBoardingByBooking = async () => {
    try {
      const response = await API.get(`/boarding/?booking_id=${bookingId}`);
      if (response.data) {
        console.log("data Boarding: ",response.data);
        setDataBoarding(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMediaBoarding = async () => {
    try {
      const response = await API.get(`/media/?type=boarding&type_id=${bookingId}`);
      if (response.data) {
        setDataMediaBoarding(response.data[0]);
        console.log("data Media Boarding: ",response.data[0]);

      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowBill = async (bookingId) => {
    try {
      const response = await API.get(`/service-form/?booking_id=${bookingId}`);
      if (response.data) {
        const arrayDataServiceForm = response.data
        const arrayAfterSort = arrayDataServiceForm.sort((a, b) =>
          a.time_create.localeCompare(b.time_create)
        );
        // const arrayAfterSort = arrayDataServiceForm.sort((a,b)=> a.time_create.localeCompare(b.time_create))
        const arrayDataServiceFormDetail = arrayAfterSort.map((item)=> item.service_form_details)
        setDataBill(arrayDataServiceFormDetail);
        handleOpenPressBill();
      }
    } catch (error) {
      console.log(error);
    }finally{
      console.log("data bill: ", dataBill)

    }
  };

  const fetchDataServiceForm = async () => {
    try {
      const response = await API.get(`/service-form/?booking_id=${bookingId}`);
      if (response.data) {
        const arrayDataServiceForm = response.data
        console.log("data Service Form: ",arrayDataServiceForm);
        setDataServiceForm(arrayDataServiceForm);
        console.log("data Service Form tại vị trí đầu tiên: ",arrayDataServiceForm[0].status);
        setRequestingServiceForm(arrayDataServiceForm[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    if (bookingId && isFocused === true) {
      fetchDataHistoryBoarding();
      fetchDataBoardingByBooking();
      fetchDataServiceForm();
      fetchDataMediaBoarding();
      console.log("Đã load");
    }
  }, [bookingId, load, isFocused]);

  function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  function formatTimeCreate(timeCreate) {
    let p = new Date(timeCreate);
    return p.getHours() + ":" + p.getMinutes() +", "+ p.getDate() + '/' + (p.getMonth()+1) + '/' + p.getFullYear();
  }


  let count = 0;

  // const checkColorRequest = () =>  {
  //   if(dataBooking && dataBooking.status !== "finish"){
  //   if(dataServiceForm.length > 1){
  //     if(requestingServiceForm && requestingServiceForm.status === "done_not_paid"){
  //       setColorRequest(true)
  //       console.log("Đi zô 186")
  //     }else {
  //       setColorRequest(false)
  //       console.log("Đi zô 188")

  //     }
  //   }else if (dataServiceForm.length = 1) {
  //     setColorRequest(true)
  //     console.log("Đi zô 191")

  //   } else {
  //     setColorRequest(false)
  //     console.log("Đi zô 193")
  //   }
  // }else {
  //   setColorRequest(false)
  //   console.log("Đi zô 197")

  // }
  // }


  return (
    <>
      <Header
        title={isTracking ? "Theo dõi nội trú" : "Lịch sử nội trú"}
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
        onPressRight={() => setLoad(!load)}
      />
              {/* <Button title="Show bottom sheet" onPress={handleOpenPress}/>
              <Button title="Hide bottom sheet" onPress={handleClosePress}/> */}
      {dataBooking ? (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 80 }}>
           <View
            style={{
              height: "auto",
              padding: 20,
              elevation: 2,
              backgroundColor: COLORS.white,
              marginHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
                marginBottom: 10,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.darkGrey,
              }}
            >
              <Icon
                name="information-circle-outline"
                size={24}
                color={COLORS.green}
              />
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                THÔNG TIN CHUNG
              </Text>
            </View>

            
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <View style={{width: 115, height: 115, elevation: 3,  justifyContent: 'center', alignItems: 'center', borderRadius: 100,backgroundColor: COLORS.white, marginBottom: 15}}>
              <Image source={{uri: dataBooking.bird.image || "https://png.pngtree.com/thumb_back/fw800/background/20230524/pngtree-two-brightly-colored-birds-sitting-on-a-branch-image_2670376.jpg"}}
              style={{width: 100, height: 100, borderRadius: 100}}
              />
              </View>
              <View style={{paddingVertical: 10, paddingHorizontal: 30, backgroundColor: COLORS.white, elevation: 3, borderRadius: 10}}> 
                <Text style={{fontFamily: FONTS.semiBold, fontSize: 15}}>{dataBooking.bird.name}</Text>
              </View>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Mã số</Text>
              <Text style={styles.textInfo}>
                {dataBooking.booking_id}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Chim</Text>
              <Text style={styles.textInfo}>
                {dataBooking.bird.name}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Bác sĩ phụ trách</Text>
              <Text style={styles.textInfo}>
                {dataBooking.veterinarian.name}
              </Text>
            </View>


            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Giờ tiếp nhận</Text>
              <Text style={styles.textInfo}>
                {dataBooking.checkin_time}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ngày tiếp nhận</Text>
              <Text style={styles.textInfo}>
              {moment(dataBooking.arrival_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Số tiền phải trả</Text>
              <Text style={styles.textInfo}>
                {formatCurrency(dataBooking.money_has_paid)}{" "}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Tổng tiền</Text>
              <Text style={styles.textInfo}>
                {formatCurrency(dataBooking.money_has_paid)}{" "}
              </Text>
            </View>
            {dataBooking.status === "finish" &&
            <View style={styles.viewAttribute}>
            <Text style={styles.textAttribute}>Hóa đơn</Text>
            <TouchableOpacity
                  activeOpacity={0.7}
                  style={{
                    elevation: 2,
                    backgroundColor: COLORS.green,
                    borderRadius: 10
                  }}
                  onPress={() => {handleShowBill(dataBooking.booking_id)}}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 13,
                      margin: 10,
                      color: COLORS.white,
                    }}
                  >
                    Xem hóa đơn
                  </Text>
                </TouchableOpacity>
            </View>
            }
          </View>

          <View 
          
          style={{ 
          paddingVertical: 20,
          paddingHorizontal: 20,
          marginHorizontal: 20,
          borderRadius: 10,
          elevation: 2,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          borderWidth: 1,
          borderColor: COLORS.green
          }} 
         
          >
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="layers" size={28} color={COLORS.green}/>
            <Text style={{ color: COLORS.black,
                        fontFamily: FONTS.semiBold,
                        fontSize: 18}}>{" "}Dịch vụ khi nội trú
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleOpenPress}
            style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.green, elevation: 3, borderRadius: 8}}>
            <Text style={{ color: COLORS.white,
                        fontFamily: FONTS.semiBold,
                        fontSize: 15}}>Xem</Text>
          </TouchableOpacity>
          </View>
          
          <View
            style={{
              height: "auto",
              padding: 20,
              elevation: 2,
              backgroundColor: COLORS.white,
              marginHorizontal: 20,
              borderRadius: 10,
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingBottom: 10,
                marginBottom: 10,
                borderBottomWidth: 2,
                borderBottomColor: COLORS.darkGrey,
              }}
            >
              <Icon
                name="bed-outline"
                size={24}
                color={COLORS.green}
              />
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                THÔNG TIN NỘI TRÚ
              </Text>
            </View>

            {dataBoarding ? (
              <>
            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Lồng</Text>
              <Text style={styles.textInfo}>
                L.{dataBoarding.cage_id}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ngày bắt đầu</Text>
              <Text style={styles.textInfo}>
              {moment(dataBoarding.act_arrival_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ngày kết thúc</Text>
              <Text style={styles.textInfo}>
                {moment(dataBoarding.departure_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Loại dịch vụ</Text>
              <Text style={styles.textInfo}>
                {dataBoarding.room_type}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Kích thước lồng</Text>
              <Text style={styles.textInfo}>
                {dataBoarding.size}
              </Text>
            </View>

            <View style={{}}>
              <Text style={styles.textAttribute}>Hình ảnh tiếp nhận</Text>
              <View style={{alignSelf: 'center', backgroundColor: COLORS.white, elevation: 3, borderRadius:12,marginVertical: 25, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={{uri: dataMediaBoarding ? dataMediaBoarding.link : "https://vapa.vn/wp-content/uploads/2022/12/anh-nen-mau-trang-001.jpg"}}
              style={{width: 200, height: 150, borderRadius: 10, margin: 10}}
              />
              </View>
            </View></>
            ):(
            <View style={{margin: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <Icon
                name="information-circle-outline"
                size={20}
                color={COLORS.green}
              />
              <Text style={{fontFamily: FONTS.medium}}>{" "}Chưa có thông tin nội chú</Text></View>
            )} 
          </View>


        </ScrollView>
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
      )}
      {dataBoarding &&
      <>
        <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{}}
        >
        <BottomSheetScrollView 
          contentContainerStyle={{backgroundColor: COLORS.white, paddingBottom: 80}}
          onRefresh={handleRefresh}
          refreshing={false}
          showsVerticalScrollIndicator={false}

        >
          {dataServiceForm.length !==0  && dataServiceForm.map((item, index)=>(
            <View
                 style={{
                  backgroundColor: COLORS.white, 
                  elevation: 3, 
                  borderRadius: 10, 
                  padding: 20, 
                  margin: 20
                }}        
            key={index}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: FONTS.bold, color: COLORS.green}}>{item.service_form_id}</Text>
              <Text style={{fontFamily: FONTS.medium}}>{formatTimeCreate(item.time_create)}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <Text style={{fontFamily: FONTS.semiBold, color: COLORS.grey}}>Các dịch vụ</Text>
              <Text style={{fontFamily: FONTS.semiBold, color: COLORS.grey, fontSize: 12}}>Trạng thái</Text>
              </View>
              {item.service_form_details.map((itemService,indexD)=>(
                <View style={{marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} key={indexD}>
                <Text style={{fontFamily: FONTS.medium}}>{indexD+1}. {itemService.note}</Text>
                {itemService.status === 'done' ?
                  <Icon name="checkmark-circle" size={25} color={COLORS.green}/>
                  :
                  <Icon name="radio-button-off" size={25} color={COLORS.green}/>
                }
                </View>
              ))}
            </View>
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
      <TwoButtonFloatBottom buttonColorLeft={COLORS.white} titleLeft="Chat với bác sĩ" colorTextLeft={COLORS.green} onPressLeft={()=>navigation.navigate('ChatBoarding',{account_id: accountId, chat_id: dataBoarding.chat_id})}
        // buttonColorRight={dataServiceForm.length > 1 && requestingServiceForm && requestingServiceForm.status === "done_not_paid" ? COLORS.green : COLORS.grey}
         buttonColorRight={COLORS.green}
        titleRight="Yêu cầu dịch vụ" 
        colorTextRight={COLORS.white} 
        onPressRight={()=>
          {
            if(dataBooking && dataBooking.status !== 'finish'){
              if(dataServiceForm.length > 1){
                if(requestingServiceForm && requestingServiceForm.status === "done_not_paid"){
                  (navigation.navigate('ServiceRequestBoarding', {bird_id: dataBooking.bird_id, booking_id: dataBooking.booking_id}
                  ))
                }else {
                  Alert.alert(
                    "Thông báo",
                    `Dịch vụ bạn yêu cầu trước đó phải được hoàn thành trước!`
                    )
                }
              }else if (dataServiceForm.length = 1) {
                navigation.navigate('ServiceRequestBoarding', {bird_id: dataBooking.bird_id, booking_id: dataBooking.booking_id}
                )
              } else {
                Alert.alert(
                  "Thông báo",
                  `Dịch vụ bạn yêu cầu trước đó phải được hoàn thành trước!`
                  )
              }
            }else {
              Alert.alert(
                "Thông báo",
                `Dịch vụ nội trú đã hoàn thành, bạn không thể yêu cầu thêm dịch vụ!`
                )
            }
            
          //   dataServiceForm.length > 1 && requestingServiceForm && requestingServiceForm.status === "done_not_paid" ?
          // (navigation.navigate('ServiceRequestBoarding', {bird_id: dataBooking.bird_id, booking_id: dataBooking.booking_id}
          // ))
          //   : 
          // (
          // Alert.alert(
          // "Thông báo",
          // `Dịch vụ bạn yêu cầu trước đó phải được hoàn thành trước!`
          // )
          // )
        }
        }
      />
      </>
      }
       
                  <BottomSheet
                  ref={bottomBillSheetRef}
                  index={-1}
                  snapPoints={snapPointsBill}
                  onChange={handleSheetChangesBill}
                  enablePanDownToClose={true}
                  backdropComponent={renderBackdrop}
                  handleIndicatorStyle={{}}
                  >
                  <BottomSheetScrollView 
                    contentContainerStyle={{backgroundColor: COLORS.white, paddingBottom: 80}}
                    // onRefresh={handleRefresh}
                    refreshing={false}
                    showsVerticalScrollIndicator={false}
                  >
                      <View style={{paddingVertical: 30, alignItems: 'center', justifyContent: 'center'}}>
                        <Text  
                        style={{
                            fontSize: 20,
                            fontFamily: FONTS.bold,
                            color: COLORS.black,
                          }}>HÓA ĐƠN
                        </Text>
                      </View>
                      {dataBill.length !==0 && 
                      <View style={{paddingHorizontal: 20}}>
                      <Text style={{fontFamily: FONTS.bold, fontSize: 15, marginBottom: 5}}>Thông tin khách hàng:</Text>            
                      <View style={{marginBottom: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>Tên khách hàng:</Text>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>{"  "}{dataBooking.customer_name}</Text>
                      </View>
                      <View style={{marginBottom: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>Số điện thoại:</Text>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>{"  "}{dataBooking.bird.customer.phone}</Text>
                      </View>
                      <Text style={{fontFamily: FONTS.bold, fontSize: 15, marginBottom: 5}}>Thông tin chim:</Text>            
                      <View style={{marginBottom: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>Tên chim:</Text>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>{"  "}{dataBooking.bird.name}</Text>
                      </View>
                      <Text style={{fontFamily: FONTS.bold, fontSize: 15}}>Chi tiết hóa đơn:</Text>            
                      <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10}}>
                        <Text style={{fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.grey}}>Tên dịch vụ</Text>
                        <Text style={{fontFamily: FONTS.semiBold, fontSize: 14, color: COLORS.grey}}>Giá</Text>
                      </View>
                      {dataBill.map((item,index)=>{
                        return item.map((itemBill,indexBill)=> {
                          count = count + 1
                          return <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}} key={indexBill}>
                            <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>{count}. {itemBill.note}</Text>
                            <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>{formatCurrency(itemBill.price)}</Text>
                          </View>
          
                      })
                      })
                      }
                      <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: FONTS.bold, fontSize: 14}}>Tổng tiền:</Text>
                        <Text style={{fontFamily: FONTS.semiBold, fontSize: 14}}>{formatCurrency(dataBooking.money_has_paid)}</Text>
                      </View>
                      {/* <View style={{marginBottom: 10, flexDirection: 'row'}}>
                        <Text style={{fontFamily: FONTS.bold, fontSize: 15}}>Phương thức thanh toán:</Text>
                        <Text style={{fontFamily: FONTS.medium, fontSize: 15}}>{"  "}Chuyển khoản</Text>
                      </View> */}
                      </View>
                      }
                  </BottomSheetScrollView>
                      </BottomSheet>
      
    </>
  );
};

export default DetailHistoryBoardingScreen;

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  removeIcon: {
    padding: 0,
    position: "absolute",
    right: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
  viewAttribute: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textAttribute: {
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    marginLeft: 5,
    color: COLORS.grey,
  },
  textInfo: {
    width: "50%",
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    marginLeft: 5,
    color: COLORS.black,
    textAlign: "right",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});
