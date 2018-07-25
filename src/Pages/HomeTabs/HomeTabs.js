import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { StatusBar, StyleSheet } from 'react-native';
import { HomeScreen, BalanceScreen, UsersScreen, UsersStack} from '../Pages';
import AddScreenStack from '../AddScreen/AddScreenStack';
import { Footer, FooterTab, Button, Icon, Text, Root } from 'native-base';

const HomeTabs = TabNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    BalanceScreen: { screen: BalanceScreen },
    UsersStack: { screen: UsersStack },
    AddScreenStack: { screen: AddScreenStack },
  },
  {
    tabBarPosition: "bottom",
    initialRouteName: 'HomeScreen',
    swipeEnabled: true,
    tabBarComponent: props => {
      StatusBar.setBackgroundColor('#fff');
      StatusBar.setBarStyle('dark-content');
      return (
        <Footer style={{height: 45}}>
          <FooterTab style={{backgroundColor: '#fff'}}>
            <Button
              onPress={() => props.navigation.navigate("HomeScreen")}>
              {props.navigationState.index === 0 ? 
                <Icon name="ios-cash" style={styles.active}/> 
              :
                <Icon name="ios-cash" style={styles.disactive} />   
              }
            </Button>
            <Button
              onPress={() => props.navigation.navigate("BalanceScreen")}>
              {props.navigationState.index === 1 ? 
                <Icon name="md-filing"style={styles.active} /> 
              :
                <Icon name="md-filing" style={styles.disactive} />   
              }
            </Button>
            <Button
              onPress={() => props.navigation.navigate("UsersStack")}>
              {props.navigationState.index === 2 ? 
                <Icon name="md-people" style={styles.active}/> 
              :
                <Icon name="md-people" style={styles.disactive} />   
              }
            </Button>
            <Button
              onPress={() => props.navigation.navigate("AddScreenStack")}>
              {props.navigationState.index === 3 ? 
                <Icon name="logo-usd" style={styles.active}/> 
              :
                <Icon name="logo-usd" style={styles.disactive} />   
              }
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
);

export default class HomeTabsContainer extends React.Component {
  render(){
    return(
      <Root>
        <HomeTabs />
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  active: {
    color: '#0077FF',
  },
  disactive: {
    color: '#333',
  }
});

// export { HomeTabs };
