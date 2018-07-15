import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Colors } from '../styles/styles';
import { View, Text, Button, Icon } from 'native-base';

export class BalanceUserItem extends Component {
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			shown: 0,
			height: new Animated.Value(),
		}
		this.state.height.setValue(0);
	}

	toggle = () => {
		let height = this.props.details.length * 19;
		if (this.state.shown == 0 ){
			this.setState({shown: 1});
			this.state.height.setValue(5);
			Animated.spring(this.state.height, {toValue: height}).start();
		} else {
			this.setState({shown: 0});
			this.state.height.setValue(height);
			Animated.spring(this.state.height, {toValue: 5}).start();
		}
  }

  render() {
    return (
			<View style={styles.Container} >    
				<View style={styles.MainBox}>
					<Text style={styles.User}>{this.props.username}</Text>
					<Text style={styles.Amount}>saldo   {this.props.amount} zł</Text>					
					<Icon style={styles.IconMore} name={!this.state.shown ? 'md-arrow-dropdown' : 'md-arrow-dropup'} onPress={this.toggle} />					
				</View> 				
				<Animated.View style={[styles.MoreBox,{height: this.state.height}]}>
					<View style={styles.Space}></View>
					<View style={styles.Details}>
						{this.props.details.map((amount)=>{
							return (<Text style={styles.AmountDetails}>{amount}</Text>);
						})}
					</View>
				</Animated.View> 				
			</View>
    )
  }
};

const styles = StyleSheet.create({
	Container: {
		margin: 16,
		display: 'flex',
		flexDirection: 'column',
		borderBottomColor: '#707070',
		borderBottomWidth: 1,
	},
	MainBox: {
		display: 'flex',
		flexDirection: 'row',
	},
	User: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		color: '#333',
	},
	Amount: {
		flex: 0,
		fontSize: 16,
		color: '#333',
		marginRight: 10,
	},
	IconMore: {
		flex: 0,
		paddingVertical: 0,
		marginVertical: 0,
		marginTop: -2,
		marginRight: 5,
	},
	MoreBox: {
		display: 'flex',
		flexDirection: 'row',
	},
	Space: {
		flex: 1,
	},
	Details: {
		flex: 0,
		display: 'flex',
		flexDirection: 'column',
		marginRight: 45,		
	},
	AmountDetails: {
		flex: 0,
		fontSize: 14,
		color: '#333',		
		textAlign: 'right',
	}

});
