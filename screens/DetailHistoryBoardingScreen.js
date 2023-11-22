import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { UIActivityIndicator, DotIndicator } from "react-native-indicators";

import createAxios from "../utils/axios";
import { ScrollView } from "react-native-gesture-handler";
const API = createAxios();

import * as ImagePicker from "expo-image-picker";

// import { socket } from "./LoginScreen";
import io from "socket.io-client";
const socket = io("https://clinicsystem.io.vn");

const deviceHeight = Dimensions.get("window").height;

const DetailHistoryBoardingScreen = ({ navigation, route }) => {
  const [bookingId, setBookingId] = React.useState(route.params.booking_id);
  const [accountId, setAccountId] = React.useState(route.params.account_id);

  const [image, setImage] = React.useState(null);

  const [textChat, setTextChat] = React.useState("");
  const [dataBooking, setDataBooking] = React.useState();
  const [dataMessage, setDataMessage] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [loadImage, setLoadImage] = React.useState(false);

  const scrollViewRef = useRef();

  React.useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    console.log(result.assets[0].uri);
    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  React.useEffect(() => {
    console.log("socket id khi mới vào: ", socket.id);

    socket.emit("login", { account_id: "customer1" });
    console.log("Login sucess");

    socket.on("server-send-data_seft", (message) => {
      // setDataMessage((prevMessages) => [...prevMessages, message]);
      console.log("send data seft ♥: ", message);
      fetchDataMessage();
    });
    socket.on("server-send-data", (message) => {
      // message.type = 'receive'
      // setDataMessage((prevMessages) => [...prevMessages, message]);
      console.log("send data♥: ", message);
      fetchDataMessage();
    });

    return () => {
      if (socket) {
        // socket.disconnect();
        console.log("Disconnect thành công ♥ !");
      }
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get(`/booking/${bookingId}`);
      if (response.data) {
        // console.log(response.data);
        setDataBooking(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataMessage = async () => {
    try {
      const response = await API.get(
        `/content_chat/?chat_id=75e72f990d5b6fe886b2d0430c1f7a&user1=${accountId}&user2=clinic`
      );
      if (response.data) {
        // console.log(response.data);
        setDataMessage(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async (textChat) => {
    //gửi message type sent and receive
    try {
      const [responseSent, responseReceive] = await Promise.all([
        API.post(`/content_chat`, {
          user1: accountId,
          user2: "clinic",
          message: textChat,
          type: "sent",
          chat_id: "75e72f990d5b6fe886b2d0430c1f7a",
        }),
        API.post(`/content_chat`, {
          user1: "clinic",
          user2: accountId,
          message: textChat,
          type: "receive",
          chat_id: "75e72f990d5b6fe886b2d0430c1f7a",
        }),
      ]);

      if (responseSent && responseReceive) {
        console.log("Cả hai message đã được gửi thành công");
        console.log("socket id khi gửi: ", socket.id);
        socket.emit("client-sent-message", {
          user1: accountId,
          user2: "clinic",
          message: textChat,
          type: "sent",
          chat_id: "75e72f990d5b6fe886b2d0430c1f7a",
        });
      } else {
        console.log("Có lỗi khi gửi một hoặc cả hai message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessageWithImage = async (textChat) => {
    //gửi message type sent and receive
    try {
      const formDataSent = new FormData();
      const localUri = image.uri;
      const filename = localUri.split("/").pop();
      const fileExtension = filename.split(".").pop();

      console.log("Local Uri: ", localUri);
      console.log("File Name: ", filename);
      console.log("File Extension: ", fileExtension);
      formDataSent.append("image", {
        uri: localUri,
        name: filename,
        type: `image/${fileExtension}`,
      });
      formDataSent.append("user1", accountId);
      formDataSent.append("user2", "clinic");
      formDataSent.append("type", "sent");
      formDataSent.append("message", textChat);
      formDataSent.append("chat_id", "75e72f990d5b6fe886b2d0430c1f7a");

      const formDataReceive = new FormData();
      formDataReceive.append("image", {
        uri: localUri,
        name: filename,
        type: `image/${fileExtension}`,
      });
      formDataReceive.append("user1", "clinic");
      formDataReceive.append("user2", accountId);
      formDataReceive.append("type", "receive");
      formDataReceive.append("message", textChat);
      formDataReceive.append("chat_id", "75e72f990d5b6fe886b2d0430c1f7a");

      const [responseSent, responseReceive] = await Promise.all([
        API.postWithHeaders(`/content_chat/img`, formDataSent, {
          "Content-Type": "multipart/form-data",
        }),
        API.postWithHeaders(`/content_chat/img`, formDataReceive, {
          "Content-Type": "multipart/form-data",
        }),
      ]);

      if (responseSent && responseReceive) {
        console.log("responseSent: ", responseSent);
        console.log("responseReceive: ", responseReceive);

        console.log("Cả hai message kèm ảnh đã được gửi thành công");
        console.log("socket id khi gửi: ", socket.id);
        socket.emit("client-sent-message", {
          user1: accountId,
          user2: "clinic",
          message: textChat,
          type: "sent",
          chat_id: "75e72f990d5b6fe886b2d0430c1f7a",
        });
      } else {
        console.log("Có lỗi khi gửi một hoặc cả hai message");
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    return () => {
      console.log("socket id khi thoát: ", socket.id);
    };
  }, [socket]);

  React.useEffect(() => {
    if (bookingId) {
      fetchData();
      console.log("Đã load");
    }
  }, [bookingId, load]);

  // React.useEffect(() => {
  //   fetchDataMessage();

  // }, [load, renderTrigger]);

  React.useEffect(() => {
    fetchDataMessage();
  }, []);

  React.useEffect(() => {
    if ((dataMessage, dataBooking)) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [dataMessage, dataBooking]);
  return (
    <>
      <Header
        title={"Theo dõi nội trú"}
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
        onPressRight={() => setLoad(!load)}
      />
      {dataBooking ? (
        <ScrollView style={{ flex: 1, backgroundColor: COLORS.white }}>
          {/* <Text> {dataBooking.booking_id}</Text>
          <Text> {dataBooking.bird.name}</Text>
          <Text> {dataBooking.veterinarian.name}</Text>
          <Text> {dataBooking.arrival_date}</Text> */}
          <View
            style={{
              // paddingHorizontal: 10,
              marginHorizontal: 20,
              marginVertical: 20,
              height: (deviceHeight * 70) / 100,
              backgroundColor: COLORS.darkGrey,
              borderRadius: 10,
            }}
          >
            <ScrollView style={{ flex: 1 }} ref={scrollViewRef}>
              {dataMessage ? (
                dataMessage.map((item, index) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent:
                        item.type === "sent" ? "flex-end" : "flex-start",
                    }}
                    key={index}
                  >
                    <View style={{ flexDirection: "column", maxWidth: "70%" }}>
                      {item.img_link && (
                        <View
                          style={{
                            alignSelf:
                              item.type === "sent" ? "flex-end" : "flex-start",
                            margin: 10,
                            backgroundColor: COLORS.white,
                            borderRadius: 10
                          }}
                        >
                          <Image
                            source={{ uri: item.img_link }}
                            style={{
                              width: 200,
                              height: 150,
                              borderRadius: 5,
                            }}
                            resizeMode="cover"
                          />
                        </View>
                      )}
                      {item.message && (
                        <View
                          style={{
                            width: "auto",

                            backgroundColor:
                              item.type === "sent"
                                ? COLORS.green
                                : COLORS.white,
                            borderRadius: 10,
                            marginBottom: 10,
                            marginTop: index === 0 ? 10 : 0,
                            padding: 10,
                            marginHorizontal: 10,
                            alignSelf:
                              item.type === "sent" ? "flex-end" : "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: FONTS.semiBold,
                              color:
                                item.type === "sent"
                                  ? COLORS.white
                                  : COLORS.black,
                            }}
                          >
                            {item.message}
                          </Text>
                          {/* <Text
                    style={{
                      fontFamily: FONTS.semiBold,
                      color:
                        item.type === "sent"
                          ? COLORS.darkGrey
                          : COLORS.grey,
                      fontSize: 11,
                    }}
                  >
                    01:24
                  </Text> */}
                        </View>
                      )}
                    </View>
                  </View>
                ))
              ) : (
                <View
                  style={{
                    height: (deviceHeight * 70) / 100,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.darkGrey,
                    borderRadius: 10,
                  }}
                >
                  <UIActivityIndicator size={40} color={COLORS.green} />
                </View>
              )}
            </ScrollView>
            {image && (
              <View style={{padding: 10, backgroundColor: COLORS.white, width: 220, borderRadius: 10, marginTop: 20, marginHorizontal: 10, marginBottom: 10}}>
                <Pressable style={{position: 'absolute', right: -15, top: -15}} onPress={()=>setImage()}>
                <Icon
                
                name="close-circle"
                size={25}
                color={COLORS.green}
              />
                </Pressable>  
                <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 150, borderRadius: 5 }}
            />
              </View>  
          )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 20,
              marginBottom: 10,
              alignItems: "stretch",
            }}
          >
            <View style={styles.searchSection}>
              <TextInput
                style={{
                  justifyContent: "center",
                  padding: 10,
                  height: "auto",
                  backgroundColor: COLORS.white,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: COLORS.green,
                  flex: 1,
                  marginRight: 5,
                }}
                placeholder="Nhập để chat"
                cursorColor={COLORS.green}
                multiline
                maxLength={150}
                value={textChat}
                onChangeText={(newTextChat) => setTextChat(newTextChat)}
              />
              <Icon
                style={styles.searchIcon}
                name="close-circle"
                size={25}
                color={COLORS.lightGrey}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={pickImage}
              style={{
                backgroundColor: COLORS.green,
                paddingHorizontal: 15,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <Icon name="image" size={30} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (!image) {
                  sendMessage(textChat);
                } else {
                  sendMessageWithImage(textChat);
                }
                setTextChat("");
                setImage();
              }}
              style={{
                backgroundColor: COLORS.green,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.semiBold,
                  color: COLORS.white,
                  fontSize: 15,
                }}
              >
                Gửi
              </Text>
            </TouchableOpacity>
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

export default DetailHistoryBoardingScreen;

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  searchIcon: {
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
});
