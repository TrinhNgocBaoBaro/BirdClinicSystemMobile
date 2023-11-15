import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import createAxios from "../utils/axios";
const API = createAxios();
import StepIndicator from "react-native-step-indicator";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

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

  const [currentStatus, setCurrentStatus] = React.useState();
  const [dataServiceForm, setDataServiceForm] = React.useState();
  const [dataServiceFormDetail, setDataServiceFormDetail] = React.useState([]);
  const [showProgress, setShowProgress] = React.useState([]);
  const dataServiceForm1 = [
    { id: 1, name: "Xét nghiệm máu", price: "150,000" },
    { id: 2, name: "Chụp X-quang", price: "100,000" },
  ];

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
      color: COLORS.grey,
    },
    wait_result: {
      status: "Chờ kết quả",
      position: 4,
      color: COLORS.grey,
    },
    done: {
      status: "Đã có kết quả",
      position: 4,
      color: COLORS.grey,
    },
    cancelled: {
      status: "Đã hủy",
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
      color: COLORS.grey,
    },
    {
      statusName: "wait_result",
      status: "Chờ kết quả",
      position: 4,
      color: COLORS.grey,
    },
    {
      statusName: "done",
      status: "Đã có kết quả",
      position: 4,
      color: COLORS.grey,
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
      const response = await API.get(`/service_Form/${service_form_id}`);
      if (response.data) {
        console.log("Data Service Form: ", response.data);
        setDataServiceForm(response.data[0]);
        console.log(
          "Data Service Form Detail: ",
          response.data[0].service_form_details
        );
        setDataServiceFormDetail(response.data[0].service_form_details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (service_form_id) {
      fetchDataServiceForm();
    }
  }, [service_form_id]);

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
                  }}
                >
                  {index + 1 + "."} {item.note}
                </Text>
                {item.status === "done" ? (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{ flexDirection: "row" }}
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
                  color: COLORS.green,
                }}
              >
                <Icon
                  name="ellipse-outline"
                  size={10}
                  color={COLORS.green}
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
                        color: itemProgress.statusName === item.status ? COLORS.green : COLORS.grey,
                      }}
                    >
                      {itemProgress.statusName === item.status &&
                      <Icon
                        name="chevron-forward-outline"
                        size={14}
                        color={itemProgress.statusName === item.status ? COLORS.green : COLORS.grey}
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
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <Text style={{fontFamily: FONTS.semiBold, fontSize: 13, color: COLORS.blue}}>{showProgress.includes(index) ? "Ẩn bớt" : "Mở rộng"}</Text>
                {/* <Icon
                  name={
                    showProgress.includes(index)
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={35}
                  color={COLORS.grey}
                /> */}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default DetailServiceFormScreen;

const styles = StyleSheet.create({});
