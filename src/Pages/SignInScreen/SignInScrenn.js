import React, { Component } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { View, Image } from 'react-native';
import { Text, Button, Spinner } from 'native-base'; 
import { Colors } from '../../styles/colors';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
//import { Colors } from './../../styles/styles';

export class SignInScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      buttonClicked: false
    }
    StatusBar.setBackgroundColor('#fff');
    StatusBar.setBarStyle('dark-content');
    this.logWithGoogle = this.logWithGoogle.bind(this);
    this.Anonymous = this.Anonymous.bind(this);
  }

  async logWithGoogle(){
    this.setState({buttonClicked: true});
    try {
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
      firebase.auth().currentUser.reload();
      this.setState({buttonClicked: false});
    } catch (e) {
      console.error(e);
      this.setState({buttonClicked: false});
    }    
  }

  Anonymous (){
    this.setState({buttonClicked: true});
    firebase.auth().signInAnonymously()
    .then(()=>{
      this.setState({buttonClicked: false});
      firebase.auth().currentUser.reload();
    });
  }

  render() {
    let load;
    if(this.state.buttonClicked){
      load = <Spinner color={Colors.primary} style={{marginTop: 20}} />
    } else {
      load = null;
    }
    return (
      <View style={styles.Container} >

        <View style={styles.NameSection}>
          <Text style={styles.AppName}>MyMoney</Text>
          <Image style={styles.AppLogo} source={require('../../assets/money.png')} />
        </View>

        <View style={styles.ButtonsSection}>
          <View style={styles.ButtonsSize}>
            <GoogleSigninButton
              style={{ width: 225, height: 48, marginBottom: 13 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.logWithGoogle}/>
            <Button light block transparent style={styles.Button} onPress={this.Anonymous}>
              <Text style={styles.ButtonColor}>WEJDŹ BEZ LOGOWANIA</Text>
            </Button>
            {load}
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
