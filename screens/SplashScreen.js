import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/color';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    // Kiểm tra đăng nhập
    const checkLogin = async () => {
      const UserLoggedInData = await AsyncStorage.getItem("UserLoggedInData");
      if (UserLoggedInData) {
        navigation.navigate('Home'); // Đăng nhập thành công, chuyển đến trang "Home"
      } else {
        navigation.navigate('Login'); // Người dùng chưa đăng nhập, chuyển đến màn hình đăng nhập
      }
    }

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large"  color={COLORS.green}/>
    </View>
  );
}