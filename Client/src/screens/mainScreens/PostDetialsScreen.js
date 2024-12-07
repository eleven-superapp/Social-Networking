import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {IP} from '../../../constants/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import Comment from './CommentScreen';

const PostDetailsScreen = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const route = useRoute();
  const {postId} = route.params;

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://${IP}:3000/api/social/v1/post/${postId}`,
        );
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `http://${IP}:3000/api/social/v1/comment`,
        {
          content: newComment,
          author: post.author._id, // Use the logged-in user's ID
          postId,
          forumId: post.forum._id,
        },
      );
      setComments([...comments, response.data.comment]); // Update comments list
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {post && (
        <>
          {/* Post Details */}
          <View style={styles.postContainer}>
            <Image
              source={{uri: post.author.profilePicture}}
              style={styles.profilePic}
            />
            <View style={styles.postDetails}>
              <Text style={styles.userName}>{post.author.username}</Text>
              <Text style={styles.postTime}>
                {new Date(post.createdAt).toLocaleString()}
              </Text>
              <Text style={styles.postContent}>{post.content}</Text>
            </View>
          </View>

          {/* Comments Section */}
          <FlatList
            data={comments}
            renderItem={({item}) => <Comment comment={item} />}
            keyExtractor={item => item._id}
            style={styles.commentsList}
          />

          {/* Input Box */}
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              value={newComment}
              onChangeText={setNewComment}
              placeholder="Write a comment..."
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              onPress={handleAddComment}
              style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postDetails: {
    flex: 1,
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTime: {
    color: '#aaa',
    fontSize: 12,
    marginVertical: 5,
  },
  postContent: {
    color: '#fff',
    fontSize: 14,
  },
  commentsList: {
    flex: 1,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#f51f46',
    borderRadius: 8,
    padding: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostDetailsScreen;
