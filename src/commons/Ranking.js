/* @flow */

import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Star from '../components/Star';

import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
;

export default class MyComponent extends Component {
  static defaultProps = {
    index:0,
    title:null,
    star:null,
    img:null,
    large:null,
    id:null,
    average:null,
    directors:null,
    casts:[]
  }

  render() {
    const {key,title,star,directors,average,index,casts,image,id} = this.props;
    const {navigate} = this.props.navigation;

    return (
      <TouchableOpacity
        style={styles.rootList}
        onPress={() => navigate('Detail', {
          id: id,
        })}
        >
        <View style={{flexDirection:'row',justifyContent:'center',
        alignItems:'center'}} >
          <View style={styles.line} ></View>
              <Text style={{paddingLeft:10,paddingRight:10,color:'red'}}>{index+1}</Text>
          <View style={styles.line} ></View>
        </View>
        <View style={styles.container}>
          <View style={{marginLeft:15}}>
            <Image source={{uri:image}} style={{width:80,height:110}} />
          </View>
          <View style={{marginLeft:10}}>
            <Text style={{fontWeight:"800",fontSize:18}}>{title}</Text>
            <View style={{marginTop:10,marginBottom:10,flexDirection:'row'}}>
              <Star value={star} />
              <Text style={{color:'#9B9B9B',fontSize:11}}> {average}</Text>
            </View>
            <Text style={styles.gray}>导演: {directors}</Text>
            <Text style={styles.gray}>演员: {casts.map((item,index)=>item.name +(index!=2?'/':''))}</Text>
          </View>
        </View>
        <View>
            <Text style={{color:'#494949'}}>影片ID:{id}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rootList: {
    height:200,
    marginTop:18,
    paddingLeft:18,
    paddingRight:18,
  },
  gray:{
    color:'#9B9B9B',
    fontSize:12,
    lineHeight:20
  },
  container:{
    flex:1,
    marginTop:18,
    marginBottom:15,
    borderWidth:1,
    borderColor:'#CCCCCC',
    borderRadius:2,
    flexDirection:'row',
    alignItems:'center',
    paddingRight:100
  },
  line:{
    width:65,
    height:1,
    backgroundColor:'#DEDEDE'
  }
});
