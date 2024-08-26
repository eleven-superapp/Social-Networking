import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/mainScreens/HomeScreen';
import CommentScreen from '../screens/mainScreens/CommentScreen';
import ReplyScreen from '../screens/mainScreens/ReplyScreen';

const Stack = createStackNavigator();
const MainScreensNavigation = ()=>{
    return(
        <Stack.Navigator
        initialRouteName='Home'
        >
            <Stack.Screen name='Home' component={HomeScreen}
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name='Comment' component={CommentScreen} />
            <Stack.Screen name='Reply' component={ReplyScreen} />
        </Stack.Navigator>
    )
}

export default MainScreensNavigation;