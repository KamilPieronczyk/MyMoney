import React, { Component } from 'react';
import { StyleSheet, Alert, ToastAndroid, ProgressBarAndroid } from 'react-native';
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
				<View style={styles.Payment} >
					<View style={styles.Header}>
						<Text style={styles.HeaderText}>{this.props.accountName}</Text>
						<Text style={styles.HeaderSpace} ></Text>
						<Text style={styles.Amount}>{this.char}{this.props.amount} zł</Text>
					</View>
					<Text style={styles.Title}>{this.props.title}</Text>
					<View style={styles.Footer}>
						<View style={styles.FooterButtons}>
							<Button success transparent style={styles.Button} onPress={this.setCompleted} >
								<Icon name="md-checkmark" style={styles.ChceckMarkIcon} />
								<Text>Oddane</Text></Button>
							<Button info transparent style={styles.Button}>
								<Text>Przypomnij</Text>
							</Button>
						</View>							
						<Text style={styles.FooterSpace} ></Text>
						<Button transparent style={styles.ButtonDelete} onPress={this.alert} >
							<Icon name="md-trash" style={styles.ButtonDeleteIcon}></Icon>
						</Button>						
					</View>
				</View>				

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
	Payment: {
		backgroundColor: '#fff',
		borderRadius: 10,
		elevation: 2,
		padding: 10,
	},
	Header: {
		display: 'flex',
		flexDirection: 'row',
	},
	HeaderText: {
		fontSize: 18,
		color: '#333',
		flex: 0,
	},
	HeaderSpace: {
		flex: 1,
	},
	Amount: {
		flex: 0,
		fontSize: 16,
		color: '#333',
	},
	Title: {
		fontSize: 14,
	},
	Footer: {
		display: 'flex',
		flexDirection: 'row',
		paddingTop: 20,
	},
	FooterButtons: {
		flex: 0,
		display: 'flex',
		flexDirection: 'row',
	},
	FooterSpace: {
		flex: 1,
	},
	ButtonDelete: {
		flex: 0,
	},
	ButtonDeleteIcon: {
		fontSize: 28,
		color: Colors.red,
	},
	Button: {
		marginRight: 10,
	},
	ChceckMarkIcon: {
		marginRight: 0,
	}
})

export default PaymentItem;
