import {View,Text,StyleSheet} from 'react-native';
export default Profile = ()=>{
    return(
        <View style={styles.container} >
            
            <Text style={{color:'white',fontSize:22,textAlign:'center',marginVertical:10}} >Profile Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    }
})