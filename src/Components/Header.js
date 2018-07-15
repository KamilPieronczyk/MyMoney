import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../styles/styles';
import { View, Text, Button, Icon } from 'native-base';

export class Header extends Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
			<View style={styles.Container} >     				
				<Text style={styles.space}></Text>
				<Text style={styles.title}>{this.props.title}</Text>
				<Button transparent style={styles.button}>	
					<Text style={styles.space}></Text>				
					<Icon style={styles.avatar} name="md-contact"/>					
				</Button>
			</View>
    )
  }
};

const styles = StyleSheet.create({
	Container: {
		margin: 0,
		height: 45,
		elevation: 1,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 1,
		backgroundColor: '#fff',
	},
	space: {
		flex: 1,
	},
	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	button: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
	},
	avatar: {
		flex: 0,
		color: Colors.primary,
		fontSize: 26,
	}

});
