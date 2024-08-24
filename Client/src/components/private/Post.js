import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { MoveUp, MoveDown, MessageCircle } from 'lucide-react-native';
import ThreeDots from '../shared/ThreeDots';
import { useNavigation } from '@react-navigation/native';

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const [selectedButton, setSelectedButton] = useState();

  const navigation = useNavigation();

  console.log("Post in render:", post);

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

  const handleUpvote = () => {
    setSelectedButton(selectedButton === 'Like' ? null : 'Like');
  };

  const handleDownvote = () => {
    setSelectedButton(selectedButton === 'DisLike' ? null : 'DisLike');
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

      {/* Render media */}
      <FlatList
        data={post.media}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.log("Item:", item);
          let itemString = item.toString();
          return(
            <Image 
            source={{ uri: `${itemString}` }} 
            style={styles.postImage} 
            onError={(e) => console.log('Image load error:', e.nativeEvent.error)} // Error handling
            onLoad={() => console.log('Image loaded:', item)} // Log successful loads
          />
          )
        }}
      />

      <View style={styles.postFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable onPress={handleDownvote} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MoveDown color={selectedButton === "DisLike" ? '#F51F46' : '#C3BABA'} size={18} />
            <Text style={styles.postFooterText}>{post.upvotes.length}</Text>
          </Pressable>
          <Pressable onPress={handleUpvote} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MoveUp color={selectedButton === "Like" ? '#F51F46' : '#C3BABA'} size={18} style={{ marginLeft: 4 }} />
            <Text style={styles.postFooterText}>{post.downvotes.length}</Text>
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
});
