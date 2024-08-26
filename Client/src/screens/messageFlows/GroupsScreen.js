import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Search, MoreHorizontal,MessageSquareMore, Plus } from 'lucide-react-native'; // Assuming you are using lucide-react-native for icons

const imgUrl = 'https://s3-alpha-sig.figma.com/img/b228/6358/911220bbed3dc45b0c379d9c3472f6f8?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LSNrLTzB9hcMmpd8qSkoxPwsrq0Z~VmWSb-f6mddqqPhDEHB15itBaAY-qCbn9N0ZmNeJRaLN2jg-ZEHqcoawai8cR1Ds1FKdvkjEHO382hoqQy2jPeqcVfBfTTLjarya-a7F-mLl6Zv-vZOOshNEPypAdC9TVTuFmBBFs3CpKadzjhx9dzlrRRfdlaKn7745mxKDaHiteAXdZB7iCLny8UR5MZPbUjhSeENlzvGNp7YjRGKvQY-gmpGD6qyYtdS7O4QxIwCtjr0fnN2WSQFA~OcgJKqwYChaNT52bd7cuD-9ZYzpIDLS8IYe6Ny7cnL0qhFBNYaTrxETWNiSZQErw__';

const iconUrl = 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__';

const groupsData = [
  {
    id: '1',
    title: 'Selenophiles',
    location: 'E 11, Islamabad',
    description: 'Where Moonlit Nights and the Magic of Stories Unite to Spark Imagination and Dreams',
    image: imgUrl,
    public: true,
    members: 12340,
    joined: false,
    category: 'Discussions',
  },
  {
    id: '2',
    title: 'Selenophiles',
    location: 'E 11, Islamabad',
    description: 'Where Moonlit Nights and the Magic of Stories Unite to Spark Imagination and Dreams',
    image: imgUrl,
    public: true,
    members: 12340,
    joined: true,
    category: 'Discussions',
  },
  {
    id: '3',
    title: 'Selenophiles',
    location: 'E 11, Islamabad',
    description: 'Where Moonlit Nights and the Magic of Stories Unite to Spark Imagination and Dreams',
    image: imgUrl,
    public: true,
    members: 12340,
    joined: false,
    category: 'Discussions',
  },
  // Add more groups as needed
];

const categories = ["Arts & Crafts", "Sports & Fitness", "Music", "Arts & Crafts", "Sports & Fitness", "Music"]

const GroupsScreen = () => {

  const [selectedCategory, setSelectedCategory] = useState(0);

  function getStyles(index){
    let btnStyle = {backgroundColor:'#494949',borderColor:'#494949'};
    if(selectedCategory==index){
     btnStyle = {backgroundColor:'#C41938',borderColor:'#CECECE'}
    }
    return btnStyle
  }

  // function for dynamic rendering of join button. 
  function handleJoin(index){
    const joinStatus = groupsData[index].joined;
    groupsData[index].joined = !joinStatus;
  }

  const renderGroupCard = ({ item,index }) => (
    <View style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{item.title}</Text>

        <View style={{flexDirection:'row',alignItems:'center'}} >

          <View style={{flexDirection:'row',paddingHorizontal:10,alignItems:'center',backgroundColor:'#400E17',paddingVertical:6,borderRadius:18,marginRight:10}} >
            <MessageSquareMore color={'#EFBEBE'} size={18} />
            <Text style={{color:'#EFBEBE',marginLeft:4}} >{item.category}</Text>
          </View>

          <TouchableOpacity>
            <MoreHorizontal color="#868686" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.groupLocation}>{item.location}</Text>
      <Text style={styles.groupDescription}>{item.description}</Text>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.groupFooter}>
        <View style={styles.membersContainer}>
          <Image source={{ uri: iconUrl }} style={styles.memberIcon} />
          <Image source={{ uri: iconUrl }} style={styles.memberIcon} />
          <Image source={{ uri: iconUrl }} style={styles.memberIcon} />
          <TouchableOpacity style={styles.addMemberButton}>
            <Plus color={'#FFFFFF97'} size={20} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        onPress={()=>{handleJoin(index)}}
        style={item.joined ? styles.joinedButton : styles.joinButton}>
          <Text style={styles.joinButtonText}>{item.joined ? 'Joined' : 'Join Group'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.groupStats}>{item.public ? 'Public Group' : 'Private Group'} • {item.members} people</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {
          categories.map((category, index) => {
            const btnStyle = getStyles(index);
            return <TouchableOpacity
            onPress={()=>setSelectedCategory(index)}
            key={index} style={[styles.categoryButton,btnStyle]}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          })
        }
        {/* Add more categories as needed */}
      </ScrollView>
      <FlatList
        data={groupsData}
        keyExtractor={(item) => item.id}
        renderItem={renderGroupCard}
        contentContainerStyle={styles.groupsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e2e2e',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f4511e',
  },
  tabText: {
    color: '#888',
    fontSize: 16,
  },
  activeTabText: {
    color: '#f4511e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    // flex:1
  },
  categoryButton: {
    backgroundColor: '#494949',
    borderRadius: 10,
    marginRight: 10,
    paddingHorizontal: 12,
    paddingVertical: 12, // Reduced from 15
  },
  activeCategoryButton: {
    backgroundColor: '#f4511e',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  categoryText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 20, // Added line height
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  groupsList: {
    paddingBottom: 20,
  },
  groupCard: {
    backgroundColor: '#3B2121',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupLocation: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 8,
    marginTop:-2
  },
  groupDescription: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 10,
  },
  groupImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  addMemberButton: {
    backgroundColor: '#555',
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'#FFFFFF87',
    borderWidth:1
  },
  addMemberText: {
    color: '#fff',
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: '#494949',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  joinedButton: {
    // backgroundColor: '#555',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor:'#494949',
    borderWidth:1
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  groupStats: {
    color: '#888',
    fontSize: 12,
    marginTop: 5,
  },
});

export default GroupsScreen;
