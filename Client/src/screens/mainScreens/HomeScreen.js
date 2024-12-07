import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {IP} from '../../../constants/constants';

const HomeScreen = () => {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://${IP}:3000/api/social/v1/forum`,
        );
        setForums(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch forums');
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, [navigation]);

  const renderForum = ({item}) => (
    <TouchableOpacity
      style={styles.forumCard}
      onPress={() =>
        navigation.navigate('ForumDetails', {forumId: item._id, forum: item})
      }>
      <Text style={styles.forumTitle}>{item.title}</Text>
      <Text style={styles.forumDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {forums.length > 0 ? (
        <FlatList
          data={forums}
          renderItem={renderForum}
          keyExtractor={item => item._id}
        />
      ) : (
        <View style={styles.noForumsContainer}>
          <Text style={styles.noForumsText}>No Forums Available</Text>
          <Text style={styles.noForumsDescription}>
            Create forums to get started
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 10,
  },
  forumCard: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  forumTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forumDescription: {
    color: '#AAA',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: 10,
    backgroundColor: '#400',
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noForumsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noForumsText: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  noForumsDescription: {
    fontSize: 14,
    color: '#AAA',
  },
});

export default HomeScreen;
