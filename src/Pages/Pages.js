import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './HomeScreen/HomeScreen';
import { SignInScreen } from './SignInScreen/SignInScrenn';
import { AddScreen } from './AddScreen/AddScreen';
import { BalanceScreen } from './BalanceScreen/BalanceScreen'; 
import { UsersScreen } from './UsersScreen/UsersSreen';
import { AddScreenStack } from './AddScreen/AddScreenStack';
import { LandingScreen } from './LandingScreen/LandingScreen';
import { AddUserScreen } from './AddUserScreen/AddUserScreen';

const UsersStack = createStackNavigator(
    {
        UsersScreen: {
        screen: UsersScreen,
        },
        AddUserScreen: {
        screen: AddUserScreen,
        },
    },{
        headerMode: 'null',
        initialRouteName: 'UsersScreen',
    }
);
 
export {
    HomeScreen,
    SignInScreen,    
    AddScreen,
    BalanceScreen,
    UsersScreen,
    AddScreenStack,
    LandingScreen,
    AddUserScreen,
    UsersStack
};