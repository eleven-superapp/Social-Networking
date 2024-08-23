import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

const dots = [
    { cx: 130, cy: 67 },   // Top middle
    { cx: 275, cy: 150 },  // Right middle
    { cx: 125, cy: 250 },  // Bottom middle
    { cx: 270, cy: 333 },   // Left middle
  ];

const avatars = [
  { uri: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__' },
  { uri: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__' },
  { uri: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__' },
  { uri: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__' },
];

const OnBoarding = () => {

  const handleNextPress = ()  => {
    const navigation = useNavigation();
    navigation.navigate('OnBoardingProfile');
  }

  return (
    <LinearGradient
      colors={['#101010', '#4A06135C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Find & Connect!</Text>
        <Text style={styles.subtitle}>
          Enjoy together, happy to share and save your time connecting with people.
        </Text>
      </View>

      <View style={styles.circleContainer}>
        <Svg height="400" width="400">
          <Circle
            cx="200"
            cy="200"
            r="150"
            stroke="#F51F46"
            strokeWidth="2"
            strokeDasharray="5,10"
            fill="none"
          />
          <Circle
            cx="200"
            cy="200"
            r="90"
            stroke="#F51F46"
            strokeWidth="2"
            strokeDasharray="5,10"
            fill="none"
          />
          {dots.map((dot, index) => (
            <Circle
              key={index}
              cx={dot.cx}
              cy={dot.cy}
              r="7"
              fill="#F51F46"
            />
          ))}
        </Svg>

        {avatars.map((avatar, index) => (
          <Image
            key={index}
            source={{ uri: avatar.uri }}
            style={[styles.avatar, styles[`avatar${index + 1}`]]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNextPress}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
    maxWidth: 330,
    lineHeight: 25,
  },
  circleContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ff4d4d',
  },
  avatar1: {
    top: -15,
    left: 180,
  },
  avatar2: {
    top: 70,
    left: -10,
  },
  avatar3: {
    bottom: -15,
    left: 80,
  },
  avatar4: {
    top: 180,
    right: -15,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#ff4d4d',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 350,
    minHeight: 50,
  },
  buttonText: {
    color: '#FDFDFD',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default OnBoarding;
