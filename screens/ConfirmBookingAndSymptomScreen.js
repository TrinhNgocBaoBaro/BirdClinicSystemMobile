import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import Header from "../components/Header";
import { ButtonFlex, ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import Icon from "react-native-vector-icons/Ionicons";
import FONTS from "../constants/font";
import { SvgBirdIcon } from "../components/Svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import createAxios from "../utils/axios";
const API = createAxios();
import moment from "moment";

const ConfirmBookingAndSymptomScreen = ({ navigation, route }) => {
  const [booking, setBooking] = React.useState(route.params.booking);
  const [veterinarian, setVeterinarian] = React.useState(
    route.params.veterinarian
  );
  const [dataBirdInfo, setDataBirdInfo] = React.useState();

  // console.log("Booking: ", booking);

  const [symptom, setSymptom] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [modalClosedByButton, setModalClosedByButton] = React.useState(false);

  const fetchDataInfoBird = async () => {
    try {
      const response = await API.get(`/bird/${booking.bird_id}`);
      if (response.data) {
        console.log(response.data);
        setDataBirdInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (booking.bird_id) fetchDataInfoBird();
  }, [booking.bird_id]);

  return (
    <>
      <Header
        title="Đặt lịch khám"
        onPress={() => navigation.goBack()}
        rightIcon={"close"}
        onPressRight={() => navigation.navigate("Home")}
      />
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 80 }}
      >
        <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginTop: 20,
            marginBottom: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: COLORS.green,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgBirdIcon width={30} height={30} />
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: COLORS.grey,
                  fontSize: 13,
                }}
              >
                Hồ sơ chim
              </Text>
            </View>
            {dataBirdInfo ? (
              <Image
                source={{
                  uri: dataBirdInfo.image,
                }}
                style={{
                  height: 55,
                  width: 55,
                  borderRadius: 50,
                  position: "absolute",
                  right: 0,
                  top: 0,
                }}
              />
            ) : (
              ""
            )}
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            {dataBirdInfo && dataBirdInfo.name}
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="layers-outline"
              width={25}
              height={25}
              size={20}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Dịch vụ {booking.service_type_id === "ST001" ? "khám" : ""}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            {booking.service_type}
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="person-outline"
              width={25}
              height={25}
              size={20}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Bác sĩ phụ trách
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            Bs. {booking.veterinarian_id ? veterinarian.name : "Chưa xác định"}
          </Text>
        </View>
        <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="calendar-outline"
              width={25}
              height={25}
              size={20}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Ngày {booking.service_type_id === "ST001" ? "khám" : "tiếp nhận"}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            {moment(booking.arrival_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
          </Text>
        </View>
        {booking.service_type_id === "ST003" &&
        <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="calendar-outline"
              width={25}
              height={25}
              size={20}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Ngày kết thúc
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            {moment(booking.departure_date, "YYYY-MM-DD").format("DD/MM/YYYY")}
          </Text>
        </View>
        }
        <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 10,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="time-outline"
              width={25}
              height={25}
              size={20}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Giờ khám
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            {booking.estimate_time}
          </Text>
        </View>
        {booking.service_type_id === "ST001" ? (
    <View
    style={{
      height: "auto",
      backgroundColor: COLORS.white,
      marginHorizontal: 30,
      borderRadius: 10,
      elevation: 3,
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: COLORS.green,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
      }}
    >
      <Icon
        name="document-text-outline"
        width={25}
        height={25}
        size={20}
        color={COLORS.grey}
      />
      <Text
        style={{
          fontFamily: FONTS.semiBold,
          color: COLORS.grey,
          fontSize: 13,
        }}
      >
        Triệu chứng
      </Text>
    </View>
    <TextInput
      style={{
        fontFamily: FONTS.bold,
        color: COLORS.black,
        fontSize: 14,
        padding: 10,
      }}
      multiline
      maxLength={150}
      placeholder="Vui lòng nhập triệu chứng..."
      numberOfLines={3}
      onChangeText={(newTextSymptom) => setSymptom(newTextSymptom)}
    />
  </View>
        ):(
          <View
          style={{
            height: "auto",
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            elevation: 3,
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: COLORS.green,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Icon
              name="document-text-outline"
              width={25}
              height={25}
              size={20}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Ghi chú
            </Text>
          </View>
          <TextInput
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 14,
              padding: 10,
            }}
            multiline
            maxLength={150}
            placeholder="Ghi chú cho phòng khám (nếu có)..."
            numberOfLines={3}
            onChangeText={(newTextSymptom) => setSymptom(newTextSymptom)}
          />
        </View>
        )}
    

      
      </ScrollView>
      <View>
        <Modal
          isVisible={showModal}
          hasBackdrop={false}
          // backdropColor={COLORS.green}
          // backdropOpacity={0.9}
          // // backdropTransitionInTiming={15000}
          // backdropTransitionOutTiming={5000}
          animationInTiming={300}
          animationOutTiming={500}
          animationIn="zoomIn"
          animationOut="zoomOut"
          onModalHide={() => {
            if (modalClosedByButton === true) {
              navigation.navigate("BookingFinished", {
                booking: { ...booking, symptom: symptom },
              });
            }
          }}
        >
          <View
            style={{
              height: "auto",
              backgroundColor: COLORS.white,
              borderRadius: 10,
              elevation: 10,
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
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: FONTS.bold,
                  color: COLORS.white,
                }}
              >
                Xác nhận đặt lịch khám
              </Text>
            </View>
            <View style={{ margin: 20 }}>
              <Text style={{ fontFamily: FONTS.medium }}>
                Bấm xác nhận để hoàn tất việc đặt lịch khám.
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <ButtonFlex
                title="Trở về"
                stylesButton={{
                  backgroundColor: COLORS.grey,
                  flex: 1,
                  margin: 10,
                  paddingVertical: 15,
                }}
                stylesText={{ fontSize: 14 }}
                onPress={() => {
                  setShowModal(!showModal);
                  setModalClosedByButton(false);
                }}
              />
              <ButtonFlex
                title="Xác nhận"
                stylesButton={{
                  backgroundColor: COLORS.green,
                  flex: 1,
                  marginVertical: 10,
                  marginRight: 10,
                  paddingVertical: 15,
                }}
                stylesText={{ fontSize: 14 }}
                onPress={() => {
                  setShowModal(!showModal);
                  setModalClosedByButton(true);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
      <ButtonFloatBottom
        title="Tiếp tục"
        buttonColor={symptom ? COLORS.green : COLORS.grey}
        onPress={() => (symptom ? setShowModal(!showModal) : "")}
      />
    </>
  );
};

export default ConfirmBookingAndSymptomScreen;

const styles = StyleSheet.create({});
