import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/color';
import { useIsFocused } from '@react-navigation/native';
import { UIActivityIndicator } from 'react-native-indicators';
import { SvgBirdBackground } from '../components/Svg';
export default function SplashScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Kiểm tra đăng nhập
    const checkLogin = async () => {
      const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
      const parseUserData = JSON.parse(UserLoggedInData)
      if (UserLoggedInData) {
        if(parseUserData.role === 'customer'){
        navigation.navigate('Home'); // Đăng nhập thành công, chuyển đến trang "Home"
      }else if(parseUserData.role === 'staff'){
        navigation.navigate('QRCode');
      }
      } else {
        navigation.navigate('Login'); // Người dùng chưa đăng nhập, chuyển đến màn hình đăng nhập
      }
    }

    checkLogin();
  }, [isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.white }}>
      {/* <UIActivityIndicator size={40}  color={COLORS.green}/> */}
      <SvgBirdBackground width={150} height={150}/>

      <View style={styles.textLogo}>
          <Text style={styles.typeText1}>
            Bird
            <Text style={styles.typeText2}>
              Clinic
            </Text>
          </Text>
          </View>
    
    </View>
  );
}
const styles = StyleSheet.create({
  textLogo: {
    marginTop: 30
  },
  typeText1: {
    fontSize: 34,
    color: COLORS.black,
    fontFamily: 'Inter-Black'
  },
  typeText2: {
    fontSize: 34,
    color: COLORS.green,
    fontFamily: 'Inter-Black'
  },
});