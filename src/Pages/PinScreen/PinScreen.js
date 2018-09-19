import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Body, Right, Button, Icon } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/colors';
import firebase from 'react-native-firebase';
import { MySpinner } from './../../Components/Spinner';


export class PinScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      pin: null,
      spinner: false,
    }

    let currentUser = firebase.auth().currentUser;
    this.user = firebase.firestore().collection('users').doc(currentUser.uid);

    this.refreshPIN = firebase.functions().httpsCallable('refreshPIN');

    this.user.get().then( doc => {
      this.setState({pin: doc.data().key});
    })

    this._refreshPIN = this._refreshPIN.bind(this);

  }

  back(){
    this.props.navigation.push('AddScreen',{id: this.state.id, username: this.state.username});
  }

  _refreshPIN(){
    this.setState({spinner: true});
    this.refreshPIN().then(({data}) => {
      this.setState({pin: data.key, spinner: false})
    }).catch(()=>{
      this.setState({spinner: false});
    })
  }

  render() {
    return (
      <View style={styles.Container}>

          <Header title="Udostępnij konto" />     

          <View style={styles.PinContainer}>
            <View style={styles.PinSmallContainer}>
              <Text style={styles.Pin} >PIN:</Text>
              <Text style={styles.Pin} >{this.state.pin}</Text>
            </View>
          </View>

          <View style={styles.ButtonsContainer} >            
            <Button transparent info onPress={this._refreshPIN} >
              <Text>
                Odświerz kod pin
              </Text>
            </Button>            
          </View>

          <MySpinner visible={this.state.spinner} />
          
      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  ButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  PinContainer: {
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  PinSmallContainer: {
  },
  Pin: {
    fontSize: 45,
    color: '#598FBA',
    textAlign: 'center',
  },
  ButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  }
})
