import { Trophy } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../../components/shared/Header';

const profilePicUrl = "https://s3-alpha-sig.figma.com/img/2048/b3ec/daeb0d2251044e35d7d5e713aa8c23cd?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EV-uzfleFyEzdLIHSAytBL2wLEpDBPR~efzqaAcEurd258Csr3euC1M6u8r50GMU1E6OhSKgFjsiKsiO31nj19z-mKBqb9mse0tIdtUF-Z0oYEtuZ8mpIIUBuz~AcYF95GtLLY6n5flBAKR-JXw2usb7liOkXHweaNUdLDrNhwlnuE1pNNSw1axD7DorgsSpwlO7LdYK9F-TVRGJ~fV0fbOcEl3qrXzzEYmVOUpBmIreBShuXl31gqQJhhvuIlGbkVL~LDfoCosvDkxTIo~7g8EMZsb61uWCsjJyFZfIJeLvcobVf0DWbLBzfgWIKDyvStCmMsMGbg3NLNGlpFtYhA__";

const Leaderboard = () => {

    function getBackground(item){
        let style = [styles.leaderboardItem];

        if(item.rank=="1st"){
            style = [styles.leaderboardItem,{backgroundColor:'#8F1229'}];
        }
        else if(item.rank=="2nd"){
            style = [styles.leaderboardItem,{backgroundColor:'#C0C0C0'}];
        }
        else if(item.rank=="3rd"){
            style = [styles.leaderboardItem,{backgroundColor:'#CDA865'}];
        }
        else{
            style = [styles.leaderboardItem,{backgroundColor:'#B26E6E'}];
        }
        return style
    }
    
    return (
        <View style={styles.container}>
              <Header heading="Leaderboard" />
            {/* User Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: profilePicUrl }} // Replace with actual image URL
                    style={styles.profileImage}
                />
                <Text style={styles.username}>makyismynickname</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Trophy color={'#FFFFFF'} size={22} fill={'#FFFFFF'} />
                        <Text style={styles.infoText}>Rank: 5th</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Image source={require('../../../assets/images/FiveStarBadge.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                        <Text style={styles.infoText}>Badges: 1231 pts</Text>
                    </View>
                </View>
                <View style={[styles.infoBox, { borderRadius: 12 }]} >
                    <Trophy color={'#FFFFFF'} size={22} fill={'#FFFFFF'} />
                    <Text style={styles.pointsBehind}>400 points behind 1st place</Text>
                </View>

            </View>

            {/* Leaderboard List */}
            <ScrollView style={styles.leaderboardList}>
                <View style={{ flexDirection: 'row',paddingHorizontal:10,marginBottom:15 }} >

                    <View style={{flex:1}} >
                        <Text style={{ color: '#868686', fontWeight: '700', fontSize: 18,textAlign:'left' }} >Rank</Text>
                    </View>

                    <View  style={{flex:1}} >
                        <Text style={{ color: '#868686', fontWeight: '700', fontSize: 18,textAlign:'center' }}>Name</Text>

                    </View>
                    <View style={{flex:1}} >

                        <Text style={{ color: '#868686', fontWeight: '700', fontSize: 18,textAlign:'right' }}>Points</Text>
                    </View>
                </View>
                {leaderboardData.map((item, index) => {
                    const highlightStyle = getBackground(item);
                    return(
                    <View
                        key={index}
                        style={highlightStyle}
                    >
                        <Text style={styles.rank}>{item.rank}</Text>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.points}>{item.points}</Text>
                    </View>)
                })}
            </ScrollView>
        </View>
    );
};

