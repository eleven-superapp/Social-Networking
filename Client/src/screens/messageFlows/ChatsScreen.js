import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { Trash2, Pin, Check } from 'lucide-react-native'; // Importing necessary icons from lucide-react-native

const imgUrl = "https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__";

const initialChats = [
  { id: '1', name: 'Isabella', message: 'Typing...', day: 'Today', avatar: imgUrl, time: '4:50 AM' },
  { id: '2', name: 'Daisy', message: 'Arfaat ipsum dolor sit amet sbjalsa kanaska kajskasa kjdkajnakskanskan kanskanska ndkas kasjaks...', time: '4:00 PM', avatar: imgUrl, day: 'Yesterday' },
  // Add more chat items as needed
];

const ChatsScreen = () => {
  const [chats, setChats] = useState(initialChats);
  const [selectedChats, setSelectedChats] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (deleteMode) {
        setDeleteMode(false);
        setSelectedChats([]);
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [deleteMode]);

  const handleLongPress = (chatId) => {
    if (!deleteMode) {
      setDeleteMode(true);
      toggleSelectChat(chatId);
    }
  };

  const handlePressOutside = () => {
    if (deleteMode) {
      setDeleteMode(false);
      setSelectedChats([]);
    }
  };

  const toggleSelectChat = (chatId) => {
    if (selectedChats.includes(chatId)) {
      setSelectedChats(selectedChats.filter(id => id !== chatId));
    } else {
      setSelectedChats([...selectedChats, chatId]);
    }
  };

  const deleteChat = () => {
    if (selectAll) {
      Alert.alert(
        'Delete All Chats',
        'Are you sure you want to delete all chats?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete', onPress: () => {
              setChats([]);
              setDeleteMode(false);
              setSelectAll(false);
              setSelectedChats([]);
            }
          },
        ],
        { cancelable: true }
      );
    } else {
      const updatedChats = chats.filter(chat => !selectedChats.includes(chat.id));
      setChats(updatedChats);
      setDeleteMode(false);
      setSelectedChats([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedChats([]);
    } else {
      setSelectAll(true);
      setSelectedChats(chats.map(chat => chat.id));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePressOutside}>
      <View style={styles.container}>
        {deleteMode && (
          <View style={styles.topBar}>
            <TouchableOpacity onPress={toggleSelectAll} style={styles.radioButton}>
              <View style={styles.radioOuter}>
                {selectAll && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>All</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }} >
              <TouchableOpacity onPress={() => { }} style={styles.pinButton}>
                <Pin color="#F51F46" size={24} />
              </TouchableOpacity>

              <TouchableOpacity onPress={deleteChat} style={styles.deleteButton}>
                <Trash2 color="#F51F46" size={24} />
              </TouchableOpacity>
            </View>

          </View>
        )}
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onLongPress={() => handleLongPress(item.id)}
              onPress={() => toggleSelectChat(item.id)}
            >
              <View style={[
                styles.chatItem,
                selectedChats.includes(item.id) && styles.selectedChatItem // Conditionally applying the selected style
              ]}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  {selectedChats.includes(item.id) && (
                    <View style={styles.tickIcon}>
                      <Check color="#FFF" size={15} />
                    </View>
                  )}
                </View>
                <View style={styles.chatInfo}>
                  <Text style={[
                    styles.name,
                    selectedChats.includes(item.id) && { color: 'white' }
                  ]}
                  >{item.name}</Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={[
                      styles.message,
                      selectedChats.includes(item.id) && { color: 'white' }
                    ]}
                  >{item.message}</Text>
                </View>
                <View style={styles.timeContainer}>
                  <Text style={[styles.day, selectedChats.includes(item.id) && { color: 'white' }]}>{item.day}</Text>
                  <Text style={[styles.time, selectedChats.includes(item.id) && { color: 'white' }]}>{item.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom:10
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  radioText: {
    color: '#fff',
  },
  deleteButton: {
    padding: 10,
  },
  pinButton: {
    padding: 10,
    transform: [{ rotate: '45deg' }], // Tilting the Pin icon 45 degrees
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B2121',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    position: 'relative',
  },
  selectedChatItem: {
    backgroundColor: '#6D5454', // Background color for selected chat
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tickIcon: {
    position: 'absolute',
    top: -5,
    left: -8,
    backgroundColor: '#B81735',
    borderRadius: 10,
    padding: 2,
  },
  chatInfo: {
    flex: 1,
  },
  name: {
    color: '#BEBEBE',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#888',
    fontSize: 14,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  day: {
    color: '#888',
    fontSize: 12,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
});

export default ChatsScreen;
