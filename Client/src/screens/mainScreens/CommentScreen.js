import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { ArrowUp, MessageCircle, Send, ArrowDown } from 'lucide-react-native'; // Import icons from Lucide
import Header from '../../components/shared/Header';
import ThreeDots from '../../components/shared/ThreeDots';
import VerticalDots from '../../components/shared/VerticalDots';
import Carousel from 'react-native-reanimated-carousel';

const CommentScreen = ({ route,navigation }) => {
  const post = route.params.post; // Extract the post object from the route parameters
  const selectedButton = route.params.selectedButton;
  const comment = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  const width = Dimensions.get('window').width; // Get the device width for carousel width

  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current carousel index

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

          <View style={styles.postActions}>
            <View style={{flexDirection: 'row', gap: '10%'}}>
              <TouchableOpacity style={styles.actionButton}>
                <ArrowDown
                size={20}
                color={ selectedButton=="DisLike"?'#F51F46':'#C3BABA'} />
                <Text style={styles.actionText}>{post.downvotes.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <ArrowUp color={ selectedButton=="Like"?'#F51F46':'#C3BABA'} size={20} />
                <Text style={styles.actionText}>{post.upvotes.length}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle color="#F51F46" size={20} />
              <Text style={[styles.actionText, { color: '#F51F46' }]}>{post.comments.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Image source={require('../../../assets/images/Share.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
              <Text style={styles.actionText}>{post.shares.length}</Text> 
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentSection}>
          {Array(3).fill(0).map((_, index) => (
            <View key={index} style={styles.commentContainer}>
              <View style={styles.commentLeftLine} />
              <Image
                source={{ uri: post.profilePictureUrl }}
                style={styles.avatarSmall}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUsername}>{post.user}</Text>
                  <Text style={styles.commentTime}>{post.time}</Text>
                </View>
                <Text style={styles.commentText}>
                  {comment}
                </Text>
                
                <View style={styles.commentActions}>
                  <TouchableOpacity style={styles.commentActionButton}>
                    <ArrowUp color="#F51F46" size={20} />
                    <Text style={styles.commentActionText}>56.9k</Text> 
                  </TouchableOpacity>
                  <TouchableOpacity 
                  onPress={()=>navigation.navigate("Reply Screen",{comment:comment})}
                  style={styles.commentActionButton}>
                    <Image source={require('../../../assets/images/Reply.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                    <Text style={styles.commentReplyText}>Reply</Text> 
                  </TouchableOpacity>
                  <VerticalDots />
                </View>

                {/* Replies Section */}
                <View style={{ marginTop: 10 }}>
                  {Array(3).fill(0).map((_, replyIndex) => (
                    <View key={replyIndex} style={styles.replyContainer}>
                      <View style={styles.replyLeftLine} />
                      <Image
                        source={{ uri: post.profilePictureUrl }}
                        style={styles.avatarSmall}
                      />
                      <View style={styles.replyContent}>
                        <View style={styles.commentHeader}>
                          <Text style={styles.commentUsername}>{post.user}</Text>
                          <Text style={styles.commentTime}>{post.time}</Text>
                        </View>
                        <Text style={styles.commentText}>
                          Reply to the comment here.
                        </Text>
                        <View style={styles.commentActions}>
                          <TouchableOpacity style={styles.commentActionButton}>
                            <ArrowUp color="#F51F46" size={20} />
                            <Text style={styles.commentActionText}>10k</Text>
                            <ArrowDown color="white" size={20} />
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.commentActionButton}>
                            <Image source={require('../../../assets/images/Reply.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
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
        />
        <TouchableOpacity style={styles.sendButton}>
          <Send color="#F51F46" size={24} /> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: '100%',
    borderRadius: 10,
    marginBottom: 10,
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
    paddingLeft: 15,
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
    marginLeft: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
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
    marginLeft: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 30, // Margin from the left to indent replies
    marginRight: 10, // Margin from the right
    paddingLeft: 15,
    position: 'relative',
  },
  replyLeftLine: {
    position: 'absolute',
    left: -15,
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
