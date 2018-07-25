import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, Item, Input, Button} from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner }from '../../Components/Spinner';

export class AddUserScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      spinner: false,
    }
    this.db = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('accounts');
    this.back = this.back.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  back(){
    this.props.navigation.navigate('UsersScreen');
  }

  alertUsername(){
    Alert.alert(
      'Błąd',
      'Konto o takiej nazwie już istnieje',
      [
        {text: 'OK'},
      ],
    )
  }

  createAccount(){
    if(this.state.username != ''){
      this.setState({spinner: true});
      this.db.doc(this.state.username).get()
      .then((doc)=>{
        if(doc.exists){
          this.alertUsername();
          this.setState({spinner: false});
        } else {
          this.db.doc(this.state.username).set({
            username: this.state.username,
            email: this.state.email,
            saldo: 0,
          })
          .then(()=>{
            this.setState({spinner: false});
            this.back();
          })
        }
      })
      .catch();
    }

  }
  render(){
    return (
      <View style={styles.Container}>

        <Header title="Utwótz konto" onBackPress={this.back} />
        
        <View style={styles.InputsContainer}>
          <Item style={styles.InputTitle}>            
            <Input placeholder="Nazwa konta" onChangeText={(username) => this.setState({username})} />
          </Item>
          <Text style={styles.TextGmail}>Podaj email (Google) tworzonego konta by użytkownik widział twoje operacje (opcjonalne)</Text>
          <Item style={styles.InputGmail}>            
            <Input placeholder="Email" onChangeText={(email) => this.setState({email})}/>
          </Item>
          <View style={styles.ButtonContainer}>
            
            <Button transparent onPress={this.createAccount} >
              <Text style={styles.ButtonCreate}>Utwótz konto</Text>
            </Button>
            
          </View>
          <MySpinner visible={this.state.spinner} />

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
  InputsContainer: {
    marginHorizontal: 16,
  },
  InputTitle: {
    marginTop: 0,
  },
  TextGmail: {
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#333',
  },
  InputGmail: {
    marginTop: 5,
  },
  ButtonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  ButtonCreate: {
    color: Colors.primary,
  }
})
