import React, { Component } from 'react';
import { StyleSheet, Alert, ToastAndroid, ProgressBarAndroid, TouchableNativeFeedback } from 'react-native';
import { Colors } from '../styles/styles';

import { View, Text, Button, Icon, ListItem, Right, Body } from 'native-base';
import firebase from 'react-native-firebase';

export class PaymentItem extends Component {
	constructor(props){
		super(props);
		this.char = this.props.kind == 'creditor' ? '+' : '-';
		this.state = {
			paymentId: this.props.id,
			accountId: this.props.accountId,
			progressBar: false,
			backgroundColor: '#F44336',
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

	componentDidMount(){
		if(this.props.status == 'completed')
			this.setState({
				backgroundColor: '#5ED1DA',
		}) 
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.status == 'completed')
			this.setState({
				backgroundColor: '#5ED1DA',
			}) 
		else 
			this.setState({
				backgroundColor: '#F44336',
			}) 
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

		let char;
    char = this.props.kind == 'creditor' ? '+' : '-';
    return (
			<TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.props.onPress} >
			<View style={styles.Container}> 
				<View style={styles.Avatar} >						              
          <Text style={styles.AvatarText}>{this.props.accountName[0]}</Text>              
        </View>
				<View style={styles.Left}>
				 	<Text style={styles.paymentTitle} >{this.props.title}</Text>              
  				<Text style={styles.paymentAmount} >{char} {this.props.amount} zł</Text>             
				</View>
				<View style={styles.Right}>
					<Text style={styles.date} >{this.getDateString(this.props.date)}</Text>	
					<Text style={[styles.status, {backgroundColor: this.state.backgroundColor}]}>Purchase</Text>
				</View>
			</View>
			</TouchableNativeFeedback>
    )
  }
};

const styles = StyleSheet.create({
	Container: {
		padding: 10,		
		marginBottom: 20,
		display: 'flex',
		flexDirection: 'row',
	},
  Avatar: {
		flex: 0,
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvatarText: {
    fontSize: 32,
    margin: 0,
    padding: 0,
    color: '#333',
	},
	Left: {
		paddingLeft: 10,
		flex: 1,
		display: 'flex',
		flexDirection: 'column',		
	},
  paymentTitle: {
		marginTop: 0,
		fontSize: 14,
		color: '#666',
		fontWeight: '300',
  },
  paymentAmount: {
		color: '#333',
		fontWeight: '400',
    fontSize: 18,
		textAlign: 'left',
		marginTop: 5,
	},
	Right: {
		flex: 0,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',		
	},
	date: {
		fontSize: 14,
		color: '#666',
		textAlign: 'right',
		marginBottom: 10
	},
	status: {
		backgroundColor: Colors.red,
		color: '#fff',
		fontSize: 14,
		textAlign: 'right',
		borderRadius: 14,
		paddingHorizontal: 20,
		paddingVertical: 5,
	}
})

export default PaymentItem;
