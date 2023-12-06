import { Pressable, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useRef, useCallback, useMemo } from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import createAxios from "../utils/axios";
const API = createAxios();
import StepIndicator from "react-native-step-indicator";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import BottomSheet, {BottomSheetBackdrop, BottomSheetScrollView  } from '@gorhom/bottom-sheet';

import io from "socket.io-client";
const socket = io("https://clinicsystem.io.vn");

const deviceHeight = Dimensions.get('window').height

const labels = ["Chỉ định", "Thanh toán", "Hoàn tất"];
const customStyles = {
  stepIndicatorSize: 35,
  currentStepIndicatorSize: 45,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: COLORS.green,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: COLORS.green,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: COLORS.green,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: COLORS.green,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: COLORS.green,
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 12,
  currentStepLabelColor: COLORS.green,
  labelFontFamily: FONTS.semiBold,
};

const DetailServiceFormScreen = ({ navigation, route }) => {
  const service_form_id = route.params.service_form_id;
  const accountId = route.params.account_id;

  const [currentStatus, setCurrentStatus] = React.useState();
  const [dataServiceForm, setDataServiceForm] = React.useState();
  const [dataServiceFormDetail, setDataServiceFormDetail] = React.useState([]);
  const [dataResultExam, setDataResultExam] = React.useState([]);
  const [dataMedical, setDataMedical] = React.useState();
  const [showProgress, setShowProgress] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [load, setLoad] = React.useState(false);

  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => ['35%', '80%'], []);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleRefresh = useCallback(() => {
    console.log('đã refesh');

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

  React.useEffect(()=>{
    console.log("socket id khi mới vào bên service form detail: ", socket.id)
    socket.emit("login", {account_id: accountId});
    console.log("Login sucess!")

    socket.on("server-complete-payment",(data)=>{
      console.log("Data confirm payment trả về: ", data)
      fetchDataServiceForm();
    })

  },[])

  const progressServiceForm = {
    pending: {
      status: "Chưa thanh toán",
      position: 1,
      color: COLORS.orange,
    },
    paid: {
      status: "Đã thanh toán",
      position: 2,
      color: COLORS.pink,
    },
    done: {
      status: "Hoàn tất",
      position: 4,
      color: COLORS.grey,
    },
    cancelled: {
      status: "Đã hủy",
      position: "",
      color: COLORS.red,
    },
  };

  const statusServiceFormDetail = {
    pending: {
      status: "Đã chỉ định",
      position: 1,
      color: COLORS.orange,
    },
    checked_in: {
      status: "Đã check-in",
      position: 2,
      color: COLORS.pink,
    },
    on_going: {
      status: "Đang thực hiện",
      position: 4,
      color: COLORS.green,
    },
    wait_result: {
      status: "Chờ kết quả",
      position: 4,
      color: COLORS.green,
    },
    done: {
      status: "Đã có kết quả",
      position: 4,
      color: COLORS.blue,
    },
    cancelled: {
      status: "Đã hủy",
      position: "",
      color: COLORS.red,
    },
    "0": {
      status: "Hoàn tiền",
      position: "",
      color: COLORS.red,
    },
  };

  const progressServiceFormDetail = [
    {
      statusName: "pending",
      status: "Đã chỉ định",
      position: 1,
      color: COLORS.orange,
    },
    {
      statusName: "checked_in",
      status: "Đã check-in",
      position: 2,
      color: COLORS.pink,
    },
    {
      statusName: "on_going",
      status: "Đang thực hiện",
      position: 4,
      color: COLORS.green,
    },
    {
      statusName: "wait_result",
      status: "Chờ kết quả",
      position: 4,
      color: COLORS.green,
    },
    {
      statusName: "done",
      status: "Đã có kết quả",
      position: 4,
      color: COLORS.blue,
    },
    {
      statusName: "cancelled",
      status: "Đã hủy",
      position: "",
      color: COLORS.red,
    },
  ];

  const handleShowProgress = (index) => {
    if (showProgress.includes(index)) {
      // Item đã mở, nên đóng nó đi
      setShowProgress(showProgress.filter((itemIndex) => itemIndex !== index));
    } else {
      // Item đã đóng, nên mở nó lên
      setShowProgress([...showProgress, index]);
    }
  };

  const fetchDataServiceForm = async () => {
    try {
      const response = await API.get(`/service-form/${service_form_id}`);
      if (response.data) {
        // console.log("Data Service Form: ", response.data);
        setDataServiceForm(response.data[0]);
        // console.log(
        //   "Data Service Form Detail: ",
        //   response.data[0].service_form_details
        // );
        setDataServiceFormDetail(response.data[0].service_form_details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowResultExam = async (stdid) => {
    console.log("service form detail ID: ", stdid)
    try {
      const responseMedical = await API.get(`/medical-record/?service_form_detail_id=${stdid}`);
      const responseMedia = await API.get(`/media/?type=service_form_details&type_id=${stdid}`);
      if (responseMedical.data && responseMedia.data) {
        setDataMedical(responseMedical.data[0])
        setDataResultExam(responseMedia.data);
        // setShowModal(true)
        handleOpenPress();
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (service_form_id) {
      fetchDataServiceForm();
    }
  }, [service_form_id, load]);

  React.useEffect(() => {
    if (dataServiceForm) {
      setCurrentStatus(progressServiceForm[dataServiceForm.status].position);
      console.log(
        "progressServiceForm: ",
        progressServiceForm[dataServiceForm.status]
      );
    }
  }, [dataServiceForm]);

  return (
    <>
      <Header
        title="Chi tiết dịch vụ chỉ định"
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
        onPressRight={()=> setLoad(!load)}
      />
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={{ marginVertical: 20, marginLeft: 20 }}>
          <Text
            style={{
              fontFamily: FONTS.bold,
              fontSize: 14,
              color: COLORS.grey,
              marginLeft: 5,
            }}
          >
            Trạng thái
          </Text>
          <Text
            style={{
              fontFamily: FONTS.semiBold,
              fontSize: 20,
              marginLeft: 5,
            }}
          >
            {dataServiceForm
              ? progressServiceForm[dataServiceForm.status].status
              : ""}
          </Text>
        </View>
        <StepIndicator
          stepCount={3}
          customStyles={customStyles}
          currentPosition={currentStatus}
          labels={labels}
          renderStepIndicator={({ position, stepStatus }) =>
            stepStatus === "finished" ? (
              <Icon name={"checkmark"} size={20} color="#ffffff" />
            ) : stepStatus === "current" ? (
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: FONTS.bold,
                  color: COLORS.green,
                }}
              >
                {position + 1}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FONTS.semiBold,
                  color: "#aaaaaa",
                }}
              >
                {position + 1}
              </Text>
            )
          }
        />
        <View
          style={{
            height: "auto",
            padding: 10,
            backgroundColor: COLORS.white,
            marginHorizontal: 20,
            borderRadius: 10,
            marginBottom: 20,
            marginTop: 50,
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
            <Icon name="layers-outline" size={24} color={COLORS.green} />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              Dịch vụ
            </Text>
          </View>
          {dataServiceFormDetail.map((item, index) => (
            <View
              style={{
                height: "auto",
                padding: 20,
                marginHorizontal: 0,
                backgroundColor: COLORS.white,
                elevation: 2,
                borderRadius: 10,
                marginBottom: 10,
              }}
              key={item.service_form_detail_id}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 16,
                    marginLeft: 5,
                    width: "60%"
                  }}
                >
                  {index + 1 + "."} {item.note}
                </Text>
                {item.status === "done" ? (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{ flexDirection: "row" }}
                    onPress={()=>{handleShowResultExam(item.service_form_detail_id)}}
                  >
                    <Icon name="copy-outline" size={15} color={COLORS.green} />
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 13,
                        marginLeft: 5,
                        color: COLORS.green,
                      }}
                    >
                      Xem kết quả
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 13,
                      marginLeft: 5,
                      color: COLORS.grey,
                    }}
                  >
                    Chưa có kết quả
                  </Text>
                )}
              </View>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 12,
                  marginLeft: 5,
                  color: COLORS.grey,
                  marginBottom: 5,
                }}
              >
                <Icon
                  name="person-outline"
                  size={15}
                  color={COLORS.grey}
                  style={{ marginLeft: 10 }}
                />{" "}
                Bs. {item.veterinarian.name}
              </Text>
              {!showProgress.includes(index) &&
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: 13,
                  marginLeft: 5,
                  color: statusServiceFormDetail[item.status].color,
                }}
              >
                <Icon
                  name="ellipse-outline"
                  size={10}
                  color={statusServiceFormDetail[item.status].color}
                  style={{ marginLeft: 10 }}
                />{" "}
                {statusServiceFormDetail[item.status].status}
              </Text>}

              {showProgress.includes(index) && (
                <>
                  {progressServiceFormDetail.map((itemProgress, index) => (
                    <View key={index}>
                    <Text
                      style={{
                        fontFamily: FONTS.medium,
                        fontSize: 13,
                        marginLeft: 5,
                        marginBottom: 5,
                        color: itemProgress.statusName === item.status ? itemProgress.color : COLORS.grey,
                      }}
                    >
                      {itemProgress.statusName === item.status &&
                      <Icon
                        name="chevron-forward-outline"
                        size={14}
                        color={itemProgress.statusName === item.status ? itemProgress.color : COLORS.grey}
                        style={{ marginLeft: 10 }}
                      />}{" "} 
                     {itemProgress.status} 
                    </Text>
                    </View>
                  ))}
                </>
              )}
              <TouchableOpacity
                onPress={() => handleShowProgress(index)}
                style={{ justifyContent: "center", flexDirection: 'row' }}
              >
                <Text style={{fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.blue}}>{showProgress.includes(index) ? "Ẩn bớt" : "Mở rộng"}</Text>
                <Icon
                  name={
                    showProgress.includes(index)
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={20}
                  color={COLORS.blue}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* <Modal
          isVisible={showModal}
          hasBackdrop={true}
          // onBackdropPress={()=>{setShowModal(false)}}
          // backdropColor={COLORS.green}
          // backdropOpacity={0.9}
          // // backdropTransitionInTiming={15000}
          // backdropTransitionOutTiming={5000}
          animationInTiming={1000}
          animationOutTiming={300}
          animationIn="zoomIn"
          // animationOut="flash"
        >
          <View
            style={{
              height: deviceHeight * 0.8 ,
              backgroundColor: COLORS.white,
              borderRadius: 10,
              marginBottom: 10,
              overflow: 'hidden'
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.green,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 20,
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: 'row',
                
              }}
            >
                <Icon name='document-outline' size={30} color={COLORS.white}/>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                Kết quả xét nghiệm
              </Text>
              <Pressable onPress={()=>{setShowModal(false)}} >
                <Icon name='close-outline' size={30} color={COLORS.white}/>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {dataMedical && 
                <>
                <View style={{padding: 10}}>
                <View style={styles.viewAttribute}>
                  <Text style={styles.textAttribute}>Triệu chứng</Text>
                  <Text style={styles.textInfo}>{dataMedical.symptom}</Text>
                </View>
                <View style={styles.viewAttribute}>
                  <Text style={styles.textAttribute}>Chẩn đoán</Text>
                  <Text style={styles.textInfo}>{dataMedical.diagnose}</Text>
                </View>
                <View style={styles.viewAttribute}>
                  <Text style={styles.textAttribute}>Khuyến nghị</Text>
                  <Text style={styles.textInfo}>{dataMedical.recommendations}</Text>
                </View>
              </View>
                </>
              }
              
              {dataResultExam.length !== 0 && dataResultExam.map((item, index)=>(
              <Image source={{uri: item.link}} 
              style={{width: "auto", height: deviceHeight * 0.8 * 0.35}} key={index}/> 
              )
              )}
           
            </ScrollView>
          </View>
        </Modal> */}
      </ScrollView>
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
          contentContainerStyle={{flex: 1,backgroundColor: COLORS.white}}
          onRefresh={handleRefresh}
          refreshing={false}
        >
            <View style={{paddingVertical: 30, alignItems: 'center', justifyContent: 'center'}}>
              <Text  
              style={{
                  fontSize: 17,
                  fontFamily: FONTS.bold,
                  color: COLORS.black,
                }}>Kết quả xét nghiệm
              </Text>
            </View>

            {dataMedical && 
                <>
                <View style={{padding: 10}}>
                <View style={styles.viewAttribute}>
                  <Text style={styles.textAttribute}>Triệu chứng</Text>
                  <Text style={styles.textInfo}>{dataMedical.symptom}</Text>
                </View>
                <View style={styles.viewAttribute}>
                  <Text style={styles.textAttribute}>Chẩn đoán</Text>
                  <Text style={styles.textInfo}>{dataMedical.diagnose}</Text>
                </View>
                <View style={styles.viewAttribute}>
                  <Text style={styles.textAttribute}>Khuyến nghị</Text>
                  <Text style={styles.textInfo}>{dataMedical.recommendations}</Text>
                </View>
              </View>
                </>
              }
              
              {dataResultExam.length !== 0 && dataResultExam.map((item, index)=>(
              <Image source={{uri: item.link}} 
              style={{width: "auto", height: deviceHeight * 0.8 * 0.35, marginHorizontal: 20, marginBottom: 10}} key={index}/> 
              )
              )}
        
        </BottomSheetScrollView>
      </BottomSheet>
    </>
  );
};

export default DetailServiceFormScreen;

const styles = StyleSheet.create({
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
    width: "60%",
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    marginLeft: 5,
    color: COLORS.black,
    textAlign: "right",
  },
});
