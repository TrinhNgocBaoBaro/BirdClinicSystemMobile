import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";

export default function DetailServiceScreen({ navigation, route }) {
  const itemId = route.params.booking.id;
  let componentToRender;
  switch (itemId) {
    case "1":
      componentToRender = <HealthCheck />;
      break;
    case "2":
      componentToRender = <Boarding />;
      break;
    case "3":
      componentToRender = <Grooming />;
      break;
    case "4":
      componentToRender = <Emergency />;
      break;
    default:
      componentToRender = <DefaultComponent />;
      break;
  }
  return (
    <>
      <Header
        title={route.params.booking.name}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
      <StatusBar style="auto" />
        {componentToRender}
      </View>
      <ButtonFloatBottom title="Đặt lịch" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  
  },
});

import {SvgHealthCheck, SvgBloodTest,  SvgInfectiousDiseaseTest, SvgDNASexing, SvgXray,SvgFaecalTest,SvgEndoscopy} from "../components/Svg";
import { FlatGrid } from "react-native-super-grid";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
const dataHealthCheck = [
  {
    id: '1',
    name: 'Kiểm tra sức khỏe',
    type: 'HealthCheck',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  {
    id: '2',
    name: 'Chụp X-quang',
    type: 'Xray',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  {
    id: '3',
    name: 'Xét nghiệm máu',
    type: 'BloodTest',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  {
    id: '4',
    name: 'Xét nghiệm DNA giới tính',
    type: 'DNASexing',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  {
    id: '5',
    name: 'Xét nghiệm phân chim',
    type: 'FaecalTest',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  {
    id: '6',
    name: 'Nội soi',
    type: 'Endoscopy',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  {
    id: '7',
    name: 'Xét nghiệm bệnh truyền nhiễm',
    type: 'InfectiousDiseaseTest',
    description: 'Khám tổng quát các chẩn đoán sức khỏe'
  },
  // {
  //   id: '323',
  //   name: 'Xét nghiệm phân chim',
  //   type: 'FaecalTest',
  //   description: 'Khám tổng quát các chẩn đoán sức khỏe'
  // },
  // {
  //   id: '3232',
  //   name: 'Nội soi',
  //   type: 'Endoscopy',
  //   description: 'Khám tổng quát các chẩn đoán sức khỏe'
  // },
  // {
  //   id: '2122',
  //   name: 'Xét nghiệm bệnh truyền nhiễm',
  //   type: 'InfectiousDiseaseTest',
  //   description: 'Khám tổng quát các chẩn đoán sức khỏe'
  // },
]
const HealthCheck = () => {
  return (
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginVertical: 10}}><Icon name="information-circle-outline"  size={23} color={COLORS.green} />
    <Text style={{fontFamily: FONTS.medium, fontSize: 12}}>Các dịch vụ dưới đây có thể được bác sĩ chỉ định khi khám!</Text>
    </View>
    <FlatGrid
          itemDimension={130}
          spacing={30}
          data={dataHealthCheck}
          renderItem={({ item }) => (
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white,elevation:5, borderWidth: 2, borderColor: COLORS.green ,borderRadius: 10, padding: 10, height: 150, }} >
                    
            {item.type === 'HealthCheck' && (
              <SvgHealthCheck width={100} height={100} />
            )}
            {item.type === 'Xray' && (
              <SvgXray width={100} height={100} />
            )}
            {item.type === 'BloodTest' && (
              <SvgBloodTest width={100} height={100} />
            )} 
            {item.type === 'DNASexing' && (
              <SvgDNASexing width={100} height={100} />
            )} 
            {item.type === 'FaecalTest' && (
              <SvgFaecalTest width={100} height={100} />
            )} 
            {item.type === 'Endoscopy' && (
              <SvgEndoscopy width={100} height={100} />
            )} 
            {item.type === 'InfectiousDiseaseTest' && (
              <SvgInfectiousDiseaseTest width={100} height={100} />
            )}       
              <Text style={{fontFamily: FONTS.bold, fontSize: 12, marginTop: 5}} >{item.name}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          style={{marginBottom:80, paddingTop: 10}}
        />
      </>
  );
}

const Boarding = () => {
  return (
    <View>
      <Text>Nội trú</Text>
    </View>
  );
}

const Grooming = () => {
  return (
    <View>
      <Text>Spa chăm sóc</Text>
      {/* ... */}
    </View>
  );
}

const Emergency = () => {
  return (
    <View>
      <Text>0838439296</Text>
      {/* ... */}
    </View>
  );
}


const DefaultComponent = () =>  {
  return (
    <View>
      <Text>Default Component</Text>
      {/* ... */}
    </View>
  );
}
