import React, { Component } from 'react';
import { ScrollView, FlatList } from 'react-native';
import { View, Text, List } from 'native-base'; 
import { PaymentItem } from '../../Components/PaymentItem';
import { StyleSheet } from 'react-native';
import { Header } from './../../Components/Header';
import { MySpinner } from './../../Components/Spinner';
import { Colors } from '../../styles/styles';
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
    this.openPaymentScreen = this.openPaymentScreen.bind(this);
  }

  componentWillMount(){
    this.getPayments();
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

  openPaymentScreen(payment){
    this.props.navigation.push('PaymentScreen',{...payment});
  }

  render() {
    return (
      <View style={{height: '100%'}}> 
        <Header title="Płatności" />
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
  },
  ListEmptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
  },
})