import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MoveUp, MoveDown, MessageCircle } from 'lucide-react-native';
import ThreeDots from '../shared/ThreeDots';
import { useNavigation } from '@react-navigation/native';

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const navigation = useNavigation();

  const renderText = () => {
    if (isExpanded || post.text.length <= 100) {
      return (
        <Text style={styles.postText}>
          {post.text}
          {post.text.length > 100 && (
            <Text onPress={toggleExpanded} style={styles.seeLessText}>
              {' '}See less
            </Text>
          )}
        </Text>
      );
    }

    return (
      <Text style={styles.postText}>
        {post.text.substring(0, 100)}...
        <Text onPress={toggleExpanded} style={styles.seeMoreText}>
          {' '}See more
        </Text>
      </Text>
    );
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.profilePictureUrl }} style={styles.profilePic} />
        <View style={styles.userContainer}>
          <View style={styles.headerTopRow}>
            <Text style={[styles.userName, styles.flexOne]}>{post.user}</Text>
            <View style={styles.messageContainer}>
              {/* <View style={styles.messageButton}> */}
                
                <Text style={styles.messageText}>{post.category}</Text>
              {/* </View> */}
              <ThreeDots />
            </View>
          </View>
          <Text style={styles.timeText}>{post.time}</Text>
        </View>
      </View>
      {renderText()}
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
      <View style={styles.postFooter}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MoveDown color={'#C3BABA'} size={18} />
          <MoveUp color={'#F51F46'} size={18} style={{ marginLeft: 4 }} />
          <Text style={styles.postFooterText}>{post.likes}</Text>
        </View>
        <Pressable
        onPress={() =>navigation.navigate("Comment Screen",{post:post})}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MessageCircle color={'#FFFFFF'} size={20} />
          <Text style={styles.postFooterText}>{post.comments}</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../../assets/images/Share.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
          <Text style={styles.postFooterText}>{post.shares}</Text>
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
  messageButton: {
    backgroundColor: '#400E17',
    borderRadius: 18,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  messageText: {
    marginLeft: 6,
    color: '#EFBEBE',
    paddingVertical:4,
    backgroundColor:'#400E17',
    borderRadius:15,
    paddingHorizontal:18,
  },
  threeDotsIcon: {
    height: 18,
    width: 18,
    marginLeft: 10,
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
