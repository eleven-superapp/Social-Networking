import { View, Pressable } from 'react-native';

export default function VerticalDots() {
    return (
        <Pressable style={{ flexDirection: 'column'}} >

            <View style={{ backgroundColor: '#868686', height: 5, width: 5, borderRadius: 20 }} />

            <View style={{ backgroundColor: '#868686', height: 5, width: 5, borderRadius: 20,marginTop:2 }} />



            <View style={{ backgroundColor: '#868686', height: 5, width: 5, borderRadius: 20, marginTop:2 }} />


        </Pressable>
    )
}