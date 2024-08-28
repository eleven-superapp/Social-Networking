import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  PanResponder,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { Send as SendIcon, Camera, Mic, Save, XCircle, Play, Pause } from 'lucide-react-native'; // Import Save, XCircle, Play, and Pause icons
import { GiftedChat } from 'react-native-gifted-chat';
import { launchImageLibrary } from 'react-native-image-picker'; // Import the image picker
import AudioRecorderPlayer from 'react-native-audio-recorder-player'; // Import Audio Recorder Player

const SpecificChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [longPressedMessage, setLongPressedMessage] = useState(null);
  const [modalPosition, setModalPosition] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [currentPlaying, setCurrentPlaying] = useState(null); // State to track current playing audio
  const inputRef = useRef(null);
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Yeah, It’s really good!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'User',
        },
      },
      {
        _id: 2,
        text: 'I’ve tried the app',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'User',
        },
      },
      {
        _id: 3,
        text: 'Thanks for telling',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
        },
      },
    ]);
  }, []);

  const onSend = useCallback(() => {
    if (editingMessage) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === editingMessage._id ? { ...msg, text: inputText } : msg
        )
      );
      setEditingMessage(null);
    } else {
      const newMessages = [];

      if (inputText.trim().length > 0) {
        const newTextMessage = {
          _id: messages.length + 1,
          text: inputText,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
          },
          replyTo: replyingTo,
        };
        newMessages.push(newTextMessage);
      }

      selectedImages.forEach((uri, index) => {
        const newImageMessage = {
          _id: messages.length + 1 + index + (newMessages.length > 0 ? 1 : 0),
          text: '',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
          },
          image: uri,
        };
        newMessages.push(newImageMessage);
      });

      if (newMessages.length > 0) {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages)
        );
      }

      setReplyingTo(null);
      setSelectedImages([]);
    }
    setInputText('');
  }, [inputText, messages, replyingTo, editingMessage, selectedImages]);

  const handleReplyGesture = (message) => {
    setReplyingTo(message);
    inputRef.current?.focus();
  };

  const handleLongPress = (message, event) => {
    const { pageX, pageY } = event.nativeEvent;
    setModalPosition({ x: pageX, y: pageY - 50 });
    setLongPressedMessage(message);
  };

  const handleEdit = () => {
    setInputText(longPressedMessage.text);
    setEditingMessage(longPressedMessage);
    setLongPressedMessage(null);
    inputRef.current?.focus();
  };

  const handleDelete = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== longPressedMessage._id)
    );
    setLongPressedMessage(null);
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setEditingMessage(null);
    setLongPressedMessage(null);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx > 30 && Math.abs(gestureState.dy) < 20;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 30) {
        // Handle the message being replied to
      }
    },
  });

  const renderMessageItem = ({ item }) => (
    <View>
      {item.replyTo && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>Reply to: {item.replyTo.text}</Text>
        </View>
      )}
      <TouchableWithoutFeedback
        onLongPress={(e) => handleLongPress(item, e)}
        onPress={() => cancelReply()}
      >
        <View
          style={item.user._id === 1 ? styles.rightBubble : styles.leftBubble}
          {...panResponder.panHandlers}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => handleReplyGesture(item)}
        >
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.messageImage} resizeMode="cover" />
          ) : item.audio ? (
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => playAudio(item._id, item.audio)}
            >
              {currentPlaying === item._id ? (
                <Pause size={24} color="#ffffff" />
              ) : (
                <Play size={24} color="#ffffff" />
              )}
              <Text style={styles.audioText}>{currentPlaying === item._id ? 'Playing...' : 'Play Audio'}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={item.user._id === 1 ? styles.rightText : styles.leftText}>
              {item.text}
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  // Function to play audio
  const playAudio = async (id, uri) => {
    try {
      if (currentPlaying === id) {
        // If the audio is already playing, stop it
        await audioRecorderPlayer.stopPlayer();
        setCurrentPlaying(null);
      } else {
        // Stop any currently playing audio
        if (currentPlaying) {
          await audioRecorderPlayer.stopPlayer();
        }
        setCurrentPlaying(id);
        await audioRecorderPlayer.startPlayer(uri);
        audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            setCurrentPlaying(null);
          }
          return;
        });
      }
    } catch (err) {
      console.error('Failed to play audio:', err);
      setCurrentPlaying(null);
    }
  };

  // Function to open the image picker
  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1024,
        maxHeight: 1024,
        quality: 0.8,
        selectionLimit: 0,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else if (response.assets) {
          const uris = response.assets.map((asset) => asset.uri);
          setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...uris]);
        }
      }
    );
  };

  // Function to handle removing an image from the selected images
  const removeImage = (uri) => {
    setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((imageUri) => imageUri !== uri));
  };

  // Function to check and request permissions
  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        return (
          granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Function to handle voice recording
  const handleVoiceRecording = async () => {
    const hasPermission = await checkPermission();
    if (!hasPermission) {
      Alert.alert('Permissions Required', 'You need to grant audio recording permissions to use this feature.');
      return;
    }

    if (isRecording) {
      try {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false);

        const newVoiceMessage = {
          _id: messages.length + 1,
          text: '',
          audio: result,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [newVoiceMessage])
        );
      } catch (err) {
        console.error('Failed to stop recording:', err);
      }
    } else {
      try {
        setIsRecording(true);
        await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
          console.log('Recording...', e);
        });
      } catch (err) {
        console.error('Failed to start recording:', err);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={cancelReply}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderMessageItem}
          style={styles.messageList}
          keyboardShouldPersistTaps="always"
        />

        {replyingTo && (
          <View style={styles.replyingToContainer}>
            <Text style={styles.replyingToText}>Replying to: {replyingTo.text}</Text>
          </View>
        )}

        {selectedImages.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ backgroundColor: '#1F1E1E', paddingVertical: 10, paddingHorizontal: 10, maxHeight: 120 }}
          >
            {selectedImages.map((uri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri }} style={styles.selectedImage} />
                <TouchableOpacity onPress={() => removeImage(uri)} style={styles.deleteIcon}>
                  <XCircle size={24} color="#FF0000" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#A5A5A5"
            />
            <TouchableOpacity onPress={onSend} style={styles.sendButton}>
              {editingMessage ? (
                <Save size={24} color="#3066BE" />
              ) : (
                <SendIcon size={24} color="#3066BE" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity onPress={openImagePicker} style={styles.iconButton}>
              <Camera size={24} color="#3066BE" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleVoiceRecording} style={styles.iconButtonWithMargin}>
              <Mic size={24} color={isRecording ? "#FF0000" : "#3066BE"} />
            </TouchableOpacity>
          </View>
        </View>

        {longPressedMessage && (
          <View
            style={[
              styles.contextMenu,
              {
                left: modalPosition.x > 200 ? modalPosition.x - 60 : 10,
                top: modalPosition.x > 200 ? modalPosition.y - 20 : modalPosition.y - 5,
              },
            ]}
          >
            {longPressedMessage.user._id === 1 && (
              <TouchableOpacity onPress={handleEdit} style={styles.menuOption}>
                <Text style={styles.menuOptionText}>Edit</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleDelete} style={styles.menuOption}>
              <Text style={styles.menuOptionText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  messageList: {
    padding: 10,
  },
  rightBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#216BC5',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  leftBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#D9DADB',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
  },
  rightText: {
    color: '#fff',
  },
  leftText: {
    color: '#000',
  },
  inputSection: {
    flexDirection: 'row',
    backgroundColor: '#1F1E1E',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00000066',
    borderRadius: 30,
    paddingHorizontal: 10,
    flex: 1,
    height: 50,
  },
  textInput: {
    flex: 1,
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  iconButton: {
    backgroundColor: '#00000066',
    padding: 8,
    borderRadius: 20,
  },
  iconButtonWithMargin: {
    backgroundColor: '#00000066',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  replyingToContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#2E2E2E',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 5,
  },
  replyingToText: {
    color: '#A5A5A5',
    fontStyle: 'italic',
  },
  replyContainer: {
    borderRadius: 10,
    padding: 5,
    marginBottom: 5,
    alignSelf: 'flex-end',
    borderColor: '#FFF7F7',
    borderWidth: 1,
  },
  replyText: {
    color: '#555',
    fontStyle: 'italic',
  },
  contextMenu: {
    position: 'absolute',
    backgroundColor: '#1F1E1E',
    borderRadius: 5,
    padding: 10,
    elevation: 5,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuOptionText: {
    color: '#3066BE',
    fontSize: 16,
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 5,
  },
  audioText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
  },
});

export default SpecificChat;
