import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from "react-native";
import Header from "../components/Header";
import { ButtonFloatBottom } from "../components/Button";
import COLORS from "../constants/color";
import { MotiView } from "moti";
import createAxios from "../utils/axios";
const API = createAxios();
import { UIActivityIndicator } from "react-native-indicators";

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
      componentToRender = <Boarding service_type_id={service_type_id} />;
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
  typeText1: {
    fontSize: 30,
    color: COLORS.black,
    fontFamily: "Inter-Black",
  },
  typeText2: {
    fontSize: 30,
    color: COLORS.green,
    fontFamily: "Inter-Black",
  },
});

import {SvgHealthCheck, SvgBloodTest, SvgSurgery,  SvgInfectiousDiseaseTest, SvgDNASexing, SvgXray,SvgFaecalTest,SvgEndoscopy,SvgServiceDefault} from "../components/Svg";
import { FlatGrid } from "react-native-super-grid";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import * as SvgComponents from "../components/Svg";


const HealthCheck = ({service_type_id}) => {
  const [dataHealthCheck, setDataHealthCheck] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await API.get(
        `/service-type/${service_type_id}`
      );
      if (response.data) {
        //  console.log("Data Service Type",response.data[0]);
         setDataHealthCheck(response.data[0].services)
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  const componentSvg = (nameSvg) =>{
    const SelectedSvg = SvgComponents[`Svg${nameSvg}`];

      if (SelectedSvg) {
        return  <SelectedSvg width={100} height={100} />
      }else {
        return  <SvgServiceDefault width={100} height={100} />
      }
  }

  React.useEffect(()=>{
    fetchData();
  },[])
  return (
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginVertical: 10, marginHorizontal:50}}><Icon name="information-circle-outline"  size={23} color={COLORS.green} />
    <Text style={{fontFamily: FONTS.medium, fontSize: 13, marginLeft: 5}}>Các dịch vụ dưới đây có thể được bác sĩ chỉ định khi khám!</Text>
    </View>
    {dataHealthCheck.length !== 0 ? 
     <FlatGrid
     itemDimension={130}
     spacing={30}
     data={dataHealthCheck}
     renderItem={({ item,index }) => (
        <MotiView from={{opacity: 0, translateY: 50}}
       animate={{opacity: 1, translateY:0}}
       transition={{delay: index * 200}}
        style={{alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white,elevation:5, borderWidth: 2, borderColor: COLORS.green ,borderRadius: 10, padding: 10, height: 150, marginTop: index === 0 || index === 1 ? 10 : 0      }} >
               
       {/* {item.image === 'HealthCheck' && (
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
       )}        */}
        {componentSvg(item.image)}
         <Text style={{fontFamily: FONTS.bold, fontSize: 12, marginTop: 5, textAlign: 'center'}} >{item.name}</Text>
       </MotiView>
     )}
     keyExtractor={(item) => item.service_id}
     style={{marginBottom:80, paddingTop: 10}}
   /> :  <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <UIActivityIndicator size={40} color={COLORS.green} />
        </View>
  }
   
      </>
  );
}

