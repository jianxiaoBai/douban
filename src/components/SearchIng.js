/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
export default class MyComponent extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);
    this.state={
      ready:false,
      data:[],
      flag: null
    }
  }

 _fullData(text) {
  if (!text) {
    return this.setState({ data: [] })
  }
  clearTimeout(this.state.flag)
   this.setState({
    flag: setTimeout(() => {
      this.setState({ ready: true })
      fetch(`https://api.douban.com/v2/movie/search?q=${text}&apikey=0b2bdeda43b5688921839c8ecb20399b&client=something`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: data.subjects,
            ready: false
          })
        })
      }, 1500)
   })
}
  render() {
    const { navigate, goBack } = this.props.navigation;
    const { data } = this.state;
    return (
      <View style={{
        paddingTop: 25,
        backgroundColor: '#fff',
        height:height
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={styles.search}>
            <Icon style={styles.searchIcon} 
              name="search" 
              size={15} 
              color="#8B8B8B"/>
            <TextInput 
              placeholder="搜索电影/电视" 
              onChangeText={(text) => this._fullData(text)} 
              underlineColorAndroid="transparent" 
              autoFocus={true}/>
          </View>
          <TouchableOpacity 
            style={styles.cancel} 
            onPress={() => goBack()}>
            <Text 
              style={{
              color: '#73B582'
              }}>取消</Text>

          </TouchableOpacity>
        </View>
        { this.state.ready ? 
        <ActivityIndicator size="large" style={{marginTop:100}} />
        :
        <FlatList
          style={{paddingLeft: 20,paddingRight:20}}
          data={data}
          renderItem={({item,index})=>{
            const { title,id,rating,directors,casts,images,year,genres,pubdates } = item;
            return(
              <TouchableOpacity style={{
                flexDirection: 'row',
                height:60,
                alignItems:'center'
              }}
              onPress={() => navigate('Detail', {
                id:id,
                callback: (data) => {
                  this.setState({childState: data})
                }
              })}
              >

                <View style={{marginRight:15}}>
                  <Image 
                    source={{uri:images.large}} 
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20
                    }}/>
                </View>
                <View>
                  <Text>{title}</Text>
                  <Text style={{
                    color: '#A6A6A6',
                    fontSize: 12,
                    lineHeight:25
                  }}>{rating.average}/{pubdates[0]||year}/{genres}</Text>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, index) => index}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
    marginLeft: 20,
    marginBottom: 5,
    borderRadius: 5,
    flex: 5
  },
  searchIcon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  cancel: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 5
  }
});
