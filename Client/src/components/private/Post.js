import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {MoveUp, MoveDown, MessageCircle} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from '../../../constants/constants';

const Post = ({post, currentUser}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Check if the current user has upvoted or downvoted the post
  useEffect(() => {
    if (post.upvotes?.includes(currentUser?._id)) {
      setSelectedButton('Like');
    } else if (post.downvotes?.includes(currentUser?._id)) {
      setSelectedButton('DisLike');
    } else {
      setSelectedButton(null);
    }
  }, [post.upvotes, post.downvotes, currentUser]);

  const handleReaction = async reaction => {
    try {
      const token = await AsyncStorage.getItem('jwt');
      if (!token) throw new Error('No token found');

      setLoading(true);
      const response = await axios.put(
        `http://${IP}:3000/api/social/v1/reactions/react`,
        {
          reaction,
          postId: post._id,
          reacterId: currentUser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        if (reaction === 'up') {
          post.downvotes = post.downvotes?.filter(id => id !== currentUser._id);
          if (!post.upvotes?.includes(currentUser._id)) {
            post.upvotes?.push(currentUser._id);
          }
        } else if (reaction === 'down') {
          post.upvotes = post.upvotes?.filter(id => id !== currentUser._id);
          if (!post.downvotes?.includes(currentUser._id)) {
            post.downvotes?.push(currentUser._id);
          }
        } else {
          post.upvotes = post.upvotes?.filter(id => id !== currentUser._id);
          post.downvotes = post.downvotes?.filter(id => id !== currentUser._id);
        }
        setSelectedButton(
          reaction === 'up' ? 'Like' : reaction === 'down' ? 'DisLike' : null,
        );
      }
    } catch (error) {
      console.error('Error while reacting:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = () => {
    if (selectedButton === 'Like') {
      handleReaction('neutral');
    } else {
      handleReaction('up');
    }
  };

  const handleDownvote = () => {
    if (selectedButton === 'DisLike') {
      handleReaction('neutral');
    } else {
      handleReaction('down');
    }
  };

  const renderText = () => {
    if (isExpanded || post.content?.length <= 100) {
      return (
        <Text style={styles.postText}>
          {post.content}
          {post.content?.length > 100 && (
            <Text onPress={toggleExpanded} style={styles.seeLessText}>
              {' '}
              See less
            </Text>
          )}
        </Text>
      );
    }

    return (
      <Text style={styles.postText}>
        {post.content?.substring(0, 100)}...
        <Text onPress={toggleExpanded} style={styles.seeMoreText}>
          {' '}
          See more
        </Text>
      </Text>
    );
  };

  const renderMedia = () => {
    if (!post.media || post.media.length === 0) return null;

    if (post.media.length > 1) {
      return (
        <View style={{position: 'relative'}}>
          <Carousel
            loop={false}
            width={width}
            height={200}
            autoPlay={false}
            data={post.media}
            scrollAnimationDuration={1000}
            renderItem={({item}) => (
              <Image source={{uri: item}} style={styles.postImage} />
            )}
          />
        </View>
      );
    }

    return <Image source={{uri: post.media[0]}} style={styles.postImage} />;
  };

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image
          source={{
            uri:
              post.author?.profilePicture || 'https://via.placeholder.com/40',
          }}
          style={styles.profilePic}
        />
        <View style={styles.userContainer}>
          <Text style={styles.userName}>
            {post.author?.username || 'Unknown'}
          </Text>
          <Text style={styles.timeText}>
            {new Date(post.createdAt).toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Post Content */}
      {renderText()}
      {renderMedia()}

      {/* Post Footer */}
      <View style={styles.postFooter}>
        <TouchableOpacity onPress={handleUpvote} style={styles.footerButton}>
          <MoveUp
            color={selectedButton === 'Like' ? '#F51F46' : '#C3BABA'}
            size={18}
          />
          <Text
            style={[
              styles.postFooterText,
              {color: selectedButton === 'Like' ? '#F51F46' : '#C3BABA'},
            ]}>
            {post.upvotes?.length || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDownvote} style={styles.footerButton}>
          <MoveDown
            color={selectedButton === 'DisLike' ? '#F51F46' : '#C3BABA'}
            size={18}
          />
          <Text
            style={[
              styles.postFooterText,
              {color: selectedButton === 'DisLike' ? '#F51F46' : '#C3BABA'},
            ]}>
            {post.downvotes?.length || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Comment', {
              postId: post._id,
              comments: post.comments,
            })
          }
          style={styles.footerButton}>
          <MessageCircle color={'#FFFFFF'} size={20} />
          <Text style={styles.postFooterText}>
            {post.comments?.length || 0}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userContainer: {
    flex: 1,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeText: {
    color: '#AAA',
    fontSize: 12,
  },
  postText: {
    color: '#C3BABA',
    fontSize: 14,
    marginVertical: 10,
  },
  seeMoreText: {
    color: '#FFF',
  },
  seeLessText: {
    color: '#FFF',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postFooterText: {
    color: '#C3BABA',
    marginLeft: 5,
  },
});
