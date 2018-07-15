import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from 'native-base'; 
import { Header } from '../../Components/Header';

export class UsersScreen extends Component {
  render() {
    return (
      <View style={styles.Container}>
          <Header title="Konta" />
          <Text>UsersScreen</Text>
          
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
