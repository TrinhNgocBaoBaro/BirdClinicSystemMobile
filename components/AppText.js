import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

const AppText = ({ children, style, typeWeight, ...restProps }) => {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const fontFamily = typeWeight ? `Inter-${typeWeight}` : "Inter-Medium";

  return (
    <Text style={[styles.myAppText, style, { fontFamily }]} {...restProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  myAppText: {},
});

export default AppText;
