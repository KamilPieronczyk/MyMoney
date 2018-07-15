import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { StatusBar, StyleSheet } from 'react-native';
import { HomeScreen, BalanceScreen, UsersScreen, AddScreen } from '../Pages';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

const HomeTabs = TabNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    BalanceScreen: { screen: BalanceScreen },
    UsersScreen: { screen: UsersScreen },
    AddScreen: { screen: AddScreen },
  },
  {
    tabBarPosition: "bottom",
    initialRouteName: 'BalanceScreen',
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
              onPress={() => props.navigation.navigate("UsersScreen")}>
              {props.navigationState.index === 2 ? 
                <Icon name="md-people" style={styles.active}/> 
              :
                <Icon name="md-people" style={styles.disactive} />   
              }
            </Button>
            <Button
              onPress={() => props.navigation.navigate("AddScreen")}>
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

const styles = StyleSheet.create({
  active: {
    color: '#0077FF',
  },
  disactive: {
    color: '#333',
  }
});

export { HomeTabs };
