import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { View, Spinner } from 'native-base'; 
import { Colors } from '../../styles/colors';
import firebase from 'react-native-firebase';

export class LandingScreen extends Component {
  constructor(props){
    super(props);
    StatusBar.setBackgroundColor('#fff');
    StatusBar.setBarStyle('dark-content');
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        user.reload()
        .then()
        .catch(()=>{
          this.props.navigation.navigate('SignInScreen');
        });
        this.props.navigation.navigate('HomeScreen');
      } else {
        this.props.navigation.navigate('SignInScreen');
      }
    })
  }

  render() {
    return (
      <View style={styles.Container} >
        <Spinner color={Colors.primary} />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',    
    height: '100%',
  },  
})
