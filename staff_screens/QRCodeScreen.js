import { Button, StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BarCodeScanner } from "expo-barcode-scanner";
import MainHeader from "../components/MainHeader";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";

import io from "socket.io-client";
const socket = io("https://clinicsystem.io.vn");

import { Audio } from 'expo-av';


const QRCodeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(true);
  const [sound, setSound] = React.useState();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  React.useEffect(() => {
    console.log("socket id khi mới vào: ", socket.id);
    socket.emit("login", { account_id: "staff" });
    console.log("Login sucess");

    return () => {
      if (socket) {
        console.log("Disconnect thành công ♥ !");
      }
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };

  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    try {
      const parsedData = JSON.parse(data);
      const bookingId = parsedData.booking_id;

      if (bookingId) {
        socket.emit("scan-check-in", { booking_id: bookingId });
        Alert.alert(
          "Thông báo",
          `Quét thành công! \nKhách hàng: ${parsedData.customer_name}`
        );
        await playSound()
      } else {
        Alert.alert("Lỗi", `Mã QR không hợp lệ!`);
      }
    } catch (error) {
      Alert.alert("Lỗi", `Mã QR không hợp lệ!`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleLogOut = () => {
    AsyncStorage.removeItem("UserLoggedInData");
    navigation.popToTop();
  };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async function playSound() {
    if (sound) {
      console.log('Unloading Sound');
      await sound.unloadAsync();
    }
    
    console.log('Loading Sound');
    const { sound: newSound } = await Audio.Sound.createAsync( require(`../assets/QRScanSound.mp3`)
    );
    setSound(newSound);
    console.log('Playing Sound');
    await newSound.playAsync();
  }

  async function playSound1() {
    setShow(true)
    if (sound) {
      console.log('Unloading Sound');
      await sound.unloadAsync();
    }
    
    console.log('Loading Sound');
    const { sound: newSound } = await Audio.Sound.createAsync( require(`../assets/ConMuaNgangQua.mp3`)
    );
    setSound(newSound);
    console.log('Playing Sound');
    await newSound.playAsync();
  }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <>
      <MainHeader iconHeader={"ios-home-outline"} navigation={navigation} />
      {/* <Button title="Chơi nhạc" onPress={playSound1}/>
      {show && <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>Đang phát: Cơn mưa ngang qua ♫</Text></View>
} */}

      <View style={{ flex: 1 }}>
        <View
          style={{
            borderRadius: 20,
            overflow: "hidden",
            marginHorizontal: 30,
            marginTop: 80,
          }}
        >
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: "auto", height: 350 }}
          />
        </View>
      </View>
      <ButtonFloatBottom
        buttonColor={scanned ? COLORS.green : COLORS.darkGrey}
        title="Ấn để quét QR"
        onPress={() => setScanned(false)}
      /> 
      
    </>
  );
};




// import { View, Text, Button } from 'react-native'
// import React from 'react'
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const QRCodeScreen = ({navigation}) => {
//     const handleLogOut = () => {
//     AsyncStorage.removeItem("UserLoggedInData");
//     navigation.popToTop();
//   };
//   return (
//     <View>
//       <Text>QRCodeScreen</Text>
//       <Button title='Đăng xuất' onPress={handleLogOut}/>
//     </View>
//   )
// }

export default QRCodeScreen
// const styles = StyleSheet.create({});
