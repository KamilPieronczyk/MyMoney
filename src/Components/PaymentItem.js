import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from '../styles/styles';

import { View, Text, Button, Icon } from 'native-base';

export class PaymentItem extends Component {
  render() {
    return (
			<View style={styles.Container} >     

				<Text style={styles.date} >2 dni temu</Text>
				<View style={styles.Payment} >
					<View style={styles.Header}>
						<Text style={styles.HeaderText}>Mama</Text>
						<Text style={styles.HeaderSpace} ></Text>
						<Text style={styles.Amount}>-100,25 zł</Text>
					</View>
					<Text style={styles.Title}>Bilety na autobus</Text>
					<View style={styles.Footer}>
						<View style={styles.FooterButtons}>
							<Button success transparent style={styles.Button}>
								<Icon name="md-checkmark" style={styles.ChceckMarkIcon} />
								<Text>Oddane</Text></Button>
							<Button info transparent style={styles.Button}>
								<Text>Przypomnij</Text>
							</Button>
						</View>							
						<Text style={styles.FooterSpace} ></Text>
						<Button transparent style={styles.ButtonDelete}>
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
