import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Bell, Search } from 'lucide-react-native';
import Post from '../../components/private/Post';
import Header from '../../components/shared/Header';
import { UserContext } from '../../../context/userContextAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { IP } from '../../../constants/constants';

export default function HomeScreen() {
    const { user, setUser } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                // Retrieve the JWT token from AsyncStorage
                const token = await AsyncStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No token found');
                }

                // Fetch posts using the token
                const response = await axios.get(`http://${IP}:5000/api/social/v1/posts`, {  // Ensure correct API endpoint
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPosts(response.data);
            } catch (err) {
                console.error('Failed to fetch posts:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.searchBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Search ‘your thought’"
                    placeholderTextColor="#C5C5C5"
                />
                <Search size={18} color={'white'} />
            </View>

            {posts.length > 0 ? (
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <Post post={item} />}
                    keyExtractor={item => item._id} // Make sure _id is unique in your post schema
                />
            ) : (
                <View style={styles.noPostsContainer}>
                    <Text style={styles.noPostsText}>No Posts Available</Text>
                    <Text style={styles.noPostsDescription}>Your posts will be added here</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    searchBox: {
        backgroundColor: '#333',
        borderRadius: 10,
        color: 'white',
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    input: {
        flex: 1,
    },
    noPostsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPostsText: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    noPostsDescription: {
        fontSize: 14,
        color: '#AAA',
    },
});
