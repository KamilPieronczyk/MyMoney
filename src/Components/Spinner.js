import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Spinner } from 'native-base';
import { Colors } from '../styles/styles';

import { View } from 'native-base';

export class MySpinner extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: this.props.visible,
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      visible: nextProps.visible,
    })
  }

  render() {
    if (this.state.visible){
      return (
        <View style={styles.Container} >     
          <Spinner color={Colors.primary} />
			  </View>
      )
    } else {
      return null;
    }
  }
};

MySpinner.propTypes = {
  visible: PropTypes.bool,
};

MySpinner.defaultProps = {
  visible: false,
};

const styles = StyleSheet.create({
	Container: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
	},
})