const Boarding = ({service_type_id}) => {
  const [dataBirdSize, setDataBirdSize] = React.useState([]);
  const [dataServicePackage, setDataServicePackage] = React.useState([]);

  const colorSize = {
    SZ001: {
      color: COLORS.orange
    },
    SZ002: {
      color: COLORS.blue
    },
    SZ003: {
      color: COLORS.pink
    },
    SZ004: {
      color: COLORS.red
    },
  }

  const fetchDataBirdSize = async () => {
    try {
      const response = await API.get(
        `/bird-size/`
      );
      if (response.data) {
        const arrayDataBirdSize = response.data
        const arrayAfterFilter = arrayDataBirdSize.filter((item) => (item.bird_size_id !== "SZ005") )
        setDataBirdSize(arrayAfterFilter)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDataServicePackage = async () => {
    try {
      const response = await API.get(
        `/service-package/?service_type_id=${service_type_id}`
      );
      if (response.data) {
        const arrayDataServicePackage = response.data
        setDataServicePackage(arrayDataServicePackage)
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    fetchDataBirdSize();
    fetchDataServicePackage();
  },[])

  function formatCurrency(amount) {
    return parseFloat(amount).toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }

  return (
    <>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginVertical: 10}}><Icon name="information-circle-outline"  size={23} color={COLORS.green} />
    <Text style={{fontFamily: FONTS.medium, fontSize: 14, marginLeft: 5}}>Bảng giá dịch vụ nội trú dựa trên kích thước.</Text>
    </View>
    {dataBirdSize.length !== 0 && dataServicePackage !== 0 ? 
    <ScrollView style={{marginBottom: 80}}>
      {dataBirdSize && dataBirdSize.map((item,index)=> (
        <MotiView from={{opacity: 0, translateY: 50}}
        animate={{opacity: 1, translateY:0}}
        transition={{delay: index * 300}} 
        style={{backgroundColor: COLORS.white, elevation: 5, marginTop: 30, marginBottom: dataBirdSize.length === index + 1 ? 30: 0,marginHorizontal: 30,borderRadius: 10, overflow: 'hidden'}} key={index}>
          <View style={{backgroundColor: colorSize[item.bird_size_id].color, alignItems: 'center',paddingVertical: 20, paddingHorizontal: 40}}>          
          <Text style={{fontFamily: FONTS.bold, color: COLORS.white, fontSize: 18}}>{item.size}</Text>
          <Text style={{fontFamily: FONTS.semiBold, color: COLORS.white, fontSize: 13, textAlign: 'center'}}>{item.breeds}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <View style={{paddingHorizontal: 20, paddingTop: 15, flexDirection: "row", justifyContent: "space-between"}}>  
                <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, fontSize: 13, color: COLORS.grey}}>Loại dịch vụ</Text>
                <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, fontSize: 13, color: COLORS.grey}}>Giá / ngày</Text>
            </View>
          {dataServicePackage && dataServicePackage.map((itemPackage,indexPackage)=>{
            if(itemPackage.bird_size_id === item.bird_size_id){ 
              return    <View style={{paddingHorizontal: 20, paddingVertical: 15, flexDirection: "row", justifyContent: "space-between"}} key={indexPackage}>  
                            <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, fontSize: 14}}>{itemPackage.package_name}</Text>
                            <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, fontSize: 13, color: colorSize[item.bird_size_id].color}}>{formatCurrency(itemPackage.price)}</Text>
                        </View>
            }
         }
         )}
         </View>
          

        </MotiView>
      ))}
      
    </ScrollView>
    :
    <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.white,
          }}
        >
          <UIActivityIndicator size={40} color={COLORS.green} />
        </View>
    }
    </>
  );
}

const Grooming = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
      <Text style={{fontFamily: FONTS.bold, fontSize: 15}}>Cắt tỉa móng</Text>
      <Text style={{fontFamily: FONTS.bold, fontSize: 15}}>Cắt tỉa mỏ</Text>
      <Text style={{fontFamily: FONTS.bold, fontSize: 15}}>Tỉa lông cánh</Text>

      {/* ... */}
    </View>
  );
}

import { SvgBirdBackground } from "../components/Svg";
const Emergency = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: 80}}>
      <View style={{ marginBottom: 20 }}>
          <Text style={styles.typeText1}>
            Bird
            <Text style={styles.typeText2}>Clinic</Text>
          </Text>
        </View>
        <SvgBirdBackground width={100} height={100} />
        <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{fontFamily: FONTS.medium, fontSize: 15, textAlign: 'center', marginHorizontal: 30}}>Gọi ngay đến số điện thoại của chúng tôi để được hỗ trợ !</Text>
        <TouchableOpacity activeOpacity={0.7} style={{flexDirection: 'row', alignItems: 'center', marginTop: 20, backgroundColor: COLORS.white, elevation: 3, padding: 20, borderRadius: 10}}>
        <Icon name="call-outline" size={30} color={COLORS.green}/>
        <Text style={{fontFamily: FONTS.bold, fontSize: 20, textAlign: 'center', color: COLORS.green}}>{"  "}0248-3843-9296</Text>
        </TouchableOpacity>
        </View>
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
