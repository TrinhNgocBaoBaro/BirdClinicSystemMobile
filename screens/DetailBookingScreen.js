import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import createAxios from "../utils/axios";
const API = createAxios();
import StepIndicator from "react-native-step-indicator";
import { ScrollView } from "react-native-gesture-handler";
import { SkypeIndicator, UIActivityIndicator } from "react-native-indicators";

const labels = ["Đặt lịch", "Xác nhận", "Check-in", "Khám bệnh", "Hoàn tất"];
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

const DetailBookingScreen = ({ navigation, route }) => {
  const [bookingId, setBookingId] = React.useState(route.params.booking_id);
  const [currentStatus, setCurrentStatus] = React.useState();
  const [dataBooking, setDataBooking] = React.useState();
  const [dataServiceForm, setDataServiceForm] = React.useState([]);
  const [dataServiceFormDetail, setDataServiceFormDetail] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  const progressBooking = {
    pending: {
      status: "Chờ xác nhận",
      position: 1,
      color: COLORS.orange,
    },
    booked: {
      status: "Đã xác nhận",
      position: 2,
      color: COLORS.pink,
    },
    checked_in: {
      status: "Đã check-in",
      position: 3,
      color: COLORS.blue,
    },
    on_going: {
      status: "Đang khám bệnh",
      position: 3,
      color: COLORS.green,
    },
    test_requested: {
      status: "Chỉ định dịch vụ",
      position: 3,
      color: COLORS.green,
    },
    checked_in_after_test: {
      status: "Đã checkin sau khi có kết quả",
      position: 3,
      color: COLORS.blue,
    },
    finish: {
      status: "Hoàn tất",
      position: 5,
      color: COLORS.grey,
    },
    cancelled: {
      status: "Đã hủy",
      position: "",
      color: COLORS.red,
    },
  };

  // const dataServiceFormDetail = [
  //   { id: 1, name: "Xét nghiệm máu", price: "150,000" },
  //   { id: 2, name: "Chụp X-quang", price: "100,000" },
  // ];

  const fetchData = async () => {
    try {
      const response = await API.get(`/booking/${bookingId}`);
      if (response.data) {
        console.log(response.data);
        setDataBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataServiceForm = async () => {
    try {
      const response = await API.get(`/service_Form/?booking_id=${bookingId}`);
      if (response.data) {
        // console.log("Data Service Form: ",response.data);
        setDataServiceForm(response.data);
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
    if (bookingId) {
      fetchData();
      fetchDataServiceForm();
    }
  }, [bookingId, load]);

  React.useEffect(() => {
    if (dataBooking) {
      setCurrentStatus(progressBooking[dataBooking.status].position);
      // console.log("progressBooking: ", progressBooking['checked_in'].position);
      console.log("progressBooking: ", progressBooking[dataBooking.status]);
    }
  }, [dataBooking]);

  let componentStatus;
  if (dataBooking) {
    switch (dataBooking.status) {
      case "pending":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 3,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.orange,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 15,
                margin: 10,
                textAlign: "center",
              }}
            >
              Phòng khám sẽ sớm gọi cho bạn để xác nhận lịch khám!
            </Text>
          </View>
        );
        break;
      case "booked":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 2,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontFamily: FONTS.semiBold, fontSize: 15, margin: 10 }}
            >
              Sử dụng mã QR bên dưới để checkin!
            </Text>
            <Image
              source={{
                uri:
                  dataBooking.qr_code ||
                  "https://cdn-icons-png.flaticon.com/512/5266/5266799.png",
              }}
              style={{ width: 250, height: 250 }}
            />
          </View>
        );
        break;
      case "checked_in":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 2,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 14,
                margin: 10,
                marginBottom: 5,
              }}
            >
              Check-in thành công!
            </Text>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 14,
                marginBottom: 15,
              }}
            >
              Thời gian check-in: 12:33
            </Text>
            <Image
              source={{
                uri:
                  dataBooking.veterinarian.image ||
                  "https://firebasestorage.googleapis.com/v0/b/bsc-symtem.appspot.com/o/151da814-b87a-44f1-926c-e26040b8893e.png?alt=media",
              }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text
              style={{ fontFamily: FONTS.semiBold, fontSize: 15, margin: 10 }}
            >
              Bs. {dataBooking.veterinarian.name}
            </Text>
          </View>
        );
        break;
      case "on_going":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 2,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <SkypeIndicator color={COLORS.green} style={{ margin: 10 }} />
            <Text
              style={{ fontFamily: FONTS.semiBold, fontSize: 15, margin: 10 }}
            >
              Đang trong quá trình khám...
            </Text>
          </View>
        );
        break;
      case "test_requested":
        componentStatus = (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                marginHorizontal: 20,
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
                  fontSize: 13,
                  marginLeft: 5,
                }}
              >
                Vui lòng tới quầy thanh toán các dịch vụ sau để tiếp tục.
              </Text>
            </View>
            {dataServiceForm.map((item, index) => (
              <View
                style={{
                  padding: 10,
                  elevation: 2,
                  backgroundColor: COLORS.white,
                  margin: 20,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
                key={item.service_form_id}
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
                    name="document-text-outline"
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
                    Thông tin dịch vụ chỉ định
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 13,
                      margin: 10,
                      color: COLORS.grey,
                    }}
                  >
                    Tên dịch vụ
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 13,
                      margin: 10,
                      color: COLORS.grey,
                    }}
                  >
                    Giá
                  </Text>
                </View>
                {dataServiceFormDetail.map((item, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    key={item.service_form_detail_id}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 14,
                        margin: 10,
                      }}
                    >
                      {index + 1}. {item.note}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 13,
                        margin: 10,
                        color: COLORS.orange,
                      }}
                    >
                      300.000đ
                    </Text>
                  </View>
                ))}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 15,
                      margin: 10,
                    }}
                  >
                    Tổng cộng:
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 15,
                      margin: 10,
                    }}
                  >
                    {item.total_price}đ
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 13,
                      margin: 10,
                    }}
                  >
                    Tình trạng: {item.status}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate("DetailServiceForm", {
                        service_form_id: item.service_form_id,
                      })
                    }
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 13,
                        margin: 10,
                        color: COLORS.green,
                        textDecorationLine: "underline",
                      }}
                    >
                      Xem chi tiết
                    </Text>
                  </TouchableOpacity>
                </View>
                {item.status === 'done' && <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: 13,
                  marginLeft: 5,
                  color: COLORS.orange
                }}
              >
                Vui lòng tới quầy để checkin sau khi đã có các kết quả chỉ định.
              </Text>}
                
              </View>
            ))}
          </>
        );
        break;
      case "checked_in_after_test":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 3,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.green,
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 15,
                margin: 10,
                textAlign: "center",
              }}
            >
              Đã checkin sau khi có kết quả.
            </Text>
          </View>
        );
        break;
      case "finish":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 3,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.green,
            }}
          >
            <Image
              source={require("../assets/success-icon.png")}
              style={{ width: 60, height: 60, marginTop: 10 }}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 15,
                margin: 10,
                textAlign: "center",
              }}
            >
              Hoàn thành khám bệnh!
            </Text>
          </View>
        );
        break;
      case "cancelled":
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 3,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.red,
            }}
          >
            <Image
              source={require("../assets/fail-icon.png")}
              style={{ width: 60, height: 60, marginTop: 10 }}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 15,
                margin: 10,
                textAlign: "center",
              }}
            >
              Khám bệnh đã hủy!
            </Text>
          </View>
        );
        break;
      default:
        componentStatus = (
          <View
            style={{
              padding: 10,
              elevation: 3,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: COLORS.red,
            }}
          >
            <Text style={{ fontFamily: FONTS.bold, color: COLORS.red }}>
              Lỗi
            </Text>
          </View>
        );
        break;
    }
  }

  

  return (
    <>
      <Header
        title={
          dataBooking
            ? progressBooking[dataBooking.status].status
            : "Đang tải..."
        }
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
        onPressRight={()=> setLoad(!load)}
      />
      
      {dataBooking ? (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <View style={{ marginVertical: 20, marginLeft: 20 }}>
            <Text
              style={{
                fontFamily: FONTS.bold,
                fontSize: 14,
                color: progressBooking[dataBooking.status]
                  ? progressBooking[dataBooking.status].color
                  : COLORS.grey,
                marginLeft: 5,
              }}
            >
              {progressBooking[dataBooking.status].status}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 20,
                marginLeft: 5,
              }}
            >
              {dataBooking.service_type}
            </Text>
          </View>
          <StepIndicator
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

          {componentStatus}
          {dataServiceFormDetail.length !==0 && dataServiceFormDetail.map((item, index) => (
            <View
            style={{
              padding: 10,
              elevation: 2,
              backgroundColor: COLORS.white,
              margin: 20,
              marginBottom: 10,
              borderRadius: 10,
            }}
            key={item.service_form_detail_id}
          >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    key={item.service_form_detail_id}
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 14,
                        margin: 10,
                      }}
                    >
                      {index + 1}. {item.note}
                    </Text>
                    <TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 13,
                        margin: 10,
                        color: COLORS.grey,
                      }}
                    >
                      Xem kết quả
                    </Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                ))}



          <View
            style={{
              height: "auto",
              padding: 10,
              elevation: 2,
              backgroundColor: COLORS.white,
              marginHorizontal: 20,
              borderRadius: 10,
              marginBottom: 20,
              marginTop: 10,
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
                Thông tin khám
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 15,
                  marginLeft: 5,
                  color: COLORS.grey,
                }}
              >
                Chim
              </Text>
              <Text style={styles.textInfo}>{dataBooking.bird.name}</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Triệu chứng</Text>
              <Text style={styles.textInfo}>{dataBooking.symptom}</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ngày đặt</Text>
              <Text style={styles.textInfo}>{dataBooking.booking_date}</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ngày khám</Text>
              <Text style={styles.textInfo}>{dataBooking.arrival_date}</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Giờ dự kiến</Text>
              <Text style={styles.textInfo}>{dataBooking.estimate_time}</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Giờ check-in</Text>
              <Text style={styles.textInfo}>
                {dataBooking.check_in === null
                  ? dataBooking.check_in
                  : "Chưa check-in"}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Bác sĩ phụ trách</Text>
              <Text style={styles.textInfo}>Phạm Ngọc Long</Text>
            </View>
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
    </>
  );
};

export default DetailBookingScreen;

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
