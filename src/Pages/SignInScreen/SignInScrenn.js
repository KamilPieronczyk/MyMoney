import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Image } from 'react-native';
import { Text, Button, Icon } from 'native-base'; 
import { Colors } from '../../styles/colors';
//import { Colors } from './../../styles/styles';

export class SignInScreen extends Component {
  constructor(props){
    super(props);
    this.goHome = this.goHome.bind(this);
  }

  goHome() {
    this.props.navigation.navigate('HomeScreen');
  }

  render() {
    return (
      <View style={styles.Container} >

        <View style={styles.NameSection}>
          <Text style={styles.AppName}>MyMoney</Text>
          <Image style={styles.AppLogo} source={require('../../assets/money.png')} />
        </View>

        <View style={styles.ButtonsSection}>
          <View style={styles.ButtonsSize}>
            <Button light block style={styles.Button} onPress={this.goHome}>              
              <Icon name="logo-google" style={styles.logoG} />              
              <Text style={styles.ButtonColor}>ZALOGUJ SIĘ Z GOOGLE</Text>
            </Button>
            <Button light block style={styles.Button} onPress={this.goHome}>
              <Text style={styles.ButtonColor}>WEJDŹ BEZ LOGOWANIA</Text>
            </Button>
          </View>
        </View>   

      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'column',
    height: '100%',
  },
  NameSection: {
    flex: 1,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonsSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  ButtonsSize: {
    width: 225,
    display: 'flex',
  },
  Button: {
    backgroundColor: '#fff',
    marginBottom: 13,
  },
  ButtonColor: {
    color: Colors.primary,
  },
  AppName: {
    fontSize: 45,
    color: Colors.primary,
  },
  AppLogo: {
    marginTop: 30,
  },
  logoG: {
    color: Colors.primary,
    marginRight: 0,
  },
})
