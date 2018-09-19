import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../styles/styles';
import { View, Text, Button, Icon, ActionSheet } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

export class Header extends Component {
	constructor(props){
		super(props);
		this.ShowActionSheet = this.ShowActionSheet.bind(this);
	}

	ShowActionSheet(){
    let BUTTONS = [
      { text: "Wyloguj", icon: "md-log-out", iconColor: Colors.red },
      { text: "Edytuj", icon: "md-create", iconColor: Colors.black },
      { text: "Zamknij", icon: "close", iconColor: Colors.red }
    ];
    ActionSheet.show({
        options: BUTTONS,
				cancelButtonIndex: 2,
				title: (firebase.auth().currentUser.displayName != null) ? firebase.auth().currentUser.displayName : 'Anonymous',
      },
      buttonIndex => {
				switch(buttonIndex){
					case 0: 
						firebase.auth().signOut();
						GoogleSignin.signOut();
						break;
				}
			},    
    );
	}
	
  render() {
		let BackButton;
		if(this.props.onBackPress){
			BackButton = <Button transparent onPress={this.props.onBackPress} iconLeft style={styles.space}>
										<Icon name="md-arrow-back" style={{color: '#333', marginLeft: 16,}}/>
									 </Button>;
		} else {
			BackButton = <Text style={styles.space}></Text>;
		}
    return (
			<View style={styles.Container} >     				
				{BackButton}
				<Text style={styles.title}>{this.props.title}</Text>
				<Button transparent style={styles.button} onPress={this.ShowActionSheet}>	
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
