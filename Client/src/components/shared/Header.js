import React, {useContext} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native'; // Import icons from Lucide
import { UserContext } from '../../../context/userContextAPI';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  // console.log("USer:", user);
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection:'row',alignItems:'center'}} >
        <TouchableOpacity>
          <Menu color="#858585" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Chatterbox</Text>
      </View>
      {/* <Image
        source={{ uri: `${user?.profilePicture}` }}
        style={styles.profileImage}
        onError={(e) => console.log('Profile Image load error:', e.nativeEvent.error)} // Error handling
        onLoad={() => console.log('Profile Image loaded:', user.profilePicture)} // Log successful loads
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#000',
    borderBlockColor: '#4A4A4A4D',
    borderBottomWidth: 2
  },
  title: {
    color: '#858585',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:15
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});

export default Header;
