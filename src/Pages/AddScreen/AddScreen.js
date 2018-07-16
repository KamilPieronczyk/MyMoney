import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback } from 'react-native';
import { View, Text, Input, Item ,Label, Icon, Button } from 'native-base'; 
import { Header } from '../../Components/Header';
import { Colors } from '../../styles/styles';

export class AddScreen extends Component {
  constructor(){
    super();
    this.state = {
      CheckedLeft: {},
      CheckedRight: {},
      amount: '',
    }
    this.checkOption = this.checkOption.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.backspace = this.backspace.bind(this);
  }

  checkOption(index){
    switch (index) {
      case 1:
        this.setState({CheckedLeft: styles.Checked, CheckedRight: {}});
        break;    
      case 2:
        this.setState({CheckedLeft: {}, CheckedRight: styles.Checked});
        break;
    }
  }

  setAmount = (number) => {
    let string = this.state.amount;
    string += number;
    this.setState({amount: string});
  }

  backspace = () => {
    let string = this.state.amount;
    string = (string.length > 0) ? string.slice(0, -1) : '';
    this.setState({amount: string});
  }

  render() {
    return (
      <View style={styles.Container}>
        <Header title="Utwórz operację" />

        <View style={styles.InsideContainer}>
          {/* <Text style={styles.Person}>Mama</Text> */}
          <Item style={styles.InputTitle}>            
            <Input placeholder="Tytuł" />
          </Item>
          <View style={styles.ActionContainer}>
          
            <TouchableNativeFeedback
              onPress={()=>{this.checkOption(1)}}
              background={TouchableNativeFeedback.SelectableBackground()}>              
                <View style={[styles.Action, this.state.CheckedLeft]}>
                  <Icon style={styles.Avatar} name="md-contact"/>	
                  <View style={styles.IconsContainer}>
                    <Icon style={[styles.IconMoney, {color: Colors.green}]} name="md-cash"/>	
                    <Icon style={[styles.IconArrow, {color: Colors.green}]} name="md-arrow-forward"/>	
                  </View>              
                  <Text style={styles.ActionPerson}>Mama</Text>              
                </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
              onPress={()=>{this.checkOption(2)}}
              background={TouchableNativeFeedback.SelectableBackground()}> 
                <View style={[styles.Action, this.state.CheckedRight]}>
                  <Icon style={styles.Avatar} name="md-contact"/>	
                  <View style={styles.IconsContainer}>
                    <Icon style={[styles.IconMoney, {color: Colors.red}]} name="md-cash"/>	
                    <Icon style={[styles.IconArrow, {color: Colors.red}]} name="md-arrow-back"/>	
                  </View>              
                  <Text style={styles.ActionPerson}>Mama</Text>              
                </View>
            </TouchableNativeFeedback>

          </View>

          <Text style={styles.Amount}>{this.state.amount != '' ? this.state.amount : '00,00'}</Text>
          <View style={styles.Keyboard}>
            <View style={styles.KeyboradRow}>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(1)}><Text style={styles.KeyboardButtonText}>1</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(2)}><Text style={styles.KeyboardButtonText}>2</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(3)}><Text style={styles.KeyboardButtonText}>3</Text></Button>
            </View>
            <View style={styles.KeyboradRow}>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(4)}><Text style={styles.KeyboardButtonText}>4</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(5)}><Text style={styles.KeyboardButtonText}>5</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(6)}><Text style={styles.KeyboardButtonText}>6</Text></Button>
            </View>
            <View style={styles.KeyboradRow}>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(7)}><Text style={styles.KeyboardButtonText}>7</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(8)}><Text style={styles.KeyboardButtonText}>8</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(9)}><Text style={styles.KeyboardButtonText}>9</Text></Button>
            </View>
            <View style={styles.KeyboradRow}>
              <Button transparent style={styles.KeyboardButton}><Icon name="md-checkmark" style={styles.KeyboardButtonIcon} /></Button>
              <Button transparent style={styles.KeyboardButton} onPress={()=>this.setAmount(',')}><Text style={styles.KeyboardButtonText}>,</Text></Button>
              <Button transparent style={styles.KeyboardButton} onPress={this.backspace}><Icon name="md-backspace" style={styles.KeyboardButtonIcon} /></Button>
            </View>
          </View>

          <View style={styles.Footer}>            
            <Button transparent>
              <Text style={styles.ButtonClearText}>WYCZYŚĆ</Text>
            </Button>            
            <Button transparent>
              <Text style={styles.ButtonConfirmText}>ZATWIERDŹ</Text>
            </Button>            
          </View>
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
  InsideContainer: {
    marginHorizontal: 16,
  },
  Person: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
  },
  InputTitle: {
    marginTop: 0,
  },
  ActionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  Action: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  Checked: {
    backgroundColor: '#ddefff',
  },
  Avatar: {
    flex: 0,
		color: Colors.primary,
    fontSize: 30,
    marginRight: 10,
  },
  IconsContainer: {
    flex: 0,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
  },
  IconMoney: {
    flex: 1,
    fontSize: 20,
    padding: 0,
    margin: 0,
  },
  IconArrow: {
    flex: 1,
    fontSize: 20,
    padding: 0,
    margin: 0,
  },
  ActionPerson: {
    fontSize: 18,
    flex: 0,
    paddingBottom: 10,
  },
  Amount: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '500',
    marginTop: 10,
  },
  Keyboard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  KeyboradRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  KeyboardButton: {
    margin: 0,
    height: 60,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  KeyboardButtonText: {
    fontSize: 28,
    color: Colors.primary,
    padding: 0,
    margin: 0,
  },
  KeyboardButtonIcon: {
    color: Colors.primary,
  },
  Footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  ButtonClearText: {
    color: Colors.grey,
  },
  ButtonConfirmText: {
    color: Colors.green,
  }
})
