import { createStackNavigator } from 'react-navigation';
import { HomeTabs } from './src/Pages/HomeTabs/HomeTabs';
import { SignInScreen } from './src/Pages/Pages';

export default createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen,
    },
    HomeScreen: {
      screen: HomeTabs,
    },
  },{
    headerMode: 'null',
    initialRouteName: 'HomeScreen',
  }
);