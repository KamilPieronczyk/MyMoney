import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Body, Right, List, ListItem, Button, Icon } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/colors';
import firebase from 'react-native-firebase';

export class ChooseUserToAddScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      accounts: [],
      id: null,
      username: null,
    }
    this.setUser = this.setUser.bind(this);
    this.next = this.next.bind(this);
    this.getUsers = this.getUsers.bind(this);

    let currentUser = firebase.auth().currentUser;
    this.db = firebase.firestore().collection('users').doc(currentUser.uid).collection('accounts');
  }

  setUser = (id, username) => {
    setTimeout(() => {
      this.props.navigation.navigate('AddScreen',{id: id, username: username});
    }, 50);
  }

  next(){
    this.props.navigation.push('AddScreen',{id: this.state.id, username: this.state.username});
  }

  componentWillMount(){
    this.getUsers();    
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

  render() {
    return (
      <View style={styles.Container}>

          <Header title="Wybierz użytkownika" />      
          
          <List dataArray={this.state.accounts} renderRow={(account) =>
            <ListItem onPress={()=>this.setUser(account.id, account.username)}>
              <Body>
                <Text>{account.username}</Text>                                   
              </Body>
              <Right>
                <Icon name="ios-arrow-forward"/>
              </Right>
            </ListItem>
            }>
          </List>     
          
      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  ButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  }
})
