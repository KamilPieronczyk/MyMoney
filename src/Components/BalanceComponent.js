import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Colors } from '../styles/styles';
import { View, Text, Button, Icon } from 'native-base';

export class BalanceComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			shown: 0,
		}
	}


  render() {
    return (
			<View style={styles.Container} >    
        
        <Text style={styles.Header}>YOUR BALANCE</Text>
				<Text style={styles.Amount}>{this.props.amount} zł</Text>					
        <View style={styles.bottom}>
          <Text style={styles.text}>This mounth</Text>       
          <View style={styles.triangle}></View>
          <Text style={styles.text2}>350 zł</Text>
        </View>
			
			</View>
    )
  }
};

const styles = StyleSheet.create({
	Container: {
		margin: 0,
		display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 35,
	},
	Amount: {
    flex: 0,
    paddingTop: 15,
		fontSize: 34,
		color: '#333',
	},
	Space: {
		flex: 1,
  },
  Header: {
    color: '#666',
    fontSize: 14
  },
  text: {
    paddingTop: 10,
    color: '#666',
    fontSize: 14
  },  
  text2: {
    paddingTop: 10,
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  triangle: {
    width: 0,
    height: 0,
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#5ED1DA',
    marginHorizontal: 20,
  }
});
