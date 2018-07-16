import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Left, Right, List, ListItem, Radio, Button } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/colors';

export class ChooseUserToAddScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: null,
    }
    this.setIndex = this.setIndex.bind(this);
    this.next = this.next.bind(this);
  }

  setIndex = (index) => {
    this.setState({ index: index});
  }

  next(){
    this.props.navigation.navigate('AddScreen');
  }
  render() {
    return (
      <View style={styles.Container}>
          <Header title="Wybierz użytkownika" />          
          
          <List>
            <ListItem onPress={()=>this.setIndex(0)}>
              <Left>                
                <Text>Mama</Text>                
              </Left>
              <Right>
                <Radio selectedColor={Colors.primary} onPress={()=>this.setIndex(0)} selected={this.state.index == 0 ? true : false}/>
              </Right>
            </ListItem>
            <ListItem onPress={()=>this.setIndex(1)}>
              <Left>                
                <Text>Marta</Text>                
              </Left>
              <Right>
                <Radio selectedColor={Colors.primary} onPress={()=>this.setIndex(1)} selected={this.state.index == 1 ? true : false}/>
              </Right>
            </ListItem>
            <ListItem onPress={()=>this.setIndex(2)}>
              <Left>                
                <Text>Tata</Text>                
              </Left>
              <Right>
                <Radio selectedColor={Colors.primary} onPress={()=>this.setIndex(2)} selected={this.state.index == 2 ? true : false}/>
              </Right>
            </ListItem>
          </List>        

          <View style={styles.ButtonContainer}>
            <Button info transparent onPress={this.next}>              
              <Text>Dalej</Text>              
            </Button>
          </View>
          
      </View>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  ButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  }
})
