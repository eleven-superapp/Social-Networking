import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Menu, Info } from 'lucide-react-native'; // Import the icons you need
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../context/userContextAPI'; // Adjust the path as necessary
import axios from 'axios'; // Import axios for making HTTP requests
import { IP } from '../../../constants/constants'; // Import your IP address or base URL
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingProfile = () => {
    const { user, setUser } = useContext(UserContext); // Access user and setUser from context
    const [bio, setBio] = useState(user.bio ? user.bio : ''); // Set initial bio from user data if available

    const navigation = useNavigation();

    // Function to update the bio in the database
    const updateUserBio = async () => {
        try {
            const token = await AsyncStorage.getItem('jwt'); // Retrieve the JWT token from AsyncStorage
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.put(`http://${IP}:5000/api/social/v1/user/edit/${user._id}`, { // Use the appropriate API endpoint
                bio: bio,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUser(prevUser => ({ ...prevUser, bio: bio })); // Update the user context with the new bio
                console.log('Bio updated successfully');
            }
        } catch (error) {
            console.error('Failed to update bio:', error);
        }
    };

    // Function to handle the Next button press
    const handleNextPress = async () => {
        if (user.bio !== bio) {
            await updateUserBio(); // Update the bio if it has been changed
        }
        navigation.navigate('Home Screen');
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 20}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity style={styles.menuIcon}>
                            <Menu color="#858585" size={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Set your profile</Text>
                    </View>
                    <Image
                        style={styles.headerAvatar}
                        source={{
                          uri: `${user.profilePicture}` // Use user avatar if available
                        }}
                    />
                </View>

                {/* Profile Info */}
                <View style={styles.profileContainer}>
                    <View style={styles.profileCoverPhotoContainer}>
                        <Image
                            source={{ uri: 'https://s3-alpha-sig.figma.com/img/3017/1de2/a7f6f3d95d4e31ba2ba32afe5e05330f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AQToRxf1L3KRlPt-RugV7copHvBpADvShn9golDxluE6q1F6Y6sjqbH1sVXsBmX8RC6rAiINpAw2KhljekCeOURrV21EikV~D4ZFjCF7ZLnhKVie61fQ8HLW84Jf2qIQ0dh1XdIQYO4cEkMJ-xwygxIf8wJ4PqIsJj7eiwjQT-VuyaI~hF8E-YfwxZyNhCNfXVP1rH6FhDJ8NUU5yo2Xw96tsVlftHV~gx0Ra5a7~lYpuXa8dXG1WUdHida-~NiNg1zGRQJE69rd4GTwnTtLjiOX3E~DHDo-r8txb95UP-gPOJAik~SBJUxFWm5n5ZZgUatFxDboUfXTIH8tk8rFHg__' }}
                            style={styles.profileCoverPhoto}
                        />
                        {/* Adjusted Avatar Position */}
                        <View style={styles.profileAvatarContainer}>
                            <Image
                                style={styles.profileAvatar}
                                source={{
                                    uri: `${user.profilePicture}`
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.profileInfoContainer}>
                    <View style={styles.statsContainer}>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{user.followers > 0 ? user.followers : 0}</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{user.following > 0 ? user.following : 0}</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View>
                    </View>

                    <View style={styles.bioSection}>
                        <Text style={styles.username}>{user.username ? `@${user.username}` : '@Username'}</Text>
                        <TextInput
                            style={styles.bioInput}
                            placeholder="Type your bio here"
                            placeholderTextColor="#AAAAAA"
                            value={bio}
                            onChangeText={setBio}
                        />
                    </View>

                    {/* Posts Section */}
                    <View style={styles.postsHeader}>
                        <Text style={{ fontSize: 15, fontWeight: '500', color: '#FFFFFF' }}>Posts</Text>
                        <View style={{ height: 1, width: '100%', backgroundColor: '#494949' }}></View>
                    </View>
                    <View style={styles.postsContainer}>
                        <Info color="white" size={40} />
                        <Text style={styles.noPostsText}>0 Posts</Text>
                        <Text style={styles.noPostsDescription}>Your posts will be added here</Text>
                    </View>
                    
                      {/* Button */}
                  <TouchableOpacity style={styles.button} onPress={handleNextPress}>
                      <Text style={styles.buttonText}>All set .. Go!</Text>
                  </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '2%',
    backgroundColor: '#101010',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#4A4A4A4D',
    paddingHorizontal: '7%',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30%',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F51F46',
  },
  profileContainer: {
    alignItems: 'center',
    zIndex: 2
  },
  profileCoverPhotoContainer: {
    width: '100%',
    height: 160,
    position: 'relative',
    backgroundColor: '#2D2D2D',
  },
  profileCoverPhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileAvatarContainer: {
    position: 'absolute',
    top: 120, // Adjust as needed
    left: '50%',
    transform: [{ translateX: -50 }], // To center the avatar
    zIndex: 100
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#F51F46',
  },
  profileInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F51F4624',
    borderWidth: 0.8,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    flex: 1,
    zIndex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: '35%'
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: '#AAAAAA',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  bioSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  bioInput: {
    fontSize: 14,
    color: '#FFFFFF',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  postsHeader: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '5%',
    width: '100%',
    paddingHorizontal: 20,
  },
  postsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 30,
    width: '90%',
    minHeight: '50%',
  },
  noPostsText: {
    fontSize: 16,
    color: '#F0F2FB',
    marginTop: 5,
    fontWeight: '600',
  },
  noPostsDescription: {
    fontSize: 13,
    color: '#98A2B3',
    marginTop: 1,
  },
  button: {
    backgroundColor: '#F51F46',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    zIndex: 200,
    position: 'absolute',
    bottom: '2%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default OnBoardingProfile;
