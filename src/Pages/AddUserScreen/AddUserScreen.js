import React, { Component } from 'react';
import { StyleSheet, Alert, ToastAndroid } from 'react-native';
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
      pin: '',
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
    if(this.state.username != '' && this.state.pin == ''){
      this.setState({spinner: true});
      this.db.where('username','==',this.state.username).get()
      .then((docs)=>{
        if(!docs.empty){
          this.alertUsername();
          this.setState({spinner: false});
        } else {
          this.db.doc().set({
            username: this.state.username,
            type: 'local',
          })
          .then(()=>{
            this.setState({spinner: false});
            this.back();
          })
        }
      })
      .catch();
    } 
    if(this.state.pin != '' && this.state.username != ''){
      this.setState({spinner: true});
      this.db.where('username','==',this.state.username).get()
      .then((docs)=>{
        if(!docs.empty){
          this.alertUsername();
          this.setState({spinner: false});
        } else {
          const combineAccounts = firebase.functions().httpsCallable('combineAccounts');
          combineAccounts({pin: this.state.pin, username: this.state.username}).then( ({data}) => {            
            this.setState({spinner: false});
            if(data.status == 'ok'){
              ToastAndroid.showWithGravity('Konto dodano pomyślnie',ToastAndroid.LONG,ToastAndroid.BOTTOM);
              this.back();              
            } else {
              ToastAndroid.showWithGravity(data.errorMessage,ToastAndroid.LONG,ToastAndroid.BOTTOM);
            }            
          }).catch(e => {
            this.setState({spinner: false});
            console.warn(e);
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
          <Text style={styles.TextGmail}>Podaj PIN do tworzonego konta by użytkownik widział twoje operacje (musisz go dostać od niego)</Text>
          <Item style={styles.InputGmail}>            
            <Input placeholder="PIN" keyboardType="numeric" onChangeText={(pin) => this.setState({pin})}/>
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
