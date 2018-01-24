
import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Dimensions,AppRegistry, StyleSheet, Text, View, Button, TouchableOpacity, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';

import Detail from './components/Detail';
import SearchInput from './components/SearchInput';
import PlayList from './components/PlayList';
import HotList from './components/HotList';
import My from './components/My';
import Seek from './components/Seek';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchIng from './components/SearchIng';
/* 为了注释烦人的调试提醒 */
console.ignoredYellowBox = ['Remote debugger'];
const DB_App = TabNavigator({
  热映: {
    screen: PlayList,
    navigationOptions:{
         tabBarLabel: '热映',
         tabBarIcon: ({tintColor}) => (
             <Icon name="tv" size={20} color={tintColor}/>
         ),
     },
  },
  找片: {
    screen: Seek,
    navigationOptions:{
         tabBarLabel: '照片',
         tabBarIcon: ({tintColor}) => (
             <Icon name="eye" size={20} color={tintColor}/>
         ),
     },
  },
  我的: {
    screen: My,
    navigationOptions:{
         tabBarLabel: '我的',
         tabBarIcon: ({tintColor}) => (
             <Icon name="user" size={20} color={tintColor}/>
         ),
     },
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#494949',
    inactiveTintColor: '#999999',
    labelStyle: {
      fontSize: 12,
      marginBottom: 5,
    },
    style: {
      borderTopWidth: 1,
      borderTopColor: '#c3c3c3',
      height: 50,
      backgroundColor:'#fff'
    },
  }

});

const MyApp = StackNavigator({
  Home: { screen: DB_App },
  Detail: { screen: Detail },
  PlayList: { screen: PlayList },
  SearchIng: { screen: SearchIng },

},{
  headerMode:'screen'
});


export default  MyApp;
