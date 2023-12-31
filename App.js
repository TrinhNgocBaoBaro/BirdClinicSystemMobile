import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Icon1 from "react-native-vector-icons/SimpleLineIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./constants/color"
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// import io from "socket.io-client";
// const socket = io("https://clinicsystem.io.vn");
// export {socket}; 

// Customer Screen

import HomeScreen from "./screens/HomeScreen"
import ServiceScreen from "./screens/ServiceScreen"
import BirdScreen from "./screens/BirdScreen"
import HistoryScreen from "./screens/HistoryScreen"
import Detail from "./screens/DetailScreen"
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import DetailServiceScreen from './screens/DetailServiceScreen';
import DetailBirdProfile from './screens/DetailBirdProfile';
import DetailMedicalRecord from './screens/DetailMedicalRecord';
import SelectBirdProfile from './screens/SelectBirdProfile';
import ConfirmBirdProfileScreen from './screens/ConfirmBirdProfileScreen';
import SelectTypeBookingScreen from './screens/SelectTypeBookingScreen';
import ChooseDoctorScreen from './screens/ChooseDoctorScreen';
import ChooseDateByDoctorScreen from './screens/ChooseDateByDoctorScreen';
import ConfirmBookingAndSymptomScreen from './screens/ConfirmBookingAndSymptomScreen';
import SplashScreen from './screens/SplashScreen';
import BookingFinishedScreen from './screens/BookingFinishedScreen';
import ChooseDateByDateScreen from './screens/ChooseDateByDateScreen';
import DetailBookingScreen from './screens/DetailBookingScreen';
import DetailServiceFormScreen from './screens/DetailServiceFormScreen';
import DetailBookingBoardingScreen from './screens/DetailBookingBoardingScreen';
import DetailHistoryBoardingScreen from './screens/DetailHistoryBoardingScreen';
import DetailHistoryBookingScreen from './screens/DetailHistoryBookingScreen';
import CreateBirdProfileScreen from './screens/CreateBirdProfileScreen';
import ChatBoardingScreen from './screens/ChatBoardingScreen';
import ServiceRequestBoardingScreen from './screens/ServiceRequestBoardingScreen';
import RegisterScreen from './screens/RegisterScreen';
// Staff Screen
import QRCodeScreen from './staff_screens/QRCodeScreen';
import InputOTPScreen from './screens/InputOTPScreen';
import InputOTPScreenOld from './screens/InputOTPScreenOld';

const CustomTabBarButton = ({ onPress }) => (
  <View style={{
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    top: -50,
    elevation: 1
  }}>
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}><Icon name="add-outline" color={COLORS.white} size={40} />
    </TouchableOpacity>
  </View>

)



const TabRoute = () => {

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarStyle: {
          backgroundColor: COLORS.white,
          height: 60,
        }
      }}>
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Icon name={focused ? `ios-home`:`ios-home-outline` } color={color} size={25} />;
          },
          headerShown: false,
        }} />
      <Tab.Screen
        name="Chim"
        component={BirdScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? <Icon name="logo-twitter" color={color} size={30} />
            : <Icon1 name="social-twitter" color={color} size={28} />;
          },
          headerShown: false,

        }} />
      <Tab.Screen
        name="Booking"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="heart-outline" color={color} size={28} />;
          },
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          ),
          headerShown: false,

        }} />
      <Tab.Screen
        name="Lịch sử"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Icon name={focused ? "timer":"timer-outline"} color={color} size={28} />;
          },
          headerShown: false,
        }} />
      <Tab.Screen
        name="Khác"
        component={Detail}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return <Icon name={focused ? `albums`:`albums-outline` } color={color} size={25} />;
          },
          headerShown: false,
        }} />
    </Tab.Navigator>
  )
}



export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
        <Stack.Screen name="Home" component={TabRoute} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="DetailService" component={DetailServiceScreen} />
        <Stack.Screen name="DetailBirdProfile" component={DetailBirdProfile} />
        <Stack.Screen name="DetailMedicalRecord" component={DetailMedicalRecord} />
        <Stack.Screen name="SelectBirdProfile" component={SelectBirdProfile} />
        <Stack.Screen name="ConfirmBirdProfile" component={ConfirmBirdProfileScreen} />
        <Stack.Screen name="SelectTypeBooking" component={SelectTypeBookingScreen} />
        <Stack.Screen name="ChooseDoctor" component={ChooseDoctorScreen} />
        <Stack.Screen name="ChooseDateByDoctor" component={ChooseDateByDoctorScreen} />
        <Stack.Screen name="ChooseDateByDate" component={ChooseDateByDateScreen} />
        <Stack.Screen name="ConfirmBookingAndSymptom" component={ConfirmBookingAndSymptomScreen} />
        <Stack.Screen name="BookingFinished" component={BookingFinishedScreen} />
        <Stack.Screen name="DetailBooking" component={DetailBookingScreen} />
        <Stack.Screen name="DetailBookingBoarding" component={DetailBookingBoardingScreen} />
        <Stack.Screen name="DetailServiceForm" component={DetailServiceFormScreen} />
        <Stack.Screen name="DetailHistoryBoarding" component={DetailHistoryBoardingScreen} />
        <Stack.Screen name="DetailHistoryBooking" component={DetailHistoryBookingScreen} />
        <Stack.Screen name="CreateBirdProfile" component={CreateBirdProfileScreen} />
        <Stack.Screen name="ChatBoarding" component={ChatBoardingScreen} />
        <Stack.Screen name="ServiceRequestBoarding" component={ServiceRequestBoardingScreen} />
        <Stack.Screen name="InputOTPOld" component={InputOTPScreenOld} />
        <Stack.Screen name="InputOTP" component={InputOTPScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>

    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  // shadow: {
  //     shadowColor: '#7F5DF0',
  //     shadowOffset: {
  //       width: 0,
  //       height: 10,
  //     },
  //     shadowOpacity: 0.25,
  //     elevation: 5,
  // },
  shadow: {
    shadowColor: '#52006A',  
    elevation: 5,  
},
});