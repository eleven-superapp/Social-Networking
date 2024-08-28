import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Plus, Trophy, Bell, MessageCircle, User, Home,Award } from 'lucide-react-native';

const CustomTabBar = (props) => {
  const navigation = useNavigation();

  const handleCenterPress = () => {
    const currentRoute = props.state.routeNames[props.state.index];
    if (currentRoute !== 'Home') { 
      props.navigation.navigate('Home');
    } else {
      navigation.navigate('ExpenseScreen');
    }
  };

  // Separate routes into left and right sections
  const leftRoutes = props.state.routes.slice(0, 2); // First two routes (Leaderboard, Updates)
  const rightRoutes = props.state.routes.slice(2); // Last two routes (Chats, Profile)

  const renderIcon = (route, index) => {
    const isFocused = props.state.index === index;

    const onPress = () => {
      const event = props.navigation.emit({
        type: 'tabPress',
        target: route.key,
      });

      if (!isFocused && !event.defaultPrevented) {
        props.navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      props.navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    let IconComponent;
    let label;
    let additionalStyles = {};

    if (route.name === 'Leaderboard') {
      IconComponent = Trophy;
      label = 'Leaderboard';
      additionalStyles = { left: '3%',top: '-6%' };
    } else if (route.name === 'Updates') {
      IconComponent = Bell;
      label = 'Updates';
      additionalStyles = { top: '-20%', right: '25%' };
    } else if (route.name === 'Chats') {
      IconComponent = MessageCircle;
      label = 'Chats';
      additionalStyles = { top: '-20%', left: '30%' };
    } else if (route.name === 'Awards') {
      IconComponent = Award;
      label = 'Awards';
      additionalStyles = { right: '3%',top: '-6%' };
    }

    if (!IconComponent) {
      // console.error(`IconComponent for ${route.name} is undefined`);
      return null;
    }

    return (
      <TouchableOpacity
        key={index}
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.iconTouchable, additionalStyles]}
      >
        <IconComponent color={isFocused ? '#F51F46' : '#ffffff'} size={30} />
        <Text style={{ color: isFocused ? '#F51F46' : '#ffffff', fontSize: 12 }}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const currentRoute = props.state.routeNames[props.state.index];

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.svgContainer}>
        <Svg width="100%" height="140" viewBox="0 0 393 100">
          <Path
            d="M278.929 29.9266L374.931 43.8224C385.55 45.3595 393.429 54.4612 393.429 65.1909V122.846H-0.428894V65.6015C-0.428894 54.6428 7.63287 45.3535 18.4824 43.8106L116.846 29.8222C137.602 26.8705 156.164 42.979 156.164 63.9437C156.164 83.4409 171.969 99.2466 191.466 99.2466H204.323C223.794 99.2466 239.579 83.4619 239.579 63.9906C239.579 43.0193 258.174 26.9224 278.929 29.9266Z"
            fill="#222222"
          />
        </Svg>
      </View>
      <View style={styles.iconSection}>
        {/* Render left side icons */}
        <View style={styles.leftIcons}>
          {leftRoutes.map((route, index) => renderIcon(route, index))}
        </View>

        {/* Center button */}
        <TouchableOpacity onPress={handleCenterPress} style={styles.centerButton}>
          { currentRoute === 'Home' ? <Plus color={'white'} size={45} /> : <Home color={'white'} size={45} /> }
        </TouchableOpacity>

        {/* Render right side icons */}
        <View style={styles.rightIcons}>
          {rightRoutes.map((route, index) => renderIcon(route, index + leftRoutes.length))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 136,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '1%',
  },
  leftIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  rightIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  iconTouchable: {
    alignItems: 'center',
    paddingVertical: 5,
    gap: 2
  },
  centerButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    // right:'50%',
    marginLeft: -30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F51F46',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    borderColor: 'white',
    borderWidth: 3,
    marginBottom: '20%',
  },
});

export default CustomTabBar;
