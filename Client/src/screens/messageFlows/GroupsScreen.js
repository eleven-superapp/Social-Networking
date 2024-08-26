import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Search, MoreHorizontal } from 'lucide-react-native'; // Assuming you are using lucide-react-native for icons

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
  },
  // Add more groups as needed
];

const categories = ["Arts & Crafts","Sports & Fitness","Music","Arts & Crafts","Sports & Fitness","Music"]

const GroupsScreen = () => {
  const renderGroupCard = ({ item }) => (
    <View style={styles.groupCard}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{item.title}</Text>
        <TouchableOpacity>
          <MoreHorizontal color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.groupLocation}>{item.location}</Text>
      <Text style={styles.groupDescription}>{item.description}</Text>
      <Image source={{ uri: item.image }} style={styles.groupImage} />
      <View style={styles.groupFooter}>
        <View style={styles.membersContainer}>
          <Image source={{uri:iconUrl}} style={styles.memberIcon} />
          <Image source={{uri:iconUrl}} style={styles.memberIcon} />
          <Image source={{uri:iconUrl}} style={styles.memberIcon} />
          <TouchableOpacity style={styles.addMemberButton}>
            <Text style={styles.addMemberText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={item.joined ? styles.joinedButton : styles.joinButton}>
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
          categories.map((category,index)=>{
            return <TouchableOpacity key={index} style={styles.categoryButton}>
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
  },
  categoryButton: {
    backgroundColor: '#494949',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#f4511e',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  categoryText: {
    color: '#fff',
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
    color: '#888',
    fontSize: 14,
    marginVertical: 5,
  },
  groupDescription: {
    color: '#fff',
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
  },
  addMemberText: {
    color: '#fff',
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: '#f4511e',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  joinedButton: {
    backgroundColor: '#555',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
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
