import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import Header from '../../components/shared/Header';
import { ArrowRight, Trophy } from 'lucide-react-native';

const achievements = [
    {
        id: 1,
        imgPath: require('../../../assets/images/GoldMedal.png'),
        title: 'Congratulations!',
        description: 'You have completed your weekly goal and consumed 20% less nicotine as usual.',
    },
    {
        id: 2,
        imgPath: require('../../../assets/images/GoldMedal.png'),
        title: 'Congratulations!',
        description: 'You have completed your weekly goal and consumed 20% less nicotine as usual.',
    },
];

const girlImgUrl = "https://s3-alpha-sig.figma.com/img/4b64/2b31/3e9a4be7c5317ed69c25259c18e36700?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nafjvoKvID9B6EOzS7CFw9~8-uTKGplXEx0GLgHqZT9QBY2dqtRlQUh7MXqLNRAeM7IoMxsL7HrUFCn1UEBead49hRlIKsHM8Kwlok1g1sfT2k7MVeexBnR534AYbklbzES7pOzT0TlTy3O3TohE6pnEDmCGVut~jsUBl6B3-3nWQdyHNMkdty7VCRxNyRE59NoUUXlYngX0LWeEVqQ2aQPEvNsRq8la7Ne35B4luJsqPQMO0eiz4pGHSj-SheUhR43997j-1HNOS-c-NDVdP-owWyimBZ4~KOot5~23XQIdYt-3KarsjytWPwdZgz1uNwvF9yMDTch1FZiVGAU46w__";

const othersStories = [
    {
        id: 1,
        image: girlImgUrl,
        title: 'Congratulations!',
        description: 'You have completed your weekly goal and consumed 20% less nicotine as usual.',
        backgroundColor: '#002244',
        imgViewBackgroundColor: '#3066BE1A'
    },
    {
        id: 2,
        image: girlImgUrl,
        title: 'Congratulations!',
        description: 'You have completed your weekly goal and consumed 20% less nicotine as usual.',
        backgroundColor: '#23F65E1A',
        imgViewBackgroundColor: '#23F65E1A'
    },
    {
        id: 3,
        image: girlImgUrl,
        title: 'Congratulations!',
        description: 'You have completed your weekly goal and consumed 20% less nicotine as usual.',
        backgroundColor: '#442200',
        imgViewBackgroundColor:'#C88B4463'
    },
];

const profileUrl = "https://s3-alpha-sig.figma.com/img/6bca/b7d8/48c29ae3985c5658cf7a79702acf04ae?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B8sjb3U3UfZ0WttI0J81E6~1UUl4GKmGX736UT59F8ZmJ3Bfj1RF7nZmOW0UYHsg6atqxVX8JymFtyAS0-ByzCf9w~P9cioFrm0KLoZaMEhzzimFoE266xXPfnCaZsCwwiFPO9CHfktmLxC3tqHvtcbCnmExAxitxNTMKwXL5o-~kD53bSGqbJnkkEZ1FBBUI5~UfraOvrs4vF9SDL7uhKTK0ZeU6hCGkIwoQx6jtZCEspbTg6qVAzEF1Jv49DNW6OdVoLWAUFNWsXpjYzeGZaw~yGtmKaEV~YuddVMbrxq3fam7fBkz8qNEpfgL0lAYTAtQpzWgES2R0jmMmc2dnQ__";

const AwardScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Header heading="Awards" />

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: profileUrl }}
                    style={styles.profileImage}
                />
                <View style={styles.profileDetails}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.profileName}>Siber Koza</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: '5%' }}>
                            <Trophy color={'#FFFFFF'} size={14} fill={'white'} />
                            <Text style={styles.profileRank}>Rank: 5th</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../../../assets/images/FiveStarBadge.png')} style={{ height: 20, width: 20 }} resizeMode='contain' />
                        <Text style={styles.profileBadge}>Badges: 1231 pts</Text>
                    </View>
                </View>
            </View>

            {/* Achievements Section */}
            <Text style={styles.sectionTitle}>Your Achievements</Text>
            {achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementContainer}>
                    <View style={styles.achievementCard}>
                        <Image source={achievement.imgPath} style={styles.achievementIcon} />
                        <View style={styles.achievementTextContainer}>
                            <Text style={styles.achievementTitle}>{achievement.title}</Text>
                            <Text style={styles.achievementDescription}>{achievement.description}</Text>
                            <View style={styles.shareButtonContainer}>
                                <Text style={styles.shareButton}>Share with community</Text>
                                <TouchableOpacity style={styles.shareButtonIcon}>
                                    <ArrowRight color={'black'} size={22} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            ))}

            {/* Other's Story Section */}
            <Text style={styles.sectionTitle}>Other's Story</Text>
            {othersStories.map((story) => (
                <View key={story.id} style={[styles.storyCard, { backgroundColor: story.backgroundColor }]}>
                    <View style={{backgroundColor:story.imgViewBackgroundColor,padding:10,borderColor:'#F51F4624',borderWidth:1}} >
                        <Image source={{ uri: story.image }} style={styles.storyImage} />
                    </View>

                    <View style={styles.storyText}>
                        <Text style={styles.storyTitle}>{story.title}</Text>
                        <Text style={styles.storyDescription}>{story.description}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        // paddingHorizontal: 16,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    profileDetails: {
        marginLeft: 16,
    },
    profileName: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    profileBadge: {
        color: '#fff',
        marginTop: 4,
    },
    profileRank: {
        color: '#FFFFFF',
        fontWeight: '400',
        marginLeft: 4,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginVertical: 8,
        borderBottomColor: '#494949',
        borderBottomWidth: 1,
        paddingBottom: 6,
        marginHorizontal:16,
        paddingHorizontal:8
    },
    achievementContainer: {
        backgroundColor: '#F51F463D',
        borderColor: '#F51F46',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal:16
    },
    achievementCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    achievementIcon: {
        width: 80,
        height: 80,
    },
    achievementTextContainer: {
        flex: 1,
        marginLeft: 16,
    },
    achievementTitle: {
        fontSize: 17,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    achievementDescription: {
        color: '#FFFFFF',
        marginTop: 4,
    },
    shareButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        justifyContent: 'flex-end'
    },
    shareButton: {
        color: '#fff',
        fontWeight: 'bold',
    },
    shareButtonIcon: {
        backgroundColor: '#FFFFFFCC',
        paddingHorizontal: 8,
        borderRadius: 12,
        marginLeft: 10,
    },
    storyCard: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 20,
        marginTop:10,
        alignItems: 'center',
        borderColor:'#F51F4624',
        borderWidth:1,
        marginHorizontal:16
    },
    storyImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    storyText: {
        flex: 1,
        marginLeft: 16,
    },
    storyTitle: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    storyDescription: {
        color: '#fff',
        marginTop: 4,
    },
});

export default AwardScreen;
