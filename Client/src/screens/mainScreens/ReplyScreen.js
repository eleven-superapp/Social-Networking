import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Linking, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { ArrowLeft, X, VideoIcon } from 'lucide-react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { BlurView } from '@react-native-community/blur';
import axios from 'axios';
import Video from 'react-native-video';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP, IMGUR_CLIENT_ID } from '../../../constants/constants';
import { UserContext } from '../../../context/userContextAPI';


const ReplyScreen = ({ route, navigation }) => {
  const { comment, setComments } = route.params; 
  console.log("Comment parent in reply screen is:", comment);
  console.log("forum parent id in reply screen is:", comment.forum);
  const richText = useRef(null); // Reference to the RichEditor

  const [reply, setReply] = useState('');
  const [media, setMedia] = useState([]);
  const [loadingStates, setLoadingStates] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');
  const [linkPlaceholder, setLinkPlaceholder] = useState('');
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);

  const { user } = useContext(UserContext);


  const handleAddLink = () => {
    setInputType('link');
    setModalVisible(true);
  };

  useEffect(() => {
    console.log("Media: ", media);
  }, [media]);

  const handleAddImage = () => handleAddMedia('photo');
  const handleAddVideo = () => handleAddMedia('video');

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
        const selectedMedia = response.assets[0];
        uploadMedia(selectedMedia);
      }
    });
  };

  const handleSubmitReply = async () => {
    setReplyLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
        throw new Error('No token found');
      }
      
      const requestData = {
        content: reply,
        author: user._id, 
        postId: comment.post, 
        forumId: comment.forum,
        media: media,
        parentCommentId: comment._id
      };

      console.log("Reuqquest data for new post:", requestData);

      console.log("Sending request ....");

      const response = await axios.put(`http://${IP}:5000/api/social/v1/reply/`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReplyLoading(false);
      setComments(response.data.post.comments);

      setReply('');
      setMedia('');
      navigation.goBack();

      // Optionally, fetch updated post data to ensure sync
      await fetchPostData();
    } catch (error) {
      console.log("Error while posting reply:", error);
      setReplyLoading(false);
    } finally {
      setReplyLoading(false);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://${IP}:5000/api/social/v1/posts/${post._id}`);
      setComments(response.data.post.comments);
    } catch (error) {
      console.log("Error fetching updated post data:", error);
    }
  };

  const uploadMedia = async (selectedMedia) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedMedia.uri,
        type: selectedMedia.type,
        name: selectedMedia.fileName || 'media',
      });

      // Example using Imgur API for image hosting
      const response = await axios.post('https://api.imgur.com/3/upload', formData, {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,  // Replace with your actual Imgur Client ID
          'Content-Type': 'multipart/form-data',
        },
      });

      const mediaUrl = response.data.data.link;
      setMedia(prevMedia => [...prevMedia, { type: selectedMedia.type, url: mediaUrl }]);
      setLoadingStates(prevStates => [...prevStates, true]); // Add loading state for the new media
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert('Upload Error', 'Failed to upload media. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = () => {
    if (inputType === 'link' && inputValue && linkPlaceholder) {
      const formattedLink = `<a href="${inputValue}">${linkPlaceholder}</a>`;
      richText.current?.insertHTML(formattedLink); // Insert the link into the editor
    }
    setModalVisible(false);
    setInputValue('');
    setLinkPlaceholder('');
  };

  const handleTextPress = (url) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  const handleLoadStart = (index) => {
    setLoadingStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleLoadEnd = (index) => {
    setLoadingStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
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
              <Image source={{ uri: comment.author.profilePicture }} style={styles.commentAvatar} />
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

          {/* Media Preview */}
          {media.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaPreviewContainer}>
              {media.map((item, index) => (
                <View key={index} style={styles.mediaItem}>
                  {loadingStates[index] && (
                    <View style={styles.placeholder}>
                      <ActivityIndicator size="large" color="#F51F46" />
                    </View>
                  )}
                  {item.type.includes('image') && (
                    <Image
                      source={{ uri: item.url }}
                      style={styles.mediaImage}
                      onLoadStart={() => handleLoadStart(index)}
                      onLoadEnd={() => handleLoadEnd(index)}
                    />
                  )}
                  {item.type.includes('video') && (
                    <Video
                      source={{ uri: item.url }}
                      style={styles.mediaVideo}
                      useNativeControls={true}
                      resizeMode="cover"
                      paused={false}  // To ensure video does not autoplay
                      onLoadStart={() => handleLoadStart(index)}
                      onLoad={() => handleLoadEnd(index)}
                      repeat={true}
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          {/* Rich Editor for Reply */}
          <RichEditor
            ref={richText}
            style={styles.richEditor}
            placeholder="Type your Reply"
            initialContentHTML={reply}
            onChange={text => setReply(text)}
            editorInitializedCallback={() => richText.current?.focusContentEditor()} // Focus on mount
            editorStyle={{
              backgroundColor: '#000',
              color: '#fff',
            }}
          />

          <RichToolbar
            editor={richText}
            actions={[
              actions.insertLink,
              actions.insertImage,
              actions.insertBulletsList,
              actions.insertVideo,
              // 'insertVideo'
            ]}
            // iconMap={{
            //   insertVideo: VideoIcon,
            // }}
            disabledButtonStyle
            iconSize={24}
            iconTint="#ffff"
            selectedIconTint="#F51F46"
            onPressAddLink={() => handleAddLink()}
            insertVideo={() => handleAddVideo()}
            style={{
              marginBottom: 20,
              backgroundColor: '#222222',
              paddingVertical: 10,
              borderRadius: 10,
              marginHorizontal: 30,
            }}
            onPressAddImage={handleAddImage}
            onPressAddVideo={handleAddVideo}
          />

          {/* Post Button */}
          {loading ? (
            <View style={[styles.loadingContainer,styles.postButton]}>
              <ActivityIndicator size="large" color="#FFF" />
              <Text style={styles.loadingText}>Uploading media...</Text>
            </View>
          ): (<TouchableOpacity style={styles.postButton} onPress={handleSubmitReply}>
            { replyLoading ? 
            <View style={[styles.loadingContainer,styles.postButton]}>
              <ActivityIndicator size="large" color="#FFF" />
              <Text style={styles.loadingText}>Posting Reply...</Text>
            </View>
            : 
            <Text style={styles.postButtonText}>Post</Text>
          }
          </TouchableOpacity>)}
          

          {/* Modal for Input */}
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <BlurView style={StyleSheet.absoluteFill} blurType="dark" blurAmount={10} reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.2)" />
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <X color="#fff" size={24} />
                </TouchableOpacity>

                <TextInput style={styles.modalInput} placeholder="Enter the URL" placeholderTextColor="#aaa" value={inputValue} onChangeText={text => setInputValue(text)} />
                <TextInput style={styles.modalInput} placeholder="Enter the placeholder text" placeholderTextColor="#aaa" value={linkPlaceholder} onChangeText={text => setLinkPlaceholder(text)} />

                <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
                  <Text style={styles.modalButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 15,
    paddingBottom: '10%',
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
  richEditor: {
    minHeight: '30%',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#F51F46',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    color: '#fff',
    paddingHorizontal: 10,
    width: '100%',
    borderRadius: 8,
  },
  modalButton: {
    backgroundColor: '#F51F50aa',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F51F46',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mediaPreviewContainer: {
    flexDirection: 'row',
    marginTop: 10,
    minHeight: '30%',
  },
  mediaItem: {
    marginRight: 10,
    position: 'relative',
  },
  mediaImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  mediaVideo: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  placeholder: {
    position: 'absolute',
    width: 200,  // Adjusted to match media size
    height: 200, // Adjusted to match media size
    backgroundColor: '#333', // Dark gray background color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    zIndex: 1,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '5%'
  }
});

export default ReplyScreen;
