// import { Button, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import MainHeader from "../components/MainHeader";
// import { ButtonFloatBottom } from "../components/Button";
// import COLORS from "../constants/color";

// const QRCodeScreen = ({ navigation }) => {
//   const [hasPermission, setHasPermission] = React.useState(null);
//   const [scanned, setScanned] = React.useState(false);

//   React.useEffect(() => {
//     const getBarCodeScannerPermissions = async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     };

//     getBarCodeScannerPermissions();
//   }, []);

//   const handleBarCodeScanned = async ({ type, data }) => {
//     setScanned(true);
//     // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//     const parsedData = JSON.parse(data);
//     const bookingId = parsedData.booking_id;
//     if (bookingId) {
//       try {
        
//         const url = `https://clinicsystem.io.vn/booking/${bookingId}`;

//         const response = await fetch(url, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             status: "checked_in",
//           }),    
//         });
//         if(response.ok){
//           // console.log(response)
//           alert(`Check in thành công cho booking ${bookingId} !`);

//         }
//       } catch (error) {
//         console.error("Error updating data:", error.message);
//       }
//     }
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   const handleLogOut = () => {
//     AsyncStorage.removeItem("UserLoggedInData");
//     navigation.popToTop();
//   };

//   return (
//     <>
//       <MainHeader iconHeader={"ios-home-outline"} navigation={navigation} />
//       <View style={{ flex: 1 }}>
//       <View style={{borderRadius: 20, overflow: 'hidden', marginHorizontal: 30, marginTop: 80}}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={{ width: 'auto', height: 300, }}
//       />
//       </View>
//       {scanned && (
//         <Button title={"Ấn để quét"} onPress={() => setScanned(false)} />
//       )}
//       </View>
//       <ButtonFloatBottom buttonColor={COLORS.green} title="Quét QR" onPress={()=>setScanned(false)}/>
//     </>
//   );
// };

// export default QRCodeScreen;

// const styles = StyleSheet.create({});
import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";


const QRCodeScreen = ({navigation}) => {
    const handleLogOut = () => {
    AsyncStorage.removeItem("UserLoggedInData");
    navigation.popToTop();
  };
  return (
    <View>
      <Text>QRCodeScreen</Text>
      <Button title='Đăng xuất' onPress={handleLogOut}/>
    </View>
  )
}

export default QRCodeScreen