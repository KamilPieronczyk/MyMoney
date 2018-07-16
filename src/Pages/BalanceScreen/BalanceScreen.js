import React, { Component } from 'react';
import { View, Text } from 'native-base'; 
import { StyleSheet } from 'react-native';
import { Header } from '../../Components/Header';
import { BalanceUserItem } from '../../Components/BalanceUserItem';

export class BalanceScreen extends Component {
  render() {
    return (
      <View style={styles.Container}>
          <Header title="Bilans" />
          {/* <BalanceUserItem username="Mama" amount="-100,24" details={[-50,-20,-30,80,125,684]}/>
          <BalanceUserItem username="Mama" amount="-100,24" details={[-50,-20,684]}/>
          <BalanceUserItem username="Mama" amount="-100,24" details={[-50,-20,-30,80,125,684,-25,-84]}/> */}
          
      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    height: '100%',
  },
})

