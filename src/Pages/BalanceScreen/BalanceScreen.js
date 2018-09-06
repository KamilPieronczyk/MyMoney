import React, { Component } from 'react';
import { View, Text } from 'native-base'; 
import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Header } from '../../Components/Header';
import firebase from 'react-native-firebase';
import { MySpinner } from '../../Components/Spinner';
import { LineChart, BarChart } from 'react-native-chart-kit';

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
        this.payments.orderBy('date','desc').where('accountId','==',account.id).where('deleted','==',false).onSnapshot( payments => {
          let paymentsArray = [];
          let labelsArray = [];
          payments.forEach( payment => {
            payment = payment.data();
            if(payment.kind == 'creditor'){
              paymentsArray.push(payment.amount);
            } else {
              paymentsArray.push(-payment.amount);
            }
            let date = new Date(payment.date)
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            let month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            labelsArray.push(`${day}.${month}`);
          })
          if(paymentsArray.length > 1)
            this.pushAccount({username: account.data().username,id: account.id,key: account.id, payments: paymentsArray, labels: labelsArray});
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
            style={styles.FlatList}
            data={this.state.accounts}
            renderItem={({item}) => (

              <View style={styles.chartBox}>
                <Text style={styles.username}>{item.username}</Text>
                <BarChart                  
                  data={{
                    labels: item.labels,
                    datasets: [{
                      data: item.payments
                    }]
                  }}
                  width={Dimensions.get('window').width - 20} // from react-native
                  height={220}
                  chartConfig={{
                    backgroundColor: '#ffffff',
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
  },
  FlatList: {
    marginTop: 10,
  }
})

