import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ArrowLeft, List, Link, Image as ImageIcon, Video } from 'lucide-react-native'; // Use icons from lucide-react-native

const ReplyScreen = ({ route, navigation }) => {
  const comment = route.params.comment; // Assuming the comment is passed via navigation params

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reply</Text>
        <Image source={{ uri: comment.userProfilePic }} style={styles.userAvatar} />
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <Image
          source={{ uri: comment.userProfilePic }}
          style={styles.commentAvatar}
        />
        <View style={styles.commentContent}>
          <Text style={styles.commentUsername}>Siber Koza</Text>
          <Text style={styles.commentText}>{comment}</Text>
        </View>
      </View>

      {/* Reply Input */}
      <TextInput
        style={styles.replyInput}
        placeholder="Type your Reply"
        placeholderTextColor="#aaa"
      />

      <View style={{ flex: 1, justifyContent: 'flex-end',marginBottom:20 }} >

        {/* Action Icons */}
        <View style={styles.actionsContainer}>
          <List color="#fff" size={24} />
          <Link color="#fff" size={24} />
          <ImageIcon color="#fff" size={24} />
          <Video color="#fff" size={24} />
        </View>

        {/* Post Button */}
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Match the dark theme
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
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderTopColor:'#494949',
    borderTopWidth:1
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor:'#222222',
    paddingVertical:13,
    borderRadius:10,
    marginHorizontal:30
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
});

export default ReplyScreen;
