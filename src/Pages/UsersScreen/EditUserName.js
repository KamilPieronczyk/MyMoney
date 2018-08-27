import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { View, Text, Item, Input, Button} from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner }from '../../Components/Spinner';

export class EditUserNameScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      usernamePrevious:  this.props.navigation.getParam('username'),
      accountId:  this.props.navigation.getParam('accountId'),
      spinner: false,
    }
    this.db = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('accounts');
    this.back = this.back.bind(this);
    this.editUserName = this.editUserName.bind(this);
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

  editUserName(){
    if(this.state.username != ''){
      this.setState({spinner: true});
      this.db.where('username','==',this.state.username).get()
      .then((docs)=>{
        if(!docs.empty){
          this.alertUsername();
          this.setState({spinner: false});
        } else {
          this.db.doc(this.state.accountId).update({
            username: this.state.username,
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

        <Header title="Edytij nazwę konta" onBackPress={this.back} />
        
        <View style={styles.InputsContainer}>
          <Text style={styles.TextGmail}>Edytuj nazwę konta</Text>
          <Item style={styles.InputTitle} >            
            <Input onChangeText={(username) => this.setState({username})} defaultValue={this.state.usernamePrevious} />
          </Item>
          

          <View style={styles.ButtonContainer}>
            
            <Button transparent onPress={this.editUserName} >
              <Text style={styles.ButtonCreate}>Edytuj konto</Text>
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
    marginTop: 5,
  },
  TextGmail: {
    marginTop: 30,
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#333',
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
