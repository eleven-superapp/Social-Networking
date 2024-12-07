import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {IP} from '../../../constants/constants';
import {useNavigation} from '@react-navigation/native';

const ForumDetailsScreen = ({route}) => {
  const {forumId, forum} = route.params; // Get the forumId and forum details from the route params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchForumPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://${IP}:3000/api/social/v1/post/${forumId}/posts`,
          {params: {postsLimit: 10, page: 1}}, // Pagination parameters
        );
        setPosts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };

    fetchForumPosts();
  }, [forumId]);

  const renderPost = ({item}) => (
    <View style={styles.postCard}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PostDetails', {postId: item._id, post: item})
        }>
        <Text style={styles.viewPostText}>View Post</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.forumTitle}>{forum.title}</Text>
      <Text style={styles.forumDescription}>{forum.description}</Text>

      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => navigation.navigate('AddPost', {forumId})}>
        <Text style={styles.addPostButtonText}>Add Post</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text style={styles.noPostsText}>
          No posts yet. Be the first to post!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
  forumTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  forumDescription: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 10,
  },
  addPostButton: {
    backgroundColor: '#F51F46',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addPostButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  postTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    color: '#AAA',
  },
  viewPostText: {
    color: '#F51F46',
    fontSize: 14,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  noPostsText: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ForumDetailsScreen;
