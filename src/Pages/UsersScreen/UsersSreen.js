import React, { Component } from 'react';
import { StyleSheet, Alert, FlatList } from 'react-native';
import { View, Text, List, ListItem, Right,Body, Icon, ActionSheet, Fab } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner } from '../../Components/Spinner';
import { WalletCard } from '../../Components/WalletCard';

export class UsersScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      accounts: [],
      visible: false,
    }
    let currentUser = firebase.auth().currentUser;
    this.accounts = firebase.firestore().collection('users').doc(currentUser.uid).collection('accounts');
    this.payments = firebase.firestore().collection('users').doc(currentUser.uid).collection('payments');
    this.remotePayments = firebase.firestore().collection('paymentsRooms');
    this.AddUserOpen = this.AddUserOpen.bind(this);    
    this.getUsers = this.getUsers.bind(this);
    this.saldoClear = this.saldoClear.bind(this);
    this.saldoClearAlert = this.saldoClearAlert.bind(this);
    this.pushAccount = this.pushAccount.bind(this);
  }
  ShowActionSheet(accountId, username){
    let BUTTONS = [
      { text: "Wyzeruj saldo", icon: "ios-backspace", iconColor: Colors.red },
      { text: "Edytuj nazwę", icon: "md-create", iconColor: Colors.black },
      // { text: "Połącz z kontem Google", icon: "logo-google", iconColor: Colors.primary },
      { text: "Usuń", icon: "md-trash", iconColor: Colors.red },
      { text: "Zamknij", icon: "close", iconColor: Colors.red }
    ];
    ActionSheet.show({
        options: BUTTONS,
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.saldoClearAlert(accountId);
            break;      
          case 1:
            this.props.navigation.navigate('EditUserNameScreen',{accountId: accountId, username: username})
            break;
          case 2:
            this.props.navigation.navigate('DeleteUserScreen',{accountId: accountId, username: username})
            break;
          default:
            break;
        }
      },    
    );
  }

  AddUserOpen(){
    this.props.navigation.navigate('AddUserScreen');
  }

  componentWillMount(){
    this.getUsers();
  }

  saldoClearAlert(accountId){
    Alert.alert(
      'Potwierdzenie',
      'Czy jesteś pewny, że chcesz wyzerować saldo',
      [
        {text: 'Anuluj'},
        {text: 'Tak', onPress: ()=>{this.saldoClear(accountId)}}
      ],
    )
  }

  saldoClear(accountId){
    this.setState({visible: true});
    this.accounts.doc(accountId).update({saldo: 0}).then(()=>{
      this.setState({visible: false});
    }).catch(()=>{
      this.setState({visible: false});
    })
  }
  
  getUsers(){
    this.accounts.onSnapshot(doc => {
      doc.forEach( account => {
        this.payments.where('accountId','==',account.id).where('deleted','==',false).onSnapshot( payments => {
          let saldo = 0;
          payments.forEach( payment => {
            payment = payment.data();
            if(payment.kind == 'creditor'){
              saldo += payment.status == 'inProgress' ? payment.amount : 0;
            } else {
              saldo += payment.status == 'inProgress' ? -payment.amount : 0;
            }
          })
          this.pushAccount({username: account.data().username,id: account.id, saldo : saldo});
        })  
        if(account.get('type') == 'remote'){
          this.remotePayments.doc(account.get('paymentsRoom')).collection('payments').onSnapshot( payments => {
            let saldo = 0;
            payments.forEach( payment => {
              payment = payment.data();
              if(payment.kind == 'creditor'){
                if(payment.created_by.uid == firebase.auth().currentUser.uid){
                  saldo += payment.status == 'inProgress' ? payment.amount : 0;
                } else {
                  saldo += payment.status == 'inProgress' ? -payment.amount : 0;
                }
              } else {
                if(payment.created_by.uid == firebase.auth().currentUser.uid){
                  saldo += payment.status == 'inProgress' ? -payment.amount : 0;
                } else {
                  saldo += payment.status == 'inProgress' ? +payment.amount : 0;
                }
              }
            })
            saldo = saldo.toPrecision(2);
            this.pushAccount({username: account.data().username,id: account.id, saldo : saldo});
          })
        }      
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

  render(){
    return (
      <View style={styles.Container}>

        <Header title="Konta" />

        
        <List dataArray={this.state.accounts} renderRow={(account) =>
        
          <WalletCard 
            username={account.username}
            saldo={account.saldo}
            onPress={()=>{this.ShowActionSheet(account.id, account.username)}}
          />
          // <ListItem onPress={()=>{this.ShowActionSheet(account.id, account.username)}}>
          //   <Body>
          //     <Text>{account.username}</Text>              
          //     <Text note>{account.saldo} zł</Text>                            
          //   </Body>
          //   <Right>
          //     <Icon name="ios-arrow-forward"/>
          //   </Right>
          // </ListItem>
          }>
        </List>
        
        <MySpinner visible={this.state.visible} />

        <Fab
          direction="up"
          style={{ backgroundColor: Colors.primary }}
          position="bottomRight"
          onPress={this.AddUserOpen}>
          <Icon name="md-add" />
        </Fab>
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


