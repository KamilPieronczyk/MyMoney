import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { View, Text, List, Tabs, Tab, TabHeading, Icon } from 'native-base'; 
import { PaymentItem } from '../../Components/PaymentItem';
import { StyleSheet } from 'react-native';
import { Header } from './../../Components/Header';
import { MySpinner } from './../../Components/Spinner';
import { WalletCard } from '../../Components/WalletCard';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';

export class HomeScreen extends Component {  
  constructor(){
    super();
    this.state = {
      payments: [],
      remotePayments: [],
      prograssBar: true,
      prograssBar2: true,
    }
    this.getPayments = this.getPayments.bind(this);

    let currentUser = firebase.auth().currentUser;
    this.payments = firebase.firestore().collection('users').doc(currentUser.uid).collection('payments');
    this.openPaymentScreen = this.openPaymentScreen.bind(this);
    this.openRemotePaymentScreen = this.openRemotePaymentScreen.bind(this);
  }

  componentDidMount(){
    this.getPayments();
    this.getRemotePayments();
  }

  getPayments(){
    this.payments.orderBy('date','desc').onSnapshot(docs => {
      let payments = [];
      docs.forEach( payment => {
        if(!payment.data().deleted)
          payments.push({...payment.data(),id: payment.id,key: payment.id});        
      })
      this.setState({prograssBar: false});
      this.setState({payments});
    }, error => {
      this.setState({prograssBar: false});
    })
  }

  getRemotePayments(){
    const accounts = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('accounts');
    const PaymentsRef = firebase.firestore().collection('paymentsRooms');
    accounts.where('type','==','remote').onSnapshot( docs => {
      docs.forEach( account => {
        const paymentRoomId = account.get('paymentsRoom');
        const accountName = account.get('username');
        PaymentsRef.doc(paymentRoomId).collection('payments').orderBy('date','asc').onSnapshot( payments => {
          payments.docChanges.forEach( changePayment => {
            switch (changePayment.type) {
              case 'added':
                this.addOrModifyRemotePayments({...changePayment.doc.data(),id: changePayment.doc.id, username: accountName, paymentRoomId});
                break;
              case 'modified':
                this.addOrModifyRemotePayments({...changePayment.doc.data(),id: changePayment.doc.id, username: accountName, paymentRoomId});
                break;
              case 'removed':
                this.removeRemotePayment(changePayment.doc.id);
                break;
            }
          })
        })
      })
    })
  }

  /**
   * @description Adding adm modifying remote payment
   * @param {payment} payment 
   */
  addOrModifyRemotePayments(payment){
    const paymentsArray = this.state.remotePayments;
    let exists = false;
    let paymentsTemp = paymentsArray.map(paymentElement => {
      if(paymentElement.id == payment.id){
        exists = true;
        return payment;
      } else {
        return paymentElement;
      }
    });
    if(!exists) paymentsTemp.unshift(payment);
    this.setState({remotePayments: paymentsTemp});
    if(exists && payment.deleted == true) this.removeRemotePayment(payment.id);
  }

  /**
   * @description Remove remote payment from state 
   * @param {payment} paymentId 
   */
  removeRemotePayment(paymentId){
    const paymentsArray = this.state.remotePayments;
    let paymentsTemp = paymentsArray.filter(paymentElement => {
      return paymentElement.id != paymentId;
    });
    this.setState({remotePayments: paymentsTemp});
  }

  openPaymentScreen(payment){
    this.props.navigation.push('PaymentScreen',{...payment});
  }

  openRemotePaymentScreen(payment){
    this.props.navigation.push('RemotePaymentScreen',{...payment});
  }

  _renderLocalPayments(){
    return(
      <ScrollView style={styles.Container} >          

        <MySpinner visible={this.state.prograssBar} />
        
        <FlatList data={this.state.payments} renderItem={({item}) =>
          <PaymentItem
            id={item.id}
            title={item.title}
            kind={item.kind}
            date={item.date}
            accountName={item.accountName}
            amount={item.amount}
            accountId={item.accountId}
            status={item.status}
            onPress={()=>{this.openPaymentScreen(item)}}
            />
          }
          ListEmptyComponent={              
            <Text style={styles.ListEmptyText} >Aktualnie nie masz żadnych płatności</Text>              
          }>
        </FlatList>
        
      </ScrollView>
    )
  }

  _keyExtractor = (item) => item.id;

  _renderRemotePayments(){
    return(
      <ScrollView style={styles.Container} >          

        <MySpinner visible={this.state.prograssBar} />
        
        <FlatList data={this.state.remotePayments} extraData={this.state} keyExtractor={this._keyExtractor} renderItem={({item}) =>
          <PaymentItem
            id={item.id}
            title={item.title}
            kind={item.kind}
            date={item.date}
            accountName={item.username}
            amount={item.amount}
            accountId={item.receiver}
            status={item.status}
            onPress={()=>{this.openRemotePaymentScreen(item)}}
            />
          }
          ListEmptyComponent={              
            <Text style={styles.ListEmptyText} >Aktualnie nie masz żadnych płatności</Text>              
          }>
        </FlatList>
        
      </ScrollView>
    )
  }

  render() {
    return (
      <View style={{height: '100%'}}> 
        <Header title="Płatności" />
        <Tabs tabBarUnderlineStyle={{backgroundColor:'#333'}}>
          <Tab 
           style={{elevation: 0}}
           tabStyle={{backgroundColor: '#fff'}} 
           activeTabStyle={{backgroundColor: '#fff'}}
           activeTextStyle={{color: '#333'}}
           heading="Lokalne">
            {this._renderLocalPayments()}
          </Tab>
          <Tab 
           tabStyle={{backgroundColor: '#fff'}} 
           activeTabStyle={{backgroundColor: '#fff'}}
           activeTextStyle={{color: '#333'}}
           heading="Współdzielone">
            {this._renderRemotePayments()}
          </Tab>
        </Tabs>
      </View>      
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    display: 'flex',
    paddingTop: 5,
    height: '100%',
  },
  ListEmptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
  },
})