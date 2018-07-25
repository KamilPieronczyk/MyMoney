import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, List, ListItem, Right,Body, Icon, ActionSheet, Fab } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';

export class UsersScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      accounts: [],
    }
    let currentUser = firebase.auth().currentUser;
    this.db = firebase.firestore().collection('users').doc(currentUser.uid).collection('accounts');
    this.AddUserOpen = this.AddUserOpen.bind(this);    
    this.getUsers = this.getUsers.bind(this);
  }
  ShowActionSheet(){
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
      buttonIndex => {},    
    );
  }

  AddUserOpen(){
    this.props.navigation.navigate('AddUserScreen');
  }

  componentWillMount(){
    this.getUsers();
  }
  
  getUsers(){
    this.db.onSnapshot(doc => {
      let accounts = [];
      doc.forEach( account => {
        accounts.push(account.data());
      });
      this.setState({accounts});
    })
  }

  render(){
    return (
      <View style={styles.Container}>

        <Header title="Konta" />

        
        <List dataArray={this.state.accounts} renderRow={(account) =>
          <ListItem onPress={this.ShowActionSheet}>
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
        
        
        {/* <List selected>
          <ListItem onPress={this.ShowActionSheet}>
            <Body>
              <Text>Mama</Text>              
              <Text note>-12,50 zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem onPress={this.ShowActionSheet}>
            <Body>
              <Text>Mama</Text>              
              <Text note>-12,50 zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem onPress={this.ShowActionSheet}>
            <Body>
              <Text>Mama</Text>              
              <Text note>-12,50 zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
        </List>     */}

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


