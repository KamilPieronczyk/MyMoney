import React, { Component } from 'react';
import { ScrollView, ProgressBarAndroid } from 'react-native';
import { View, Text, List } from 'native-base'; 
import { PaymentItem } from '../../Components/PaymentItem';
import { StyleSheet } from 'react-native';
import { Header } from './../../Components/Header';
import {MySpinner} from './../../Components/Spinner';
import firebase from 'react-native-firebase';

export class HomeScreen extends Component {  
  constructor(){
    super();
    this.state = {
      payments: [],
      prograssBar: true,
    }
    this.getPayments = this.getPayments.bind(this);

    let currentUser = firebase.auth().currentUser;
    this.payments = firebase.firestore().collection('users').doc(currentUser.uid).collection('payments');
  }

  componentWillMount(){
    this.getPayments();
  }

  getPayments(){
    this.payments.orderBy('date','desc').onSnapshot(docs => {
      let payments = [];
      docs.forEach( payment => {
        payments.push({...payment.data(),id: payment.id});
      })
      this.setState({prograssBar: false});
      this.setState({payments});
    })
  }

  render() {
    return (
      <View style={{height: '100%'}}> 
        <Header title="Płatności" />
        <ScrollView style={styles.Container} >          

          <MySpinner visible={this.state.prograssBar} />
          
          <List dataArray={this.state.payments} renderRow={(payment) =>
            <PaymentItem
              id={payment.id}
              title={payment.title}
              kind={payment.kind}
              date={payment.date}
              accountName={payment.accountName}
              amount={payment.amount}
              accountId={payment.accountId}
              status={payment.status}
             />
            }>
          </List>
          
        </ScrollView>
      </View>      
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    display: 'flex',
    paddingHorizontal: 14,
    paddingTop: 5,
    height: '100%',
  }
})