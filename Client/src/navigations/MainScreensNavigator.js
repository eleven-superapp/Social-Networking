import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import CommentScreen from '../screens/mainScreens/CommentScreen';
import ReplyScreen from '../screens/mainScreens/ReplyScreen';
import addForum from '../screens/mainScreens/addForum';
const Stack = createStackNavigator();
const MainScreensNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddForum" component={addForum} />
    </Stack.Navigator>
  );
};

export default MainScreensNavigation;
