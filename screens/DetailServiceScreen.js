import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import { MotiView } from "moti";
import createAxios from "../utils/axios";
const API = createAxios();

export default function DetailServiceScreen({ navigation, route }) {
  const [booking, setBooking] = React.useState(route.params.booking)
  const service_type_id = route.params.booking.service_type_id;
  const service_type = route.params.booking.service_type;
  let componentToRender;
  switch (service_type_id) {
    case "ST001":
      componentToRender = <HealthCheck service_type_id={service_type_id} />;
      break;
    case "ST003":
      componentToRender = <Boarding />;
      break;
    case "ST002":
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
        title={service_type}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
      <StatusBar style="auto" />
        {componentToRender}
      </View>
      <ButtonFloatBottom buttonColor={COLORS.green} title="Đặt lịch" onPress={()=>{navigation.navigate('SelectBirdProfile', {booking: booking})}}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  
  },
});

import {SvgHealthCheck, SvgBloodTest, SvgSurgery,  SvgInfectiousDiseaseTest, SvgDNASexing, SvgXray,SvgFaecalTest,SvgEndoscopy} from "../components/Svg";
import { FlatGrid } from "react-native-super-grid";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";

const dataHealthCheckTest = [
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
]
const HealthCheck = ({service_type_id}) => {
  const [dataHealthCheck, setDataHealthCheck] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await API.get(
        `/serviceType/${service_type_id}`
      );
      if (response.data) {
         console.log(response.data[0]);
         setDataHealthCheck(response.data[0].services)
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginVertical: 10}}><Icon name="information-circle-outline"  size={23} color={COLORS.green} />
    <Text style={{fontFamily: FONTS.medium, fontSize: 12, marginLeft: 5}}>Các dịch vụ dưới đây có thể được bác sĩ chỉ định khi khám!</Text>
    </View>
    <FlatGrid
          itemDimension={130}
          spacing={30}
          data={dataHealthCheck}
          renderItem={({ item,index }) => (
             <MotiView from={{opacity: 0, translateY: 50}}
            animate={{opacity: 1, translateY:0}}
            transition={{delay: index * 200}}
             style={{alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white,elevation:5, borderWidth: 2, borderColor: COLORS.green ,borderRadius: 10, padding: 10, height: 150, }} >
                    
            {item.image === 'HealthCheck' && (
              <SvgHealthCheck width={100} height={100} />
            )}
            {item.image === 'Xray' && (
              <SvgXray width={100} height={100} />
            )}
            {item.image === 'BloodTest' && (
              <SvgBloodTest width={100} height={100} />
            )}
            {item.image === 'Surgery' && (
              <SvgSurgery width={100} height={100} />
            )} 
            {item.image === 'DNASexing' && (
              <SvgDNASexing width={100} height={100} />
            )} 
            {item.image === 'FaecalTest' && (
              <SvgFaecalTest width={100} height={100} />
            )} 
            {item.image === 'Endoscopy' && (
              <SvgEndoscopy width={100} height={100} />
            )} 
            {item.image === 'InfectiousDiseaseTest' && (
              <SvgInfectiousDiseaseTest width={100} height={100} />
            )}       
              <Text style={{fontFamily: FONTS.bold, fontSize: 12, marginTop: 5, textAlign: 'center'}} >{item.name}</Text>
            </MotiView>
          )}
          keyExtractor={(item) => item.service_id}
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
