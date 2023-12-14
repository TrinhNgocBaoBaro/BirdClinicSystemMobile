import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import MainHeader from '../components/MainHeader';
import ItemService from '../components/ItemService';
const item = [

    {
        id: 'ST001',
        name: 'Khám sức khoẻ',
        image: 'https://img.freepik.com/free-vector/veterinarian-specialist-works-scene-woman-doctor-stethoscope-examines-parrot-vet-clinic-animal-care-pet-medical-treatment_575670-515.jpg?w=1380&t=st=1701192237~exp=1701192837~hmac=62af0e07fa297af90199eaa954dbbee2fd1bd196a96dcc5ca8c5ef8ca27708e6',
        description: 'Khám sức khỏe phòng khám BirdClinic'
    },
    {
        id: 'ST003',
        name: 'Nội trú khách sạn',
        image: 'https://img.freepik.com/free-vector/cute-parrot-cage-white_1308-36630.jpg?w=740&t=st=1701192985~exp=1701193585~hmac=f204f93a5c630dc49b1da943b0d028862128e5fef192828f4236890b8f2cb620',
        description: 'Nội trú phòng khám BirdClinic'
    },
    {
        id: 'ST002',
        name: 'Spa làm đẹp',
        image: 'https://img.freepik.com/free-vector/cute-parrot-bird-branch-cartoon-animal-wildlife-icon-concept-isolated-flat-cartoon-style_138676-2176.jpg?w=826&t=st=1701193563~exp=1701194163~hmac=5976cd652f7c8ad86cd64a8d741e6ff909e9244b3f8bdadda6d594143f472f15',
        description: 'Spa chăm sóc phòng khám BirdClinic'
    },
    {
        id: '4',
        name: 'Khẩn cấp',
        image: 'https://img.freepik.com/free-vector/hand-drawn-cartoon-seagull-illustration_23-2150553578.jpg?w=826&t=st=1701193759~exp=1701194359~hmac=6d9f07b90560218cc227dda6d762f8d68b6b29b3a96d1cca5a4fa200fd67ff14',
        description: 'Gọi khẩn cấp phòng khám BirdClinic'
    }
]



export default function ServiceScreen({navigation}) {
    return (
        <>
            <MainHeader iconHeader={"layers-outline"} navigation={navigation}/>
            <StatusBar style="auto" />
            <View style={styles.container}>
                {item.map((item, index)=>
                    (
                        <ItemService key={index} item={item} navigation={navigation}/>
                    )
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});


