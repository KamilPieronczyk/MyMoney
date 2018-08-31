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
  }

  componentWillMount(){
    this.getPayments();
  }

  getPayments(){
    this.payments.orderBy('date','desc').onSnapshot(docs => {
      let payments = [];
      docs.forEach( payment => {
        payments.push({...payment.data(),id: payment.id,key: payment.id});
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
             />
            }
            ListEmptyComponent={              
              <Text style={styles.ListEmptyText} >Aktualnie nie masz żadnych płatności</Text>              
            }>
          </FlatList>

          <View style={styles.PaymentContainer} >
            <View style={styles.LeftSide}>              
              <Text style={styles.paymentUsername} >Mama</Text>
              <Text style={styles.paymentTitle} >Tytuł</Text>              
            </View>
            <View style={styles.RightSide}>              
              <Text style={styles.paymentAmount} >15 zł</Text>              
            </View>
          </View>

          <View style={[styles.PaymentContainer,styles.paymentCompleted]} >
            <View style={styles.LeftSide}>              
              <Text style={styles.paymentUsername} >Mama</Text>
              <Text style={styles.paymentTitle} >Tytuł</Text>              
            </View>
            <View style={styles.RightSide}>              
              <Text style={styles.paymentAmount} >15 zł</Text>              
            </View>
          </View>
          
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
  paymentCompleted: {
    backgroundColor: Colors.green,
    elevation: 4,
  },
  PaymentContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    elevation: 2,
    borderRadius: 0,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  LeftSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  RightSide: {
    flex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paymentUsername: {
    fontSize: 18,
  },
  paymentTitle: {
    fontSize: 14,
  },
  paymentAmount: {
    fontSize: 18,
    textAlign: 'right',
  }
})