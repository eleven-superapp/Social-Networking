import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import CommentScreen from '../screens/mainScreens/CommentScreen';
import ReplyScreen from '../screens/mainScreens/ReplyScreen';

const Stack = createStackNavigator();
const MainScreensNavigation = ()=>{
    return(
        <Stack.Navigator
        initialRouteName='Home Screen'
        >
            <Stack.Screen name='Home Screen' component={HomeScreen}
            options={{
                headerShown:false
            }}
            />
        </Stack.Navigator>
    )
}

export default MainScreensNavigation;