import { createStackNavigator } from 'react-navigation';
import { HomeScreen } from './HomeScreen/HomeScreen';
import { SignInScreen } from './SignInScreen/SignInScrenn';
import { AddScreen } from './AddScreen/AddScreen';
import { BalanceScreen } from './BalanceScreen/BalanceScreen'; 
import { UsersScreen } from './UsersScreen/UsersSreen';
import { AddScreenStack } from './AddScreen/AddScreenStack';
import { LandingScreen } from './LandingScreen/LandingScreen';
import { AddUserScreen } from './AddUserScreen/AddUserScreen';
import { EditUserNameScreen } from './UsersScreen/EditUserName';
import { DeleteUserScreen } from './UsersScreen/DeleteUserScreen';

const UsersStack = createStackNavigator(
    {
        UsersScreen: {
            screen: UsersScreen,
        },
        AddUserScreen: {
            screen: AddUserScreen,
        },
        EditUserNameScreen: {
            screen: EditUserNameScreen,
        },
        DeleteUserScreen: {
            screen: DeleteUserScreen,
        }
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