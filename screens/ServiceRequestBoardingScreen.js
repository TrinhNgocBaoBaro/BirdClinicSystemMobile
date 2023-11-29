import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import Header from "../components/Header";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Icon from "react-native-vector-icons/Ionicons";
import { ButtonFloatBottom } from '../components/Button';
import { UIActivityIndicator } from "react-native-indicators";
import createAxios from "../utils/axios";
const API = createAxios();
import DatePicker, {
    getToday,
  } from "react-native-modern-datepicker";

import moment from "moment";

const dataServicePackage = [
    {
        id: "1",
        name: "Cắt mài mỏ (Gói 3)",
    },
    {
        id: "2",
        name: "Cắt tỉa cánh (Gói 3)",
    },
    {
        id: "3",
        name: "Cắt mài móng, vuốt (Gói 3)",
    },
]

const ServiceRequestBoardingScreen = ({navigation, route}) => {
    const birdId = route.params.bird_id
    const bookingId = route.params.booking_id
    const [serviceRequest, setServiceRequest] = React.useState([]);
    const [dataBird, setDataBird] = React.useState();
    const [dataServicePackage, setDataServicePackage] = React.useState([]);

    const fetchDataBird = async () => {
        try {
          const response = await API.get(`/bird/${birdId}`);
          if (response.data) {
            // console.log("data bird: ",response.data);
            setDataBird(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };

    const fetchDataServicePackage = async () => {
        try {
          const response = await API.get(`/servicePackage/?size_id=${dataBird.bird_breed.bird_size.bird_size_id}&service_type_id=ST002`);
          if (response.data) {
            // console.log("service package bird: ", response.data);
            setDataServicePackage(response.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      console.log(moment(getToday(), "YYYY/MM/DD").format("YYYY-MM-DD"))
    const createServiceForm = async () => {
        const today = moment(getToday(), "YYYY/MM/DD").format("YYYY-MM-DD");
        const totalPrice = serviceRequest.reduce((total, service) => {
            // Chuyển đổi giá thành số và cộng vào tổng
            return total + parseFloat(service.price);
        }, 0);
        try {
          const response = await API.post(`/service_Form`, 
            {
                bird_id: birdId,
                booking_id: bookingId,
                status: "pending",
                date: today,
                total_price: totalPrice,
                num_ser_must_do: serviceRequest.length,
                num_ser_has_done: 0,
                arr_service_pack: serviceRequest.map((item, index)=>{
                    return {note: item.package_name, service_package_id: item.service_package_id}
                })
                
            }
          
          );
          if (response.status === 200) {
            console.log(response);
            setServiceRequest([])
            Alert.alert(
                "Thông báo",
                `Yêu cầu dịch vụ thành công!`
              );
          }
        } catch (error) {
          console.log(error);
          Alert.alert(
            "Thông báo",
            `Yêu cầu dịch vụ thất bại, vui lòng thử lại!`
          );
        }
      };

    const handleSetServiceRequest = (item) => {
        if (serviceRequest.includes(item)) {
            // Item đã có, remove nó đi
            setServiceRequest(serviceRequest.filter((itemService) => itemService !== item));
          } else {
            // Item chưa có, add nó vào
            setServiceRequest([...serviceRequest, item]);
          }   
    }

    // const handleSetServiceRequest = (item) => {
    //     const updatedServiceRequest = serviceRequest.filter(service => service.service_package_id !== item.service_package_id);
    //     if (updatedServiceRequest.length === serviceRequest.length) {
    //       // Không tìm thấy phần tử, thêm vào mảng
    //       setServiceRequest([...serviceRequest, item]);
    //     } else {
    //       // Phần tử đã có trong mảng, cập nhật mảng mới sau khi loại bỏ
    //       setServiceRequest(updatedServiceRequest);
    //     }
    //     console.log("updatedServiceRequest: ", updatedServiceRequest)

    //   }

    React.useEffect(()=>{
        console.log("Mảng service: ", serviceRequest)
    },[serviceRequest])

    React.useEffect(()=>{
        if(birdId) fetchDataBird();
    },[birdId])

    React.useEffect(()=>{
        if(dataBird) fetchDataServicePackage();
    },[dataBird])

    function formatCurrency(amount) {
        return parseFloat(amount).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        });
      }

  return (
    <>
    <Header
        title={"Yêu cầu dịch vụ"}
        onPress={() => navigation.goBack()}
        rightIcon="ellipsis-vertical"
        // onPressRight={() => setLoad(!load)}
      />
      <ScrollView style={{flex:1, backgroundColor: COLORS.white, marginBottom: 80 }} contentContainerStyle={{justifyContent: 'center'}}>
        {dataBird ? 
         <>
         <View style={{alignItems: 'center', marginVertical: 20}}>
               <View style={{width: 115, height: 115, elevation: 3,  justifyContent: 'center', alignItems: 'center', borderRadius: 100,backgroundColor: COLORS.white, marginBottom: 15}}>
               <Image source={{uri: dataBird.image || "https://png.pngtree.com/thumb_back/fw800/background/20230524/pngtree-two-brightly-colored-birds-sitting-on-a-branch-image_2670376.jpg"}}
               style={{width: 100, height: 100, borderRadius: 100}}
               />
               </View>
               <View style={{paddingVertical: 10, paddingHorizontal: 25, backgroundColor: COLORS.white, elevation: 3, borderRadius: 10}}> 
                 <Text style={{fontFamily: FONTS.semiBold, fontSize: 15}}>{dataBird.name}</Text>
               </View>
         </View>
         <View style={{height: 100, padding: 10, marginHorizontal: 30, backgroundColor: COLORS.white, elevation: 3, borderRadius: 10, flexDirection: 'row', marginBottom: 20}}>
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: COLORS.darkGrey}}>
                 <Text style={{fontFamily: FONTS.medium, color: COLORS.grey, marginBottom: 5}}>Giống</Text>
                 <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, textAlign: 'center'}}>{dataBird.bird_breed.breed}</Text>
             </View>
             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                 <Text style={{fontFamily: FONTS.medium, color: COLORS.grey,  marginBottom: 5}}>Kích thước</Text>
                 <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, textAlign: 'center'}}>{dataBird.bird_breed.bird_size.size}</Text>
             </View>
         </View>
         </> : 
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
       
        <View style={{marginHorizontal: 30, marginBottom: 20}}>
            <View style={{marginBottom: 15, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <Icon
                name="information-circle-outline"
                size={20}
                color={COLORS.green}
              />
              <Text style={{fontFamily: FONTS.medium}}>{" "}Dịch vụ sẽ dựa trên giống và kích thước.</Text>
            </View>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Icon
                name="layers"
                size={20}
                color={COLORS.green}
              />
            <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, fontSize: 15}}>
                {"  "}Lựa chọn các dịch vụ sau đây: 
            </Text>
            </View>

            {dataServicePackage.map((item, index)=>(
                
                <TouchableOpacity
                activeOpacity={0.5}
                onPress={()=>
                    {
                    handleSetServiceRequest(item);
                    }
                }
                style={{
                    marginTop: 20,
                    borderWidth: 1, 
                    borderColor: serviceRequest.some(service => service.service_package_id === item.service_package_id) ? COLORS.green : COLORS.lightGrey,borderColor: serviceRequest.some(service => service.service_package_id === item.service_package_id) ? COLORS.green : COLORS.lightGrey,
                    borderRadius: 10, 
                    padding: 20, 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    elevation: 3,
                    backgroundColor: COLORS.white,
                    alignItems: 'center'
                }}  key={item.service_package_id}>
                    <Text style={{fontFamily: FONTS.semiBold, color: COLORS.black, fontSize: 15, width: "65%"}} >{item.package_name}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontFamily: FONTS.medium, color: COLORS.black}}>{formatCurrency(item.price)}{"   "}</Text>
                    {serviceRequest.some(service => service.service_package_id === item.service_package_id) &&
                        <Icon
                        name="checkmark-circle"
                        size={20}
                        color={COLORS.green}
                        />
                    }
                    </View>

                </TouchableOpacity>
              
            ))}

        </View>

      </ScrollView>
      <ButtonFloatBottom buttonColor={serviceRequest.length !== 0 ? COLORS.green : COLORS.grey} title="Xác nhận" 
      onPress={()=>{
        if(serviceRequest.length !== 0){
            createServiceForm();
        }else {
            Alert.alert(
                "Thông báo",
                `Vui lòng chọn dịch dụ trước!`
            );
        }
      }}/>

    </>
  )
}

export default ServiceRequestBoardingScreen

const styles = StyleSheet.create({})