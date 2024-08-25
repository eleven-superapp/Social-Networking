import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Header from '../components/shared/Header';


export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Header/>
            <Text>Leaderboard screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    }
});
