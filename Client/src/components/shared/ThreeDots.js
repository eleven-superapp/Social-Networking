import { View, Pressable } from 'react-native';

export default function ThreeDots() {
    return (
        <Pressable style={{ flexDirection: 'row', marginLeft:10}} >

            <View style={{ backgroundColor: '#868686', height: 5, width: 5, borderRadius: 20 }} />

            <View style={{ backgroundColor: '#868686', height: 5, width: 5, marginLeft: 2, borderRadius: 20 }} />



            <View style={{ backgroundColor: '#868686', height: 5, width: 5, marginLeft: 2, borderRadius: 20 }} />


        </Pressable>
    )
}