const leaderboardData = [
    { rank: '1st', name: 'Stephen Joseph', points: '2,123', avatar: 'https://s3-alpha-sig.figma.com/img/ab82/89aa/3611f103b4e5b0c757815f37fc9741a4?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iPZeiZlDI9cuOksLdcYMKtvkHJYJwSADjcEqsucxajGiKlVQAMjkqOuhUz4A9K6e2SQgCmU9amTd029bpo3NK3Edl0GyC4J2kI1Iqt4MSlHTq8WIg4uPxpFowrUw8OTIpd9JsV6HcSnJrjcns-UGLFFk6EUDrXVEDEvqg1piAGzUbFFZ1KC0-v-~D3~XFDcxqPculJRVaLCV3a1fg-j2ui7~rPMAPxKU3j3JZaUNlieM1lG108AnMYABl-6epKzmNLvKldQSJc-6k3T9xuhbRZM5XZirCOb~MC4YiHNETS1XVOm405zf1bBLG1NggIkmdqIzs5iB7idpvTr1YO~ljA__' },
    { rank: '2nd', name: 'Angelina Warden', points: '2,120', avatar: 'https://s3-alpha-sig.figma.com/img/2048/b3ec/daeb0d2251044e35d7d5e713aa8c23cd?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EV-uzfleFyEzdLIHSAytBL2wLEpDBPR~efzqaAcEurd258Csr3euC1M6u8r50GMU1E6OhSKgFjsiKsiO31nj19z-mKBqb9mse0tIdtUF-Z0oYEtuZ8mpIIUBuz~AcYF95GtLLY6n5flBAKR-JXw2usb7liOkXHweaNUdLDrNhwlnuE1pNNSw1axD7DorgsSpwlO7LdYK9F-TVRGJ~fV0fbOcEl3qrXzzEYmVOUpBmIreBShuXl31gqQJhhvuIlGbkVL~LDfoCosvDkxTIo~7g8EMZsb61uWCsjJyFZfIJeLvcobVf0DWbLBzfgWIKDyvStCmMsMGbg3NLNGlpFtYhA__' },
    { rank: '3rd', name: 'Conway Mathew', points: '1,982', avatar: 'https://s3-alpha-sig.figma.com/img/9849/6593/42149f70cf24b3decb7c986eceddd7e6?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XXmhIOsFwOKDRgF01JqiR~HDT~3PuvOpJw3lZaBCZZGIfWec8Z72RPu4Gb9J8Ki0-U0pg-krq7GF731hQM0HoOkOSe6P-hue5NqJP19pURmGGsxrxq2NBcLKU6n0685B5tXQN~YQiwEk9wOVxfsXU-lahcnc15abskejf0K3Q4CuTTOpcwGNBQMn8tgYQas5yeAl9lqcT0mG8XaA2iqfq1~l-1WKjBhHuti7rEaNCY92-qk1XFqwl75nhnZS2mADatUJuY64Fh46huLBKQCd6I2I2rV-pzbXoeVDt2YhBh4Y5E4UAj2jhX5wHwbiTdW3iTeaeN7HuwFF-bMhS9Gzuw__' },
    { rank: '4th', name: 'Samreen Ranel', points: '1,543', avatar: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8sjb3U3UfZ0WttI0J81E6~1UUl4GKmGX736UT59F8ZmJ3Bfj1RF7nZmOW0UYHsg6atqxVX8JymFtyAS0-ByzCf9w~P9cioFrm0KLoZaMEhzzimFoE266xXPfnCaZsCwwiFPO9CHfktmLxC3tqHvtcbCnmExAxitxNTMKwXL5o-~kD53bSGqbJnkkEZ1FBBUI5~UfraOvrs4vF9SDL7uhKTK0ZeU6hCGkIwoQx6jtZCEspbTg6qVAzEF1Jv49DNW6OdVoLWAUFNWsXpjYzeGZaw~yGtmKaEV~YuddVMbrxq3fam7fBkz8qNEpfgL0lAYTAtQpzWgES2R0jmMmc2dnQ__' },
    { rank: '5th', name: 'makyismynickname', points: '1,231', avatar: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8sjb3U3UfZ0WttI0J81E6~1UUl4GKmGX736UT59F8ZmJ3Bfj1RF7nZmOW0UYHsg6atqxVX8JymFtyAS0-ByzCf9w~P9cioFrm0KLoZaMEhzzimFoE266xXPfnCaZsCwwiFPO9CHfktmLxC3tqHvtcbCnmExAxitxNTMKwXL5o-~kD53bSGqbJnkkEZ1FBBUI5~UfraOvrs4vF9SDL7uhKTK0ZeU6hCGkIwoQx6jtZCEspbTg6qVAzEF1Jv49DNW6OdVoLWAUFNWsXpjYzeGZaw~yGtmKaEV~YuddVMbrxq3fam7fBkz8qNEpfgL0lAYTAtQpzWgES2R0jmMmc2dnQ__' },    { rank: '6th', name: 'makyismynickname', points: '1,231', avatar: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8sjb3U3UfZ0WttI0J81E6~1UUl4GKmGX736UT59F8ZmJ3Bfj1RF7nZmOW0UYHsg6atqxVX8JymFtyAS0-ByzCf9w~P9cioFrm0KLoZaMEhzzimFoE266xXPfnCaZsCwwiFPO9CHfktmLxC3tqHvtcbCnmExAxitxNTMKwXL5o-~kD53bSGqbJnkkEZ1FBBUI5~UfraOvrs4vF9SDL7uhKTK0ZeU6hCGkIwoQx6jtZCEspbTg6qVAzEF1Jv49DNW6OdVoLWAUFNWsXpjYzeGZaw~yGtmKaEV~YuddVMbrxq3fam7fBkz8qNEpfgL0lAYTAtQpzWgES2R0jmMmc2dnQ__' },    { rank: '7th', name: 'makyismynickname', points: '1,231', avatar: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8sjb3U3UfZ0WttI0J81E6~1UUl4GKmGX736UT59F8ZmJ3Bfj1RF7nZmOW0UYHsg6atqxVX8JymFtyAS0-ByzCf9w~P9cioFrm0KLoZaMEhzzimFoE266xXPfnCaZsCwwiFPO9CHfktmLxC3tqHvtcbCnmExAxitxNTMKwXL5o-~kD53bSGqbJnkkEZ1FBBUI5~UfraOvrs4vF9SDL7uhKTK0ZeU6hCGkIwoQx6jtZCEspbTg6qVAzEF1Jv49DNW6OdVoLWAUFNWsXpjYzeGZaw~yGtmKaEV~YuddVMbrxq3fam7fBkz8qNEpfgL0lAYTAtQpzWgES2R0jmMmc2dnQ__' },{ rank: '8th', name: 'makyismynickname', points: '1,231', avatar: 'https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8sjb3U3UfZ0WttI0J81E6~1UUl4GKmGX736UT59F8ZmJ3Bfj1RF7nZmOW0UYHsg6atqxVX8JymFtyAS0-ByzCf9w~P9cioFrm0KLoZaMEhzzimFoE266xXPfnCaZsCwwiFPO9CHfktmLxC3tqHvtcbCnmExAxitxNTMKwXL5o-~kD53bSGqbJnkkEZ1FBBUI5~UfraOvrs4vF9SDL7uhKTK0ZeU6hCGkIwoQx6jtZCEspbTg6qVAzEF1Jv49DNW6OdVoLWAUFNWsXpjYzeGZaw~yGtmKaEV~YuddVMbrxq3fam7fBkz8qNEpfgL0lAYTAtQpzWgES2R0jmMmc2dnQ__' },
    // Additional items...
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', // Dark theme primary color
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    username: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    infoContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    infoBox: {
        backgroundColor: '#8686864A', // Card background color
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25
    },
    infoText: {
        color: '#E5E5E5', // Text primary color
        marginLeft: 5
    },
    pointsBehind: {
        color: '#FFFFFF', // Text secondary color
        fontSize: 14,
        marginLeft: 5
    },
    leaderboardList: {
        flex: 1,
        padding:20
    },
    leaderboardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#383838', // Card border color
        borderRadius: 10,
        marginBottom: 10,
    },
    highlight: {
        backgroundColor: '#FF4C4C', // Highlight color for the user's rank
    },
    rank: {
        color: '#fff',
        width: 40,
        fontSize: 16,
        fontWeight: 'bold',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    name: {
        color: '#fff',
        flex: 1,
        fontSize: 16,
    },
    points: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Leaderboard;
