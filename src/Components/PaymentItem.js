import React, { Component } from 'react';
import { StyleSheet, Alert, ToastAndroid, ProgressBarAndroid, TouchableNativeFeedback } from 'react-native';
import { Colors } from '../styles/styles';

import { View, Text, Button, Icon } from 'native-base';
import firebase from 'react-native-firebase';

export class PaymentItem extends Component {
	constructor(props){
		super(props);
		this.char = this.props.kind == 'creditor' ? '+' : '-';
		this.state = {
			paymentId: this.props.id,
			accountId: this.props.accountId,
			progressBar: false,
		}
		let currentUser = firebase.auth().currentUser;
    this.payment = firebase.firestore().collection('users').doc(currentUser.uid).collection('payments').doc(this.state.paymentId);
	
		this.alert = this.alert.bind(this);
		this.removePayment = this.removePayment.bind(this);
		this.setCompleted = this.setCompleted.bind(this);
	}

	getDateString(date){
		let now  = new Date().getTime();
		let time = now - date;
		time = ~~(time /1000);
		let values = [
			60*60*24*365,
			60*60*24*30,
			60*60*24*7,
			60*60*24,
			60*60,
			60,
			1,
		];
		let names = ['year','month','week','day','hour','minute','second'];
		let string, name;

		for (let i = 0; i < values.length; i++) {
			const value = values[i];
			if(time / value >= 1){
				name = Math.floor(time/value) > 1 ? names[i]+'s' : names[i];
				string = Math.floor(time/value) + ' ' + name + ' ago';
				break;
			}
		}
		return string;
	}

	alert(){
		Alert.alert(
			'Usuń!',
			'Czy jesteś pewny, że chcesz usunąć tą płatność?',
			[
				{text: 'Cancel'},
				{text: 'OK', onPress: () => this.removePayment()},
			],
			{ cancelable: true }
		)
	}

	removePayment(){
		this.setState({progressBar: true});
		this.payment.delete()
		.then(()=>{
			ToastAndroid.showWithGravity(
				'Płatność usunięta',
				ToastAndroid.LONG,
				ToastAndroid.BOTTOM,
			);
			this.setState({progressBar: false});
		})
		.catch(()=>{
			this.setState({progressBar: false});
		})
	}

	setCompleted(){
		this.setState({progressBar: true});
		this.payment.update({
			status: 'completed',
		})
		 .then(()=>{
			ToastAndroid.showWithGravity(
				'Płatność sfinalizowana',
				ToastAndroid.LONG,
				ToastAndroid.TOP,
			);
			this.setState({progressBar: false});
		 })		
		 .catch(()=>{
			this.setState({progressBar: false});
		 })
	}

  render() {
		let progressBar;
		if(this.state.progressBar) progressBar = (<ProgressBarAndroid styleAttr="Horizontal" color="#2196F3"/>);
    return (
			<View style={styles.Container} >     

				<Text style={styles.date} >{this.getDateString(this.props.date)}</Text>	
				{progressBar}			
				<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onPress} >
					<View style={styles.PaymentContainer} >						
						<View style={styles.LeftSide}>              
							<Text style={styles.paymentUsername} >{this.props.accountName}</Text>
							<Text style={styles.paymentTitle} >{this.props.title}</Text>              
						</View>
						<View style={styles.RightSide}>              
							<Text style={styles.paymentAmount} >{this.props.amount} zł</Text>              
						</View>
					</View>
        </TouchableNativeFeedback>			

			</View>
    )
  }
};

const styles = StyleSheet.create({
	Container: {
		marginBottom: 20,
		marginHorizontal: 2,
	},
	date: {
		fontSize: 12,
		color: '#333',
		marginBottom: 5,
	},	
  paymentCompleted: {
    backgroundColor: Colors.green,
    elevation: 4,
  },
  PaymentContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    elevation: 2,
    borderRadius: 0,
    backgroundColor: '#fff',
  },
  LeftSide: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  RightSide: {
    flex: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paymentUsername: {
    fontSize: 18,
  },
  paymentTitle: {
    fontSize: 14,
  },
  paymentAmount: {
    fontSize: 18,
    textAlign: 'right',
  }
})

export default PaymentItem;
