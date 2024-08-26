import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { ArrowUp, MessageCircle, Send, ArrowDown } from 'lucide-react-native';
import Header from '../../components/shared/Header';
import ThreeDots from '../../components/shared/ThreeDots';
import VerticalDots from '../../components/shared/VerticalDots';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../../context/userContextAPI';
import { IP } from '../../../constants/constants';

const CommentScreen = ({ route, navigation }) => {
  const post = route.params.post;
  const selectedButton = route.params.selectedButton;

  const width = Dimensions.get('window').width;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [addComment, setAddComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const { user } = useContext(UserContext);

  const [comments, setComments] = useState(post.comments);

  useEffect(() => {
    console.log("Comments or post updated:", comments, post);
  }, [comments, post]);

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`http://${IP}:5000/api/social/v1/posts/${post._id}`);
      setComments(response.data.post.comments);
    } catch (error) {
      console.log("Error fetching updated post data:", error);
    }
  };

  const handleAddPress = async () => {
    setCommentLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
        throw new Error('No token found');
      }
      
      const requestData = {
        content: addComment,
        author: user._id, 
        postId: post._id, 
        forumId: post.forum._id,
      };

      const response = await axios.post(`http://${IP}:5000/api/social/v1/comment/`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComments(response.data.post.comments);
      setCommentLoading(false);
      setAddComment('');

      // Optionally, fetch updated post data to ensure sync
      await fetchPostData();
    } catch (error) {
      console.log("Error while posting comment:", error);
      setCommentLoading(false);
    } finally {
      setCommentLoading(false);
      setAddComment('');
    }
  }

  const LazyLoadImage = ({ uri, style }) => {
    const [loading, setLoading] = useState(true);
  
    return (
      <View style={[style, styles.imageContainer]}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#ffffff" />
          </View>
        )}
        <Image
          source={{ uri }}
          style={[style, loading && styles.hiddenImage]}
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          onLoad={() => {
            setLoading(false);
          }}
        />
      </View>
    );
  };

  const DotIndicator = ({ total, currentIndex }) => {
    return (
      <View style={styles.dotsContainer}>
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.contentContainer}>

        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Image
              source={{ uri: post.author.profilePicture }}
              style={styles.avatar}
            />
            <View style={styles.postInfo}>
              <Text style={styles.username}>{post.author.username}</Text>
              <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{post.forum.title}</Text>
            </View>
            <ThreeDots />
          </View>

          <Text style={styles.postText}>
            {post.content}
          </Text>

          {post.media.length > 1 ? (
            <View style={{ position: 'relative' }}>
              <Carousel
                loop={false}
                width={width}
                height={300}
                autoPlay={false}
                data={post.media}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({ item }) => (
                  <LazyLoadImage uri={item} style={styles.postImage} />
                )}
              />
              <DotIndicator total={post.media.length} currentIndex={currentIndex} />
            </View>
          ) : (
            <LazyLoadImage uri={post.media[0]} style={styles.postImage} />
          )}

          <View style={styles.postActions}>
            <View style={{ flexDirection: 'row', gap: '10%' }}>
              <TouchableOpacity style={styles.actionButton}>
                <ArrowDown
                  size={20}
                  color={selectedButton === "DisLike" ? '#F51F46' : '#C3BABA'} />
                <Text style={styles.actionText}>{post.downvotes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ArrowUp color={selectedButton === "Like" ? '#F51F46' : '#C3BABA'} size={20} />
                <Text style={styles.actionText}>{post.upvotes.length}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle color="#F51F46" size={20} />
              <Text style={[styles.actionText, { color: '#F51F46' }]}>{comments.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image source={require('../../../assets/images/Share.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
              <Text style={styles.actionText}>{post.shares.length}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentSection}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <View style={styles.commentLeftLine} />
              <Image
                source={{ uri: comment.author.profilePicture }}
                style={styles.avatarSmall}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUsername}>{comment.author.username}</Text>
                  <Text style={styles.commentTime}>{new Date(comment.createdAt).toLocaleString()}</Text>
                </View>
                <Text style={styles.commentText}>
                  {comment.content}
                </Text>

                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.commentActionButton}>
                    <ArrowUp color="#F51F46" size={20} />
                    <Text style={styles.commentActionText}>{comment.upvotes.length}</Text>
                    <ArrowDown color="white" size={20} />
                    <Text style={styles.commentActionText}>{comment.downvotes.length}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => navigation.navigate("Reply Screen", { comment })}
                    style={styles.commentActionButton}
                  >
                    <Image source={require('../../../assets/images/Reply.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                    <Text style={styles.commentReplyText}>Reply</Text> 
                  </TouchableOpacity>
                  <VerticalDots />
                </View>

                {/* Replies Section */}
                <View style={{ marginTop: 10 }}>
                  {comment.replies && comment.replies.map((reply, replyIndex) => (
                    <View key={replyIndex} style={styles.replyContainer}>
                      <View style={styles.replyLeftLine} />
                      <Image
                        source={{ uri: reply.author.profilePicture }}
                        style={styles.avatarSmall}
                      />
                      <View style={styles.replyContent}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentUsername}>{reply.author.username}</Text>
                          <Text style={styles.commentTime}>{new Date(reply.createdAt).toLocaleString()}</Text>
                        </View>
                        <Text style={styles.commentText}>
                          {reply.content}
                        </Text>
                        <View style={styles.commentActions}>
                          <TouchableOpacity style={styles.commentActionButton}>
                            <ArrowUp color="#F51F46" size={20} />
                            <Text style={styles.commentActionText}>{reply.upvotes.length}</Text>
                            <ArrowDown color="white" size={20} />
                            <Text style={styles.commentActionText}>{reply.downvotes.length}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.commentActionButton}>
                            <Image
                              source={require('../../../assets/images/Reply.png')}
                              style={{ height: 20, width: 20 }}
                              resizeMode='contain'
                            />
                            <Text style={styles.commentReplyText}>Reply</Text>
                          </TouchableOpacity>
                          <VerticalDots />
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Type your comment"
          placeholderTextColor="#aaa"
          value={addComment}
          onChangeText={(text) => setAddComment(text)}
        />
        {commentLoading ? (
          <View style={[styles.loadingContainer, { marginLeft: '5%'}]}>
            <ActivityIndicator size="small" color="#F51F46" />
          </View>
        ) : (
          <TouchableOpacity style={styles.sendButton} onPress={handleAddPress}>
            <Send color="#F51F46" size={24} /> 
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged
  container: {
    flex: 1,
    backgroundColor: '#000', // Background color to match the theme
  },
  contentContainer: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  postContainer: {
    marginBottom: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  postInfo: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
  },
  time: {
    color: '#777',
    fontSize: 12,
  },
  tag: {
    backgroundColor: '#400E17',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tagText: {
    color: '#EFBEBE',
    fontSize: 12,
  },
  postText: {
    color: '#fff',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    paddingRight: '7%'
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    marginLeft: 5,
  },
  commentSection: {
    borderTopColor: '#333',
    borderTopWidth: 1,
    paddingTop: 15,
  },
  commentContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingLeft: '5%',
  },
  commentLeftLine: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#F51F46',
  },
  commentContent: {
    flex: 1,
    marginLeft: '2%',
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  commentUsername: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentTime: {
    color: '#777',
    fontSize: 12,
  },
  commentText: {
    color: '#fff',
    marginBottom: 5,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  commentActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  commentActionText: {
    color: '#777',
    marginHorizontal: 5,
  },
  commentReplyText: {
    color: '#C3BABA',
    marginLeft: '1%',
  },
  replyContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: '5%', // Margin from the left to indent replies
    marginRight: 10, // Margin from the right
    paddingLeft: '1%',
    position: 'relative',
  },
  replyLeftLine: {
    position: 'absolute',
    left: '-5%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#F51F46',
  },
  replyContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopColor: '#333',
    borderTopWidth: 1,
    backgroundColor: '#111', // Background color for the comment input area
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 25,
    padding: 10,
  },
  avatarSmall: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '5%',
    marginTop: '2%'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#ffffff', // Active dot color
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Inactive dot color
  },
});

export default CommentScreen;
