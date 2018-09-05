import React, { Component } from 'react';
import { StyleSheet, Alert, ToastAndroid, ScrollView, StatusBar, Modal, } from 'react-native';
import { View, Text, Button,Icon, List, ListItem} from 'native-base'; 
import { Colors } from '../../styles/styles';
import firebase from 'react-native-firebase';
import { MySpinner }from '../../Components/Spinner';

export class PaymentScreen extends Component {
  constructor(props){
    super(props);
    this.backHandler = null;
    let date = new Date(this.props.navigation.getParam('date'));
    let dateString = date.toLocaleDateString();
    let timeString = date.toLocaleTimeString();
    this.state = {
      paymentId: this.props.navigation.getParam('id'),
      amount:  this.props.navigation.getParam('amount'),
      accountName: this.props.navigation.getParam('accountName'),
      date: dateString,
      time: timeString,
      status: this.props.navigation.getParam('status'),
      title: this.props.navigation.getParam('title'),
      kind: this.props.navigation.getParam('kind'),
      type: this.props.navigation.getParam('type'),
      backgroundColor: '#fff',
      progressBar: false,
    }
		let currentUser = firebase.auth().currentUser;
    this.payment = firebase.firestore().collection('users').doc(currentUser.uid).collection('payments').doc(this.state.paymentId);
    this.back = this.back.bind(this);
    this.setCompleted = this.setCompleted.bind(this);
    this.setGreenTheme = this.setGreenTheme.bind(this);
    this.setUncompleted = this.setUncompleted.bind(this);
    this.removePayment = this.removePayment.bind(this);
    this.alertRemove = this.alertRemove.bind(this);
    this.backPressed = this.backPressed.bind(this);
  }

  componentDidMount() {
    if(this.state.status == 'completed') this.setState({backgroundColor: '#3bd65f'});
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  }

  back(){
    setTimeout(() => {      
      StatusBar.setBackgroundColor('#fff');
      this.props.navigation.pop();
    }, 50);
  }

  setGreenTheme(){
    this.setState({backgroundColor: '#3bd65f'});
    StatusBar.setBackgroundColor('#3bd65f');
  }

  setCompleted(){
		this.setState({progressBar: true});
		this.payment.update({
			status: 'completed',
		})
		 .then(()=>{      
      this.setState({status: 'completed'});
      this.setGreenTheme();
			ToastAndroid.showWithGravity(
				'Płatność sfinalizowana',
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
			this.setState({progressBar: false});
		 })		
		 .catch(()=>{
			this.setState({progressBar: false});
		 })
  }
  
  setUncompleted(){
		this.setState({progressBar: true});
		this.payment.update({
			status: 'inProgress',
		})
		 .then(()=>{      
      StatusBar.setBackgroundColor('#fff');
      this.setState({backgroundColor:"#fff", status: 'inProgress'});
			ToastAndroid.showWithGravity(
				'Operacja cofnięta',
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
			);
			this.setState({progressBar: false});
		 })		
		 .catch(()=>{
			this.setState({progressBar: false});
		 })
  }

  alertRemove(){
    Alert.alert(
			'Usuń!',
			'Czy jesteś pewny, że chcesz usunąć tą płatność?',
			[
				{text: 'Cancel'},
				{text: 'OK', onPress: () => this.removePayment()},
			],
			{ cancelable: true }
		)
  }
  
  removePayment(){
		this.setState({progressBar: true});
		this.payment.update({
			deleted: true,
		})
		 .then(()=>{      
      StatusBar.setBackgroundColor('#f25252');
      this.setState({backgroundColor:"#f25252", status: 'deleted'});
			ToastAndroid.showWithGravity(
				'Płatność usunięta',
				ToastAndroid.SHORT,
				ToastAndroid.TOP,
      );
      setTimeout(() => {
        this.props.navigation.pop();
      }, 500);
			this.setState({progressBar: false});
		 })		
		 .catch(()=>{
			this.setState({progressBar: false});
		 })
	}


  render(){
    let complete;
    if(this.state.status == 'completed'){
      complete = 
        <Button transparent dark style={{marginRight: 30}} onPress={this.setUncompleted} >
          <Text>Cofnij zatwierdź</Text>
        </Button>;      
    } else {
      complete = 
        <Button transparent success style={{marginRight: 30}} onPress={this.setCompleted} >
          <Text>Zatwierdź</Text>
        </Button>;
    }

    let char;
    char = this.state.kind == 'creditor' ? '+' : '-';

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={true}
        presentationStyle = 'fullScreen'
        onRequestClose={this.back}
      >
      <ScrollView style={[styles.Container,{backgroundColor: this.state.backgroundColor}]}>        

        <View style={styles.closeSection} >         
          <View style={styles.whiteSpace}></View>            
            <Button icon transparent onPress={this.back} >
              <Icon name="close" style={styles.closeIcon} />       
            </Button>          
        </View>

        <View style={styles.amountSection} >
          <Text style={styles.amount}>{char} {this.state.amount} zł</Text>
        </View>

        <View style={styles.actionSection} >          
          {complete}
          <Button transparent danger onPress={this.alertRemove}>
            <Text>USUŃ</Text>
          </Button>          
        </View>

        
        <List>

          <ListItem style={styles.listItem}>
            <Text style={styles.left}>
              Tytuł
            </Text>
            <Text style={styles.right}>
              {this.state.title}
            </Text>
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text style={styles.left}>
              Konto
            </Text>
            <Text style={styles.right}>
              {this.state.accountName}
            </Text>            
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text style={styles.left}>
              Data
            </Text>
            <Text style={styles.right}>
              {this.state.date}
            </Text>
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text style={styles.left}>
              Czas
            </Text>
            <Text style={styles.right}>
              {this.state.time}
            </Text>
          </ListItem>

          <ListItem style={styles.listItem}>
            <Text style={styles.left}>
              Typ
            </Text>
            <Text style={styles.right}>
              {this.state.kind}
            </Text>
          </ListItem>

        </List>

        <MySpinner visible={this.state.progressBar} />        
        
      </ScrollView>
      </Modal>
    )
  }
};

const styles = StyleSheet.create({
  Container: {
    height: '100%',
  },
  closeSection: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  closeIcon: {
    color: Colors.grey,
    flex: 0,
  },
  whiteSpace: {
    flex: 1,
  },
  amountSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  amount: {
    fontSize: 48,
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    flex: 2,
  },
  right: {
    flex: 4,
    textAlign: 'right',
  } 
})
