import React, { Component } from 'react';
import { StyleSheet, Alert, BackHandler } from 'react-native';
import { View, Text, Item, Input, Button} from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner }from '../../Components/Spinner';

export class PaymentScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      paymentId: this.props.navigation.getParam('username'),
      amount:  this.props.navigation.getParam('accountId'),
      spinner: false,
    }
    this.db = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('payments');
    this.back = this.back.bind(this);
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.back(); // works best when the goBack is async
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  back(){
    this.props.navigation.navigate('HomeScreen');
  }

  render(){
    return (
      <View style={styles.Container}>        
        
        <Text>Payment Screen</Text>
        
      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    height: '100%',
  },
})
