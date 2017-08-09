/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image
} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Star from './Star';
const {width, height} = Dimensions.get('window');

export default class My extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      color: '#000'
    }
  }
  getRandomColor() {
    var str16 = (Math.random() * 0x1000000 << 0).toString(16);
    function done(h) {
      return new Array(7 - h.length).join("0") + h
    }
    var perfectStr = done(str16);
    return '#' + perfectStr;
  }

  componentDidMount() {
    setInterval(() => {
      // color = getRandomColor();
      let value = this.getRandomColor();
      this.setState({color: value})
    }, 20)
  }
  render() {
    const {navigate} = this.props.navigation;
    const {color} = this.state;
    return (
      <View style={{
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:color
        }}>
        <View>
          <Image source={require('../img/tianxian.jpg')} style={{
            width: 200,
            height: 200
          }}/>
        </View>
      </View>
    );
  }
}
