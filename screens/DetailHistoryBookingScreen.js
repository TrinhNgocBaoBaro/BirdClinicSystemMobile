import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons";
import createAxios from "../utils/axios";
const API = createAxios();

const DetailHistoryBookingScreen = ({ navigation, route }) => {
  const bookingId = route.params.booking_id;
  const [showDetailPrescription, setShowDetailPrescription] = React.useState(
    []
  );
  const [dataHistoryBooking, setDataHistoryBooking] = React.useState();
  const [dataServiceForm, setDataServiceForm] = React.useState([]);
  const [load, setLoad] = React.useState(false);

  const fetchDataHistoryBooking = async () => {
    try {
      const response = await API.get(`/booking/${bookingId}`);
      if (response.data) {
        console.log("Data booking History: ", response.data);
        setDataHistoryBooking(response.data);
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
        const arrayDataServiceForm = response.data;
        const arrayAfterSort = arrayDataServiceForm.sort((a, b) =>
          a.time_create.localeCompare(b.time_create)
        );
        // console.log("Data Service Form aray: ",arrayAfterSort);
        setDataServiceForm(arrayAfterSort);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPrescription = (index) => {
    if (showDetailPrescription.includes(index)) {
      // Item đã mở, nên đóng nó đi
      setShowProgress(
        showDetailPrescription.filter((itemIndex) => itemIndex !== index)
      );
    } else {
      // Item đã đóng, nên mở nó lên
      setShowProgress([...showDetailPrescription, index]);
    }
  };

  React.useEffect(() => {
    if (bookingId) {
      fetchDataHistoryBooking();
      fetchDataServiceForm();
    }
  }, [bookingId, load]);

  function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  return (
    <>
      <Header
        title="Lịch sử khám bệnh"
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
        onPressRight={() => setLoad(!load)}
      />
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
        {dataHistoryBooking && (
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

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Mã số</Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.booking_id}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Chim</Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.bird.name}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Bác sĩ phụ trách</Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.veterinarian.name}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ngày khám</Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.arrival_date}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Giờ khám</Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.checkin_time}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Triệu chứng</Text>
              <Text style={styles.textInfo}>{dataHistoryBooking.symptom}</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Chẩn đoán </Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.diagnosis}
              </Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Ghi chú của bác sĩ</Text>
              <Text style={styles.textInfo}>
                {dataHistoryBooking.recommendations}
              </Text>
            </View>
            <View style={styles.viewAttribute}>
              <Text style={styles.textAttribute}>Tổng tiền</Text>
              <Text style={styles.textInfo}>
                {formatCurrency(dataHistoryBooking.money_has_paid)}{" "}
              </Text>
            </View>
          </View>
        )}
        {dataServiceForm.length !== 0 &&
          dataServiceForm.map((item, index) => (
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
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    CHỈ ĐỊNH
                  </Text>
                </View>
                <Icon1 name={`numeric-${index + 1}-circle-outline`} size={25} />
              </View>
              <View style={styles.viewAttribute}>
                <Text style={styles.textAttribute}>Mã số</Text>
                <Text style={styles.textInfo}>{item.service_form_id}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
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
              </View>
              {item.service_form_details.map((item, index) => (
                <View style={styles.viewAttribute}>
                  <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      fontSize: 15,
                      marginLeft: 5,
                      color: COLORS.black,
                    }}
                  >
                    {index + 1}. {item.note}
                  </Text>
                  <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
                    <Text
                      style={{
                        fontFamily: FONTS.semiBold,
                        fontSize: 13,
                        textDecorationLine: "underline",
                        color: COLORS.green,
                      }}
                    >
                      Xem kết quả
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}

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
            <Icon name="newspaper-outline" size={24} color={COLORS.green} />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              ĐƠN THUỐC
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
              Tên thuốc
            </Text>
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                fontSize: 13,
                margin: 10,
                color: COLORS.grey,
              }}
            >
              Liều lượng
            </Text>
          </View>
          <View
            style={{ borderBottomWidth: 1, borderBottomColor: COLORS.darkGrey }}
          >
            <View style={styles.viewAttribute}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 15,
                  marginLeft: 5,
                  color: COLORS.black,
                }}
              >
                1. Thuốc đau bụng
              </Text>
              <Text style={styles.textInfo}>3 liều / 7 ngày</Text>
            </View>

            <View style={styles.viewAttribute}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 15,
                  marginLeft: 5,
                  color: COLORS.black,
                }}
              >
                Đơn vị
              </Text>
              <Text style={styles.textInfo}>Ống</Text>
            </View>
            <View style={styles.viewAttribute}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 15,
                  marginLeft: 5,
                  color: COLORS.black,
                }}
              >
                Tổng số liều
              </Text>
              <Text style={styles.textInfo}>3</Text>
            </View>
            <View style={styles.viewAttribute}>
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  fontSize: 15,
                  marginLeft: 5,
                  color: COLORS.black,
                }}
              >
                Lời khuyên
              </Text>
              <Text style={styles.textInfo}>
                Lời khuyên Lời khuyên Lời khuyên Lời khuyên Lời khuyên
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.bold,
                  color: COLORS.green,
                  marginBottom: 10,
                }}
              >
                Chi tiết
              </Text>
              <Icon
                name="chevron-down-outline"
                size={20}
                color={COLORS.green}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailHistoryBookingScreen;

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
    width: "50%",
    fontFamily: FONTS.semiBold,
    fontSize: 15,
    marginLeft: 5,
    color: COLORS.black,
    textAlign: "right",
  },
});
