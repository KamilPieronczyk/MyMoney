import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, List, ListItem, Left, Right,Body, Icon, ActionSheet, Fab } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';

export class UsersScreen extends Component {
  ShowActionSheet(){
    let BUTTONS = [
      { text: "Wyzeruj saldo", icon: "ios-backspace", iconColor: Colors.red },
      { text: "Edytuj nazwę", icon: "md-create", iconColor: Colors.black },
      { text: "Połącz z kontem Google", icon: "logo-google", iconColor: Colors.primary },
      { text: "Usuń", icon: "md-trash", iconColor: Colors.red },
      { text: "Zamknij", icon: "close", iconColor: Colors.red }
    ];
    ActionSheet.show({
        options: BUTTONS,
        cancelButtonIndex: 4,
      },
      buttonIndex => {},    
    );
  }
  render(){
    return (
      <View style={styles.Container}>

        <Header title="Konta" />
        
        <List selected>
          <ListItem onPress={this.ShowActionSheet}>
            <Body>
              <Text>Mama</Text>              
              <Text note>-12,50 zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem onPress={this.ShowActionSheet}>
            <Body>
              <Text>Mama</Text>              
              <Text note>-12,50 zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem onPress={this.ShowActionSheet}>
            <Body>
              <Text>Mama</Text>              
              <Text note>-12,50 zł</Text>                            
            </Body>
            <Right>
              <Icon name="ios-arrow-forward"/>
            </Right>
          </ListItem>
        </List>    

        <Fab
          direction="up"
          style={{ backgroundColor: Colors.primary }}
          position="bottomRight">
          <Icon name="md-add" />
        </Fab>
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
