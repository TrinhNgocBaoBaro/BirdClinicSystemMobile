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

const ConfirmBookingAndSymptomScreen = ({ navigation }) => {
  const [sympton, setSympton] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [modalClosedByButton, setModalClosedByButton] = React.useState(false);

  return (
    <>
      <Header
        title="Đặt lịch khám"
        onPress={() => navigation.goBack()}
        rightIcon={"close"}
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
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SvgBirdIcon width={35} height={35} />
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
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            Con chim xanh
          </Text>
          <Image
            source={{
              uri: "https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg",
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              position: "absolute",
              right: 15,
              top: 15,
            }}
          />
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
              width={30}
              height={30}
              size={25}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Dịch vụ khám
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            Kiểm tra sức khỏe
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
              width={30}
              height={30}
              size={25}
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
            Bs. Nguyễn Lê Hữu
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
              width={30}
              height={30}
              size={25}
              color={COLORS.grey}
            />
            <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.grey,
                fontSize: 13,
              }}
            >
              Ngày khám
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.bold,
              color: COLORS.black,
              fontSize: 16,
            }}
          >
            30/10/2023
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
              name="time-outline"
              width={30}
              height={30}
              size={25}
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
            10:15
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
              width={30}
              height={30}
              size={25}
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
            onChangeText={(newTextSympton) => setSympton(newTextSympton)}
          />
        </View>
      </ScrollView>
      <View>
        <Modal
          isVisible={showModal}
          hasBackdrop={false}
          // backdropColor={COLORS.green}
          // backdropOpacity={0.9}
          // // backdropTransitionInTiming={15000}
          // backdropTransitionOutTiming={5000}
          animationInTiming={1500}
          animationOutTiming={1000}
          animationIn="bounce"
          animationOut="fadeOutRightBig"
          onModalHide={() => {
            if (modalClosedByButton === true) {
              navigation.navigate("Profile");
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
        buttonColor={COLORS.grey}
        onPress={() => setShowModal(!showModal)}
      />
    </>
  );
};

export default ConfirmBookingAndSymptomScreen;

const styles = StyleSheet.create({});
