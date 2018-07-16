import { createStackNavigator } from 'react-navigation';
import { ChooseUserToAddScreen } from './ChooseUserToAddScreen';
import { AddScreen } from './AddScreen';

export default createStackNavigator(
  {
    AddScreen: {
        screen: AddScreen,
    },
    ChooseUserToAddScreen: {
      screen: ChooseUserToAddScreen,
    },
  },{
    headerMode: 'null',
    initialRouteName: 'AddScreen',
  }
);