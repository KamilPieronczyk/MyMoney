import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, List, ListItem, Right,Body, Icon, ActionSheet, Fab } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner } from '../../Components/Spinner';

export class UsersScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      accounts: [],
      visible: false,
    }
    let currentUser = firebase.auth().currentUser;
    this.db = firebase.firestore().collection('users').doc(currentUser.uid).collection('accounts');
    this.AddUserOpen = this.AddUserOpen.bind(this);    
    this.getUsers = this.getUsers.bind(this);
    this.saldoClear = this.saldoClear.bind(this);
    this.saldoClearAlert = this.saldoClearAlert.bind(this);
  }
  ShowActionSheet(accountId, username){
    let BUTTONS = [
      { text: "Wyzeruj saldo", icon: "ios-backspace", iconColor: Colors.red },
      { text: "Edytuj nazwę", icon: "md-create", iconColor: Colors.black },
      { text: "Połącz z kontem Google", icon: "logo-google", iconColor: Colors.primary },
      { text: "Usuń", icon: "md-trash", iconColor: Colors.red },
      { text: "Zamknij", icon: "close", iconColor: Colors.red }
    ];
    ActionSheet.show({
        options: BUTTONS,
        cancelButtonIndex: 4,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.saldoClearAlert(accountId);
            break;      
          case 1:
            this.props.navigation.navigate('EditUserNameScreen',{accountId: accountId, username: username})
            break;
          case 3:
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
    this.db.doc(accountId).update({saldo: 0}).then(()=>{
      this.setState({visible: false});
    }).catch(()=>{
      this.setState({visible: false});
    })
  }
  
  getUsers(){
    this.db.onSnapshot(doc => {
      let accounts = [];
      doc.forEach( account => {
        accounts.push({...account.data(),id: account.id});
      });
      this.setState({accounts});
    })
  }

  render(){
    return (
      <View style={styles.Container}>

        <Header title="Konta" />

        
        <List dataArray={this.state.accounts} renderRow={(account) =>
          <ListItem onPress={()=>{this.ShowActionSheet(account.id, account.username)}}>
            <Body>
              <Text>{account.username}</Text>              
              <Text note>{account.saldo} zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
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


