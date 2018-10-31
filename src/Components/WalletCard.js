import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Colors } from '../styles/styles';

import { View, Text, Button, Icon, ListItem, Right, Body } from 'native-base';
import firebase from 'react-native-firebase';

export class WalletCard extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: this.props.username,
      accountId: this.props.accountId,      
		}
    let currentUser = firebase.auth().currentUser;
	}

	componentDidMount(){
	}

  render() {

    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onPress} >
        <View style={styles.Container} >     

            <View style={styles.Avatar} >						              
              <Text style={styles.AvatarText}>{this.props.username[0]}</Text>              
            </View>

            <View style={styles.Amount} >						              
              <Text style={styles.AmountText} >{this.props.saldo} zł</Text>              
            </View>			   

            <Text style={styles.Username} >{this.props.username}</Text>        
            
            <View style={styles.Buttons}>
              <Button style={styles.Button1} >
                <Text style={styles.ButtonText1}>Add Payment</Text>
              </Button>
              <Button style={styles.Button2} onPress={this.props.onPress} >
                <Text style={styles.ButtonText2}>Open</Text>
              </Button>
            </View>          

        </View>
      </TouchableNativeFeedback>			
    )
  }
};

const styles = StyleSheet.create({
	Container: {
    margin: 10,
    elevation: 1,
    borderTopWidth: 10,
    borderTopColor: '#FF7141',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
	},
  Avatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#FF7141',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 0,
  },
  AvatarText: {
    fontSize: 32,
    margin: 0,
    padding: 0,
    color: '#fff',
  },
  Amount: {
    marginTop: 25,
    marginBottom: 0,
  },
  AmountText: {
    fontSize: 35,
    color: '#0F0F0F',
  },
  Username: {
    marginTop: 6,
    fontSize: 24,
    marginBottom: 0,
    color: '#7A7A7C',
  },
  Buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
  },
  Button1: {
    height: 48,
    width: 150,
    borderRadius: 24,    
    backgroundColor: '#FF7141',
    borderColor: '#FF7141',
    borderWidth: 1,
    borderStyle: 'solid',    
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  Button2: {
    height: 48,
    width: 150,
    borderRadius: 24,    
    backgroundColor: '#fff',
    borderColor: '#FF7141',
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  ButtonText2: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF7141',
  },
})

export default WalletCard;
