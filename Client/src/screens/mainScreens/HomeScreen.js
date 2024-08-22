import React from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Bell, Search } from 'lucide-react-native';
import Post from '../../components/private/Post';
import Header from '../../components/shared/Header';
const DATA = [
    {
        id: '1',
        user: 'Siber Koza',
        time: '15 hours ago',
        text: 'Have a great day with my amazing client all the way from New York',
        imageUrl: 'https://avatar.iran.liara.run/public/37',
        likes: '56.9k',
        comments: '4682',
        shares: '62',
        profilePictureUrl: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__',
        category: 'Music'
    },
    {
        id: '2',
        user: 'Siber Koza',
        time: '15 hours ago',
        text: 'To implement a "See more" feature for large text in your post, you can use a combination of state management and conditional rendering to show and hide the additional text. Here’s how you can modify your Post component to include this feature:',
        imageUrl: 'https://avatar.iran.liara.run/public/77',
        likes: '56.9k',
        comments: '4682',
        shares: '62',
        profilePictureUrl: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__',
        category: 'Forum'
    },
    {
        id: '3',
        user: 'Siber Koza',
        time: '15 hours ago',
        text: 'Have a great day with my amazing client all the way from New York',
        imageUrl: 'https://avatar.iran.liara.run/public/89',
        likes: '56.9k',
        comments: '4682',
        shares: '62',
        profilePictureUrl: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725235200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mLvOM1FDQUQ9w6X-ZQNfuBhWPHSAL3aXLlC07R81IuXSXwbZxPT4mIz4g4UI3fxspyyn35oAmkAq~a2IHfWDDfrBQou~lhSwLXWzrgHbEIXsm-Ycw0oDw69I8YvfKPIQTokUORFcUvSS8AZP6HXvhD3VGXidSHBg69iqIIWKWu1HZkNILEcTDxT5FOeSKw7Jb50JS6Gcd95fcCNRvPYsdE4Pt086H5JAFqpaUGPDQBsaF2-J6MdnPrzJJruHhABCEQtZfGBIev3TMO-O18E4Jf8p8CJfHDRfMmBURsmsleTiM26CmJRS2d4YRcIR0XuLY1vCKG2KHBqUPpjIYvRgmw__',
        category: 'Post'
    },
];

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Main Screen</Text>
            
            <Header />

            <View style={styles.searchBox} >
                <TextInput
                    style={styles.input}
                    placeholder="Search ‘your thought’"
                    placeholderTextColor="#C5C5C5"
                />
                <Search size={18} color={'white'} />
            </View>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Post post={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchBox: {
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
        marginVertical: 8,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
    },
    postContainer: {
        marginBottom: 20,
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
    userName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeText: {
        color: 'gray',
        fontSize: 12,
    },
    postText: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10,
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
    },
    postFooterText: {
        color: 'gray',
    },
    input:{
        flex:1,
    },
});
