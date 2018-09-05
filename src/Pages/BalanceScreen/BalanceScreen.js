import React, { Component } from 'react';
import { View, Text } from 'native-base'; 
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Header } from '../../Components/Header';
import firebase from 'react-native-firebase';
import { MySpinner } from '../../Components/Spinner';
import { LineChart } from 'react-native-chart-kit';

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
          let paymentsArray = [];
          payments.forEach( payment => {
            payment = payment.data();
            if(payment.kind == 'creditor'){
              paymentsArray.push(payment.amount);
            } else {
              paymentsArray.push(-payment.amount);
            }
          })
          if(paymentsArray.length > 1)
            this.pushAccount({username: account.data().username,id: account.id,key: account.id, payments: paymentsArray});
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
          <FlatList 
            data={this.state.accounts}
            renderItem={({item}) => (

              <View style={styles.chartBox}>
                <Text style={styles.username}>{item.username}</Text>
                <LineChart
                  data={{
                    datasets: [{
                      data: item.payments
                    }]
                  }}
                  width={Dimensions.get('window').width - 20} // from react-native
                  height={220}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    elevation: 1,
                  }}
                />
              </View>

            )} 
          />      

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
  chartBox: {
    marginBottom: 15,
    marginHorizontal: 10,
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
  }
})

