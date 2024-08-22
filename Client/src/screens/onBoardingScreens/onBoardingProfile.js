import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Menu, Info } from 'lucide-react-native'; // Import the icons you need
import axios from 'axios';

const OnBoardingProfile = () => {

    const [bio, setBio] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30%'
        }}>
          <TouchableOpacity style={styles.menuIcon}>
            <Menu color="#858585" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set your profile</Text>
        </View>
        <Image
          style={styles.headerAvatar}
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__',
          }}
        />
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.profileCoverPhotoContainer}>
          <Image
            source={{uri: 'https://s3-alpha-sig.figma.com/img/3017/1de2/a7f6f3d95d4e31ba2ba32afe5e05330f?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AQToRxf1L3KRlPt-RugV7copHvBpADvShn9golDxluE6q1F6Y6sjqbH1sVXsBmX8RC6rAiINpAw2KhljekCeOURrV21EikV~D4ZFjCF7ZLnhKVie61fQ8HLW84Jf2qIQ0dh1XdIQYO4cEkMJ-xwygxIf8wJ4PqIsJj7eiwjQT-VuyaI~hF8E-YfwxZyNhCNfXVP1rH6FhDJ8NUU5yo2Xw96tsVlftHV~gx0Ra5a7~lYpuXa8dXG1WUdHida-~NiNg1zGRQJE69rd4GTwnTtLjiOX3E~DHDo-r8txb95UP-gPOJAik~SBJUxFWm5n5ZZgUatFxDboUfXTIH8tk8rFHg__'}}
            style={styles.profileCoverPhoto}
          />
        </View>
      </View>

      <View style={styles.profileAvatarContainer}>
          <Image
            style={styles.profileAvatar}
            source={{
              uri: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__',
            }}
          />
        </View>
    
        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F51F4624', borderWidth: 0.8, borderColor: '#FFFFFF', borderRadius: 10, flex: 1, zIndex: 1,
        }}>
            <View style={styles.statsContainer}>
            <View style={styles.stat}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>Following</Text>
            </View>
            </View>
            
            <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '5%', width: '100%'}}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1%', marginVertical: '5%'}}>
                    <Text style={styles.username}>@Churail13</Text>
                    <TextInput
                        style={styles.bioInput}
                        placeholder="Type your bio here"
                        placeholderTextColor="#AAAAAA"
                        value={bio}
                        onChangeText={setBio}
                    />
                </View>

                {/* Posts Section */}
                <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '5%', width: '100%', paddingHorizontal: 20
                }}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: '#FFFFFF'}}>Posts</Text>
                    <View style={{height: 1, width: '100%', backgroundColor: '#494949'}}></View>
                </View>
                <View style={styles.postsContainer}>
                    <Info color="white" size={40} />
                    <Text style={styles.noPostsText}>0 Posts</Text>
                    <Text style={styles.noPostsDescription}>Your posts will be added here</Text>
                </View>
            </View>
        </View>
        
            {/* Button */}
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>All set .. Go!</Text>
        </TouchableOpacity>
    </View>
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
    top: '20%', // Positioning it above the cover photo
    left: '50%',
    marginLeft: -50, // To center the avatar
    zIndex: 10
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#F51F46',
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: '-10%', // To provide space below the avatar
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
  bioPlaceholder: {
    fontSize: 14,
    color: '#AAAAAA',
    marginTop: 5,
  },
  postsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginBottom: 30,
    width: '90%',
    minHeight: '50%'
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
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '1%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bioInput: {
    fontSize: 14,
    color: '#FFFFFF',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  }
});

export default OnBoardingProfile;
