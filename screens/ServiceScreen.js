import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import MainHeader from '../components/MainHeader';
import ItemService from '../components/ItemService';
const item = [

    {
        id: 'ST001',
        name: 'Khám sức khỏe',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Eopsaltria_australis_-_Mogo_Campground.jpg/640px-Eopsaltria_australis_-_Mogo_Campground.jpg',
        description: 'Khám sức khỏe phòng khám BirdClinic'
    },
    {
        id: 'ST003',
        name: 'Nội trú',
        image: 'https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg',
        description: 'Nội trú phòng khám BirdClinic'
    },
    {
        id: 'ST002',
        name: 'Spa chăm sóc',
        image: 'https://www.rspca.org.au/sites/default/files/blog-image/shutterstock_685368169.jpg',
        description: 'Spa chăm sóc phòng khám BirdClinic'
    },
    {
        id: '4',
        name: 'Khẩn cấp',
        image: 'https://t4.ftcdn.net/jpg/01/77/47/67/360_F_177476718_VWfYMWCzK32bfPI308wZljGHvAUYSJcn.jpg',
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


