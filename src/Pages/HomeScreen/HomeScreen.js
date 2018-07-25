import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from 'native-base'; 
import { PaymentItem } from '../../Components/PaymentItem';
import { StyleSheet } from 'react-native';
import { Header } from './../../Components/Header';

export class HomeScreen extends Component {  
  render() {
    return (
      <View style={{height: '100%'}}> 
        <Header title="Płatności" />
        <ScrollView style={styles.Container} >          
          
          <PaymentItem />
          <PaymentItem />
          <PaymentItem />
          <PaymentItem />
          <PaymentItem />
          
        </ScrollView>
      </View>      
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    display: 'flex',
    paddingHorizontal: 14,
    paddingTop: 5,
    height: '100%',
  }
})