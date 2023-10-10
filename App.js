import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import COLORS from "./constants/color"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen"
import ServiceScreen from "./screens/ServiceScreen"
import BirdScreen from "./screens/BirdScreen"
import HistoryScreen from "./screens/HistoryScreen"
import Detail from "./screens/DetailScreen"
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

const CustomTabBarButton = ({ onPress }) => (
  <View style={{
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    top: -40,
  }}>
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}>
        <Icon name="add" color={COLORS.white} size={40} />
      </View>
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
          tabBarIcon: ({ color }) => {
            return <Icon name="ios-home-outline" color={color} size={25} />;
          },
          headerShown: false,
        }} />
      <Tab.Screen
        name="Dịch vụ"
        component={ServiceScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="layers-outline" color={color} size={28} />;
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
        name="Chim"
        component={BirdScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="skull-outline" color={color} size={28} />;
          },
          headerShown: false,
        }} />
      <Tab.Screen
        name="Lịch sử"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Icon name="folder-open-outline" color={color} size={28} />;
          },
          headerShown: false,
        }} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={TabRoute} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

      </Stack.Navigator>
      {/* <TabRoute/> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  shadow: {
      shadowColor: '#7F5DF0',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      elevation: 5,
  },
});