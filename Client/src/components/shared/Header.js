import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Menu, User } from 'lucide-react-native'; // Import icons from Lucide

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={{flexDirection:'row',alignItems:'center'}} >
        <TouchableOpacity>
          <Menu color="#858585" size={28} />
        </TouchableOpacity>
        <Text style={styles.title}>Chatterbox</Text>
      </View>
      <Image
        source={{ uri: 'https://avatar.iran.liara.run/public/37' }}
        style={styles.profileImage}
      />
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
