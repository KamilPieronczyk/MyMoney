import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, Item, Input, Button} from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner }from '../../Components/Spinner';

export class DeleteUserScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.navigation.getParam('username'),
      accountId:  this.props.navigation.getParam('accountId'),
      spinner: false,
    }
    this.db = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('accounts');
    this.back = this.back.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  back(){
    this.props.navigation.navigate('UsersScreen');
  }

  alert(){
    Alert.alert(
      'Błąd',
      'Konto nie istnieje',
      [
        {text: 'OK'},
      ],
    )
  }

  deleteUser(){
    this.setState({spinner: true});
    this.db.doc(this.state.accountId).delete()
    .then(()=>{
      this.setState({spinner: false});
      this.back();
    })
    .catch(()=>{
      this.alert();
      this.back();
    });   
  }
  render(){
    return (
      <View style={styles.Container}>

        <Header title="Usuń konto" onBackPress={this.back} />        

        <Text style={styles.title}>Usuń konto</Text>
        <Text style={styles.body}>Czy jesteś pewny, że chcesz usunąć konto {this.state.username}?</Text>

        <MySpinner visible={this.state.spinner} />

        <View style={styles.flexContainer} >

          <View style={styles.whiteSpace} ></View>

          <View style={styles.ButtonContainer}>
            
            <Button transparent onPress={this.back} >
              <Text style={styles.ButtonAnuluj}>Anuluj</Text>
            </Button>

            <Button transparent onPress={this.deleteUser} >
              <Text style={styles.ButtonDelete}>Usuń</Text>
            </Button>
            
          </View>

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
  title: {
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 20,
  },
  body: {
    marginTop: 20,
    marginHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Roboto',
    color: '#333',
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 16,
    flex: 1,
  },
  whiteSpace: {
    flex: 1,
  },
  ButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
  },
  ButtonDelete: {
    color: Colors.red,
  },
  ButtonAnuluj: {
    color: Colors.grey,
  }
})
