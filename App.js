import { createStackNavigator } from 'react-navigation';
import HomeTabs from './src/Pages/HomeTabs/HomeTabs';
import { SignInScreen, LandingScreen } from './src/Pages/Pages';

export default createStackNavigator(
  {
    LandingScreen: {
      screen: LandingScreen,
    },
    SignInScreen: {
      screen: SignInScreen,
    },
    HomeScreen: {
      screen: HomeTabs,
    },
  },{
    headerMode: 'null',
    initialRouteName: 'LandingScreen',
  }
);

