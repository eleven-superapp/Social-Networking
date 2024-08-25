import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, Dimensions, ActivityIndicator } from 'react-native';
import { MoveUp, MoveDown, MessageCircle } from 'lucide-react-native';
import ThreeDots from '../shared/ThreeDots';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import { IP } from '../../../constants/constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Post = ({ post, currentUser  }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current carousel index
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const [selectedButton, setSelectedButton] = useState();

  const navigation = useNavigation();
  const width = Dimensions.get('window').width; // Get the device width for carousel width

  // Check if the current user has upvoted or downvoted the post
  useEffect(() => {
    console.log("Checking user votes, user: ", currentUser._id);
    if (post.upvotes.includes(currentUser._id)) {
      setSelectedButton('Like');
    } else if (post.downvotes.includes(currentUser._id)) {
      setSelectedButton('DisLike');
    } else {
      setSelectedButton(null);
    }
  }, [post.upvotes, post.downvotes, currentUser._id]);

  const LazyLoadImage = ({ uri, style }) => {
    const [loading, setLoading] = useState(true); // State to track if the image is loading
  
    return (
      <View style={[style, styles.imageContainer]}>
        {loading && (
          // Display a grey background and activity indicator while the image is loading
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#ffffff" />
          </View>
        )}
        <Image
          source={{ uri }}
          style={[style, loading && styles.hiddenImage]} // Hide the image while it's loading
          onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
          onLoad={() => {
            console.log('Image loaded:', uri);
            setLoading(false); // Set loading to false when the image is loaded
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
  
  

  const renderText = () => {
    if (isExpanded || post.content?.length <= 100) {
      return (
        <Text style={styles.postText}>
          {post.content}
          {post.content?.length > 100 && (
            <Text onPress={toggleExpanded} style={styles.seeLessText}>
              {' '}See less
            </Text>
          )}
        </Text>
      );
    }

    return (
      <Text style={styles.postText}>
        {post.content?.substring(0, 100)}...
        <Text onPress={toggleExpanded} style={styles.seeMoreText}>
          {' '}See more
        </Text>
      </Text>
    );
  };

    // Function to handle reaction API call
  const handleReaction = async (reaction) => {
    try {

      // Retrieve the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem('jwt');
      if (!token) {
          throw new Error('No token found');
      }

      const response = await axios.put(`http://${IP}:5000/api/social/v1/reactions/react`, {
        reaction: reaction,
        postId: post._id,
        reacterId: currentUser._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        console.log(response.data.message);

        // Update post object or state to reflect changes in upvotes and downvotes
        if (reaction === 'up') {
          post.downvotes = post.downvotes.filter(id => id !== currentUser.id);
          if (!post.upvotes.includes(currentUser.id)) {
            post.upvotes.push(currentUser.id);
          }
        } else if (reaction === 'down') {
          post.upvotes = post.upvotes.filter(id => id !== currentUser.id);
          if (!post.downvotes.includes(currentUser.id)) {
            post.downvotes.push(currentUser.id);
          }
        } else {
          post.upvotes = post.upvotes.filter(id => id !== currentUser.id);
          post.downvotes = post.downvotes.filter(id => id !== currentUser.id);
        }
        setSelectedButton(reaction === 'up' ? 'Like' : reaction === 'down' ? 'DisLike' : null);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error while reacting:', error.response ? error.response.data.message : error.message);
    }
  };

  const handleUpvote = () => {
    if (selectedButton === 'Like') {
      setSelectedButton(null);
      handleReaction('neutral'); // This is to remove upvote
    } else {
      setSelectedButton('Like');
      handleReaction('up'); // This is to upvote
      if (selectedButton === 'DisLike') {
        // Handle switching from downvote to upvote
        handleReaction('up');
      }
    }
  };

  const handleDownvote = () => {
    if (selectedButton === 'DisLike') {
      setSelectedButton(null);
      handleReaction('neutral'); // This is to remove downvote
    } else {
      setSelectedButton('DisLike');
      handleReaction('down'); // This is to downvote
      if (selectedButton === 'Like') {
        // Handle switching from upvote to downvote
        handleReaction('down');
      }
    }
  };


  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={{ uri: `${post.author.profilePicture}` }}
          style={styles.profilePic}
          onError={(e) => console.log('Profile Image load error:', e.nativeEvent.error)} // Error handling
          onLoad={() => console.log('Profile Image loaded:', post.author.profilePicture)} // Log successful loads
        />
        <View style={styles.userContainer}>
          <View style={styles.headerTopRow}>
            <Text style={[styles.userName, styles.flexOne]}>{post.author.username}</Text>
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{post.forum.title}</Text>
              <ThreeDots />
            </View>
          </View>
          <Text style={styles.timeText}>{new Date(post.createdAt).toLocaleString()}</Text>
        </View>
      </View>

      {renderText()}

      {/* Render media with Carousel */}
      {post.media.length > 1 ? (
        <View style={{ position: 'relative' }}>
        <View style={styles.indicatorContainer}>
          <Text style={styles.indicatorText}>
            {currentIndex + 1} / {post.media.length}
          </Text>
        </View>
        <Carousel
          loop={false}
          width={width}
          height={200}
          autoPlay={false}
          data={post.media}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setCurrentIndex(index)} // Update current index
          renderItem={({ item }) => (
            <LazyLoadImage uri={item} style={styles.postImage} />
          )}
        />
        <DotIndicator total={post.media.length} currentIndex={currentIndex} />
      </View>
      ) : (
        <LazyLoadImage uri={post.media[0]} style={styles.postImage} />
      )}

      <View style={styles.postFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={handleDownvote} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MoveDown color={selectedButton === "DisLike" ? '#F51F46' : '#C3BABA'} size={18} />
            <Text style={[styles.postFooterText, { color: selectedButton === "DisLike" ? '#F51F46' : '#C3BABA' }]}>
              {post.downvotes.length}
            </Text>
          </Pressable>
          <Pressable onPress={handleUpvote} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MoveUp color={selectedButton === "Like" ? '#F51F46' : '#C3BABA'} size={18} style={{ marginLeft: 4 }} />
            <Text style={[styles.postFooterText, { color: selectedButton === "Like" ? '#F51F46' : '#C3BABA' }]}>
              {post.upvotes.length}
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => navigation.navigate("Comment Screen", { post: post, selectedButton: selectedButton })}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MessageCircle color={'#FFFFFF'} size={20} />
          <Text style={styles.postFooterText}>{post.comments.length}</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/images/Share.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
          <Text style={styles.postFooterText}>{post.shares || 0}</Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 7,
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  headerTopRow: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageText: {
    marginLeft: 6,
    color: '#EFBEBE',
    paddingVertical: 4,
    backgroundColor: '#400E17',
    borderRadius: 15,
    paddingHorizontal: 18,
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
    position: 'absolute',
    bottom: -10,
  },
  postText: {
    color: '#C3BABA',
    fontSize: 14,
    marginBottom: 10,
  },
  seeMoreText: {
    color: 'white',
  },
  seeLessText: {
    color: 'white',
  },
  indicatorContainer: {
    alignItems: 'center',
    position: 'absolute', 
    zIndex: 100,
    color: '#EFBEBE',
    paddingVertical: 4,
    backgroundColor: '#400E17EE',
    borderRadius: 15,
    paddingHorizontal: 18,
    top: '7%',
    right: '2%'
  },
  indicatorText: {
    color: '#C3BABA',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingVertical: 8,
  },
  postFooterText: {
    color: '#C3BABA',
    marginLeft: 5,
  },
  imageContainer: {
    position: 'relative', // Allows stacking of the loading indicator and image
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Fill the parent view
    backgroundColor: '#cccccc', // Grey background
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenImage: {
    opacity: 0, // Initially hide the image while loading
  },
  indicatorContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  indicatorText: {
    color: '#fff',
    fontSize: 14,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
