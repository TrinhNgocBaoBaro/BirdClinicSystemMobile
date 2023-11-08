import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import createAxios from "../utils/axios";
const API = createAxios();
import StepIndicator from "react-native-step-indicator";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const service_form_id = route.params.service_form_id

  const [currentStatus, setCurrentStatus] = React.useState();
  const [dataServiceForm, setDataServiceForm] = React.useState([]);
  const [dataServiceFormDetail, setDataServiceFormDetail] = React.useState([]);

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
      position: 1,
      color: COLORS.pink,
    },
    done: {
      status: "Hoàn tất",
      position: 3,
      color: COLORS.grey,
    },
    cancelled: {
      status: "Đã hủy",
      position: "",
      color: COLORS.red,
    },
  }

  const fetchDataServiceForm = async () => {
    try {
      const response = await API.get(`/service_Form/${service_form_id}`);
      if (response.data) {
        // console.log("Data Service Form: ",response.data);
        setDataServiceForm(response.data);
        console.log("Data Service Form Detail: ", response.data[0].service_form_details)
        setDataServiceFormDetail(response.data[0].service_form_details)
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
    if (dataServiceForm.length !== 0) {
      setCurrentStatus(progressServiceForm[dataServiceForm[0].status].position);
      console.log("progressServiceForm: ", progressServiceForm[dataServiceForm[0].status]);
    }
  }, [dataServiceForm]);
  
  return (
    <>
      <Header
        title="Chi tiết dịch vụ chỉ định"
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
      />
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
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
            {dataServiceForm[0] ?  progressServiceForm[dataServiceForm[0].status].status : ""}
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
            <Icon
              name="layers-outline"
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
              Dịch vụ
            </Text>
          </View>
          {dataServiceFormDetail.map((item, index) => (
            <View
              style={{
                height: "auto",
                padding: 10,
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
                  {item.note}
                </Text>
                <TouchableOpacity activeOpacity={0.6}>
                <Text
                  style={{
                    fontFamily: FONTS.semiBold,
                    fontSize: 13,
                    marginLeft: 5,
                    color: COLORS.grey,
                  }}
                >
                  Xem kết quả
                </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 13,
                  marginLeft: 5,
                  color: COLORS.grey,
                }}
              >
                Bs. {item.veterinarian_id}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default DetailServiceFormScreen;

const styles = StyleSheet.create({});
