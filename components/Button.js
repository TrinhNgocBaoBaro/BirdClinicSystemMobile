// import React from 'react'
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import COLORS from "../constants/color";


// const ButtonFlex = ({ title, onPress = () => {} }) => {
//     return (
//       <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
//         <View style={styles.btnDetail}>
//           <Text style={styles.smallTitle}>{title}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

// const styles = StyleSheet.create({
//     smallTitle: { color: COLORS.white, fontWeight: "bold", fontSize: 10 },
//     btnDetail: {
//         backgroundColor: COLORS.green,
//         height: 20,
//         width: 60,
//         borderRadius: 5,
//         justifyContent: "center",
//         alignItems: "center",
//       },
// });

// export {ButtonFlex};
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import COLORS from "../constants/color";

const ButtonFlex = ({ title, onPress }) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.5}
        style={styles.button}
        onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row', // Đảm bảo nội dung button hiển thị theo chiều ngang
    alignItems: 'center', // Canh chỉnh theo chiều ngang
    justifyContent: 'center', // Canh chỉnh theo chiều dọc
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: COLORS.green, // Màu nền button
    borderRadius: 5,
    flexWrap: 'wrap', // Cho phép text wrap nếu nội dung quá dài
  },
  buttonText: {
    color: COLORS.white, // Màu chữ
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center', // Canh chỉnh văn bản theo chiều ngang
  },
});

export {ButtonFlex};
