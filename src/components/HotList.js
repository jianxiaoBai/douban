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
import Star from './Star';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

export default class HotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      movies: []
    }
  }

  componentDidMount() {
    // console.log(this.props.navigation);
    // console.log('好好好');
    this._fatchData();
  }
  _fatchData = () => {
    fetch('https://api.douban.com/v2/movie/in_theaters')
    // 转换成 Text  是为了当意外发生时,更容易锁定错误
      .then((response) => {

      this.setState({refreshing: false});
      return response.json();

    }).then((responseText) => {
      let arrData = responseText.subjects;
      let i = 0;
      let arrList = [];
      /* 直接赋值的话没有 key 键,就会发出警告,所以为了避免出现警告,应主动在每个项目中添加 key 键 */
      arrData.map(item => {
        arrList.push({key: i, value: item});
        i++;
      })

      this.setState({movies: arrList, ready: false, refreshing: false});
      // console.log(this.state);

    }).catch((error) => {
      console.error(error);
    });
  }
  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fatchData();
  }
  render() {
    const {navigate} = this.props.navigation;
    const {movies} = this.state;
    return (
      <View>
        {this.state.ready
          ? <ActivityIndicator size="large" style={styles.loadding}/>
          : <FlatList
          data={movies}
          onRefresh={this._refreshDate}
          refreshing={this.state.refreshing}
          key={movies.key} 
          renderItem={({item}) => {
            return (
              <TouchableOpacity 
              style={[
                styles.hotList, item.key + 1 == movies.length && styles.lastList
              ]}
              onPress={() => navigate('Detail', {
                id: item.value.id,
                callback: (data) => {
                  this.setState({childState: data})
                }
              })}
              >
                <View style={{
                  flex: 1
                }}>
                  <Image source={{
                    uri: item.value.images.large.replace('webp', 'png')
                  }} style={{
                    width: 80,
                    height: 100
                  }}/>
                </View>
                <View style={{
                  flex: 2,
                  alignItems: 'flex-start'
                }}>
                  <Text style={styles.title}>{item.value.title}
                  </Text>
                  <View style={{marginTop:3,marginBottom:3}}>
                    <Star value={item.value.rating.stars}/>
                  </View>
                  <Text style={styles.smallFont}>导演：{item.value.directors[0].name}</Text>
                  <Text style={styles.smallFont}>主演：{item.value.casts.map((v) => v.name).join('/')}</Text>
                  <Text style={{
                    lineHeight: 20,
                    fontSize: 13
                  }}>{item.value.collect_count}人看过</Text>
                </View>
                <View style={{
                  flex: 0
                }}>
                  <TouchableOpacity onPress={() => alert('购票')} style={styles.pay}>
                    <Text style={{
                      color: '#FF4E65',
                      fontWeight: '900'
                    }}>购票</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )
          }}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 20,
    color: '#A6A6A6',
    fontSize: 12
  },
  loadding: {
    marginTop: 100
  },
  star: {
    width: 12,
    height: 12,
    marginRight: 2
  },
  hotList: {
    height: 130,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  lastList: {
    borderBottomWidth: 0
  },
  title: {
    fontWeight: '900',
    fontSize: 15
  },
  pay: {
    width: 50,
    height: 25,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:'#FF4E65',
    borderRadius:5,
  }
})
