import {View,Text,StyleSheet} from 'react-native';

export default Updates = ()=>{
    return(
        <View style={styles.container} >
            <Text style={{color:'white',fontSize:22,textAlign:'center',marginVertical:10}}>Updates Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    }
})