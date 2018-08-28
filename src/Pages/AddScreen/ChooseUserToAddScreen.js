import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Left, Right, List, ListItem, Radio, Button } from 'native-base'; 
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
    this.setState({ id: id, username: username});
  }

  next(){
    this.props.navigation.navigate('AddScreen',{id: this.state.id, username: this.state.username});
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
      this.setUser(this.state.accounts[0].id,this.state.accounts[0].username);
    })
  }

  render() {
    return (
      <View style={styles.Container}>

          <Header title="Wybierz użytkownika" />      
          
          <List dataArray={this.state.accounts} renderRow={(account) =>
            <ListItem onPress={()=>this.setUser(account.id, account.username)}>
              <Left>                
                <Text>{account.username}</Text>                
              </Left>
              <Right>
                <Radio selectedColor={Colors.primary} selected={(this.state.id == account.id)? true : false}/>
              </Right>
            </ListItem>
            }>
          </List>     
          
          <View style={styles.ButtonContainer}>
            <Button info transparent onPress={this.next}>              
              <Text>Dalej</Text>              
            </Button>
          </View>
          
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
