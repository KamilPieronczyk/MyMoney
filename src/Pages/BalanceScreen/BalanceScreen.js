import React, { Component } from 'react';
import { View, Text } from 'native-base'; 
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Header } from '../../Components/Header';
import firebase from 'react-native-firebase';
import { MySpinner } from '../../Components/Spinner';

export class BalanceScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      accounts: []
    }
    let currentUser = firebase.auth().currentUser;
    this.accounts = firebase.firestore().collection('users').doc(currentUser.uid).collection('accounts');
    this.payments = firebase.firestore().collection('users').doc(currentUser.uid).collection('payments');
    this.getUsers = this.getUsers.bind(this);
    this.pushAccount = this.pushAccount.bind(this);
  }

  componentWillMount(){
    this.getUsers();
  }

  getUsers(){
    this.accounts.onSnapshot(doc => {
      doc.forEach( account => {
        this.payments.where('accountId','==',account.id).where('deleted','==',false).onSnapshot( payments => {
          let saldo = 0;
          let paymentsArray = [];
          payments.forEach( payment => {
            payment = payment.data();
            if(payment.kind == 'creditor'){
              paymentsArray.push(payment.amount);
              saldo += payment.amount;
            } else {
              paymentsArray.push(-payment.amount);
              saldo -= payment.amount;
            }
          })
          this.pushAccount({username: account.data().username,id: account.id,key: account.id, saldo : saldo, payments: paymentsArray});
        })        
      });      
    })
  }

  pushAccount(newAccount){
    let accounts = this.state.accounts;
    let exists = false;
    accounts = accounts.map( account => {
      if(account.hasOwnProperty('id') && account.id == newAccount.id) {
        exists = true;
        return newAccount;
      } else {
        return account;
      }
    })
    if (!exists) accounts.push(newAccount);
    this.setState({accounts});
  }

  render() {
    return (
      <View style={styles.Container}>
          <Header title="Bilans" />
          {/* <LineChart
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                  datasets: [{
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ]
                  }]
                }}
                width={Dimensions.get('window').width} // from react-native
                height={220}
                chartConfig={{
                  backgroundColor: '#e26a00',
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                style={{
                  marginVertical: 10,
                }}
              /> */}

          {/* <BalanceUserItem username="Mama" amount="-100,24" details={[-50,-20,-30,80,125,684]}/>
          <BalanceUserItem username="Mama" amount="-100,24" details={[-50,-20,684]}/>
          <BalanceUserItem username="Mama" amount="-100,24" details={[-50,-20,-30,80,125,684,-25,-84]}/> */}
          
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

