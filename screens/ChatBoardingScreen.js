import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  StatusBar,
  SafeAreaView
} from "react-native";
import React, { useRef } from "react";
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { UIActivityIndicator } from "react-native-indicators";
import { SvgBirdBackground } from "../components/Svg";

import createAxios from "../utils/axios";
import { ScrollView } from "react-native-gesture-handler";
const API = createAxios();

import * as ImagePicker from "expo-image-picker";

import io from "socket.io-client";
const socket = io("https://clinicsystem.io.vn");

const deviceHeight = Dimensions.get("window").height;

const ChatBoardingScreen = ({ navigation, route }) => {
  const accountId = route.params.account_id;
  const chatId = route.params.chat_id
  const [image, setImage] = React.useState(null);
  const [textChat, setTextChat] = React.useState("");
  const [dataMessage, setDataMessage] = React.useState();
  const [load, setLoad] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const fetchDataMessage = async () => {
    try {
      const response = await API.get(
        `/content_chat/?chat_id=${chatId}&user1=${accountId}&user2=clinic`
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
          chat_id: chatId,
        }),
        API.post(`/content_chat`, {
          user1: "clinic",
          user2: accountId,
          message: textChat,
          type: "receive",
          chat_id: chatId,
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
          chat_id: chatId,
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
      formDataSent.append("chat_id", chatId);

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
      formDataReceive.append("chat_id", chatId);

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
          chat_id: chatId,
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
    if (accountId) fetchDataMessage();
  }, []);

  React.useEffect(() => {
    if (dataMessage) {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }
  }, [dataMessage]);

  return (
    <>
      <SafeAreaView>
            <View style={styles.top}>
                <Pressable onPress={()=>navigation.goBack()}>
                    <View style={{ height: 40, width: 40, marginLeft: 20, justifyContent: 'center' }}>
                        <Icon name="arrow-back-outline" size={28} color={COLORS.black} />
                    </View>
                </Pressable>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>                   
                        <Text style={styles.textTitle}>Dịch vụ nội trú{" "}</Text>
                        <Icon name="shield-checkmark" size={30} color={COLORS.green}/>

                </View>
                <Pressable onPress={()=>{}}>
                <View 
                    style={{ 
                        marginRight: 20, 
                        width:40, 
                        height: 40,
                        justifyContent: 'center' }}>
                        <Icon name="videocam-outline" size={30} color={COLORS.black} />
                </View>
                </Pressable>
            </View>
      </SafeAreaView>
      {dataMessage ? (
          <ScrollView style={{ flex: 1, backgroundColor: COLORS.white}} ref={scrollViewRef}>
            <View style={{alignItems: 'center', marginVertical: 20}}>

            <SvgBirdBackground width={100} height={100} />

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.typeText1}>
              Bird
              <Text style={styles.typeText2}>Clinic</Text>
              </Text>
            </View>
              <Text style={{fontFamily: FONTS.medium, textAlign: 'center', marginHorizontal: 50, color: COLORS.grey}}>Phòng khám chim cảnh, cung cấp các dịch vụ khám bệnh, nội trú, spa chăm sóc cho chú chim của bạn,...</Text>
            </View>
                    
              {dataMessage.map((item, index) => (
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
                          marginHorizontal: 15,
                          backgroundColor: COLORS.darkGrey,
                          borderRadius: 10,
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
                            item.type === "sent" ? COLORS.green : COLORS.white,
                          borderRadius: 10,
                          marginBottom: 10,
                          marginTop: index === 0 ? 10 : 0,
                          padding: 10,
                          marginHorizontal: 15,
                          elevation: 2,
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
              ))}

          </ScrollView>):
          (
            <View
              style={{
                // height: (deviceHeight * 70) / 100,
                flex:1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.white,
              }}
            >
            {/* // <View style={{marginTop: (deviceHeight * 0.35)}}> */}
              <UIActivityIndicator size={40} color={COLORS.green} />
           </View>
          )}

{image && (
            <View
              style={{
                padding: 10,
                backgroundColor: COLORS.white,
                width: 220,
                borderRadius: 10,
                marginTop: 20,
                marginHorizontal: 10,
                marginBottom: 10,
              }}
            >
              <Pressable
                style={{ position: "absolute", right: -15, top: -15 }}
                onPress={() => setImage()}
              >
                <Icon name="close-circle" size={25} color={COLORS.green} />
              </Pressable>
              <Image
                source={{ uri: image.uri }}
                style={{ width: 200, height: 150, borderRadius: 5 }}
              />
            </View>
          )}
        
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            alignItems: "stretch",
            marginVertical: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={pickImage}
            style={{
              backgroundColor: COLORS.white,
              paddingHorizontal: 15,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 5,
              elevation: 3,
            }}
          >
            <Icon name="image" size={30} color={COLORS.green} />
          </TouchableOpacity>

          <View style={styles.searchSection}>
            <TextInput
              style={{
                justifyContent: "center",
                paddingVertical: 10,
                paddingLeft: 20,
                paddingRight: 40,
                height: "auto",
                backgroundColor: COLORS.white,
                borderWidth: 1,
                borderRadius: 50,
                borderColor: COLORS.green,
                flex: 1,
                elevation: 3,
                fontFamily: FONTS.semiBold,
              }}
              placeholder="Nhập để chat"
              cursorColor={COLORS.green}
              
              maxLength={150}
              value={textChat}
              onChangeText={(newTextChat) => setTextChat(newTextChat)}
            />
            {textChat && (
              <TouchableOpacity
                onPress={() => setTextChat("")}
                style={styles.removeIcon}
              >
                <Icon name="close-circle" size={25} color={COLORS.lightGrey} />
              </TouchableOpacity>
            )}
          </View>

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
              elevation: 3,
            }}
          >
            {/* <Text
              style={{
                fontFamily: FONTS.semiBold,
                color: COLORS.white,
                fontSize: 15,
              }}
            >
              Gửi
            </Text> */}
            <Icon name="send" size={20} color={COLORS.white} />
          </TouchableOpacity>
          
      </View>
    </>
  );
};

export default ChatBoardingScreen;

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5
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
      top: {
        marginTop: StatusBar.currentHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.darkGrey,
    },
    textTitle: {
        fontSize: 22,
        color: COLORS.black,
        fontFamily: FONTS.semiBold
    },
    typeText1: {
      fontSize: 30,
      color: COLORS.black,
      fontFamily: "Inter-Black",
    },
    typeText2: {
      fontSize: 30,
      color: COLORS.green,
      fontFamily: "Inter-Black",
    },
});
