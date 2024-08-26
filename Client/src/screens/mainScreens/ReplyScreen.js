import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from 'react-native';
import { ArrowLeft, List, Link, Image as ImageIcon, Video } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import from react-native-image-picker

const ReplyScreen = ({ route, navigation }) => {
  const comment = route.params.comment;

  const [reply, setReply] = useState('');
  const [media, setMedia] = useState([]); // State to hold media items
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');

  const handleAddList = () => {
    setInputType('list');
    setModalVisible(true);
  };

  const handleAddLink = () => {
    setInputType('link');
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    if (inputType === 'list' && inputValue) {
      setReply(prevReply => `${prevReply}\n- ${inputValue}`);
    } else if (inputType === 'link' && inputValue) {
      setReply(prevReply => `${prevReply} ${inputValue}`);
    }
    setModalVisible(false);
    setInputValue('');
  };

  const handleAddMedia = (type) => {
    const options = {
      mediaType: type,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setMedia(prevMedia => [...prevMedia, response.assets[0]]);
      }
    });
  };

  const handleAddImage = () => handleAddMedia('photo');
  const handleAddVideo = () => handleAddMedia('video');

  console.log("Comment in reply screen:", comment);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reply</Text>
        {comment.author && comment.author.profilePicture && (
          <Image source={{ uri: comment.author.profilePicture }} style={styles.userAvatar} />
        )}
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        {comment.author && comment.author.profilePicture && (
          <Image
            source={{ uri: comment.author.profilePicture }}
            style={styles.commentAvatar}
          />
        )}
        <View style={styles.commentContent}>
          {comment.author && comment.author.username && (
            <Text style={styles.commentUsername}>{comment.author.username}</Text>
          )}
          {comment.content && (
            <Text style={styles.commentText}>{comment.content}</Text>
          )}
        </View>
      </View>

      {/* Reply Input */}
      <TextInput
        style={styles.replyInput}
        placeholder="Type your Reply"
        placeholderTextColor="#aaa"
        value={reply}
        onChangeText={(text) => setReply(text)}
        multiline
      />

      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>

        {/* Action Icons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleAddList}>
            <List color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddLink}>
            <Link color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddImage}>
            <ImageIcon color="#fff" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddVideo}>
            <Video color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.modalInput}
            placeholder={inputType === 'list' ? "Enter a list item" : "Enter the URL"}
            placeholderTextColor="#aaa"
            value={inputValue}
            onChangeText={text => setInputValue(text)}
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
            <Text style={styles.modalButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#aaa',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    flex: 1,
  },
  userAvatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  commentSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    color: '#ccc',
  },
  replyInput: {
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderTopColor: '#494949',
    borderTopWidth: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#222222',
    paddingVertical: 13,
    borderRadius: 10,
    marginHorizontal: 30
  },
  postButton: {
    backgroundColor: '#F51F46',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    height: 40,
    borderColor: '#333',
    borderWidth: 1,
    marginBottom: 20,
    color: '#fff',
    paddingHorizontal: 10,
    width: '80%',
  },
  modalButton: {
    backgroundColor: '#F51F46',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReplyScreen;
