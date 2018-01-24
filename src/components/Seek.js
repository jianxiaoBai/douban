import React, {Component} from 'react';
import {
  Dimensions,
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import {StackNavigator, TabNavigator} from 'react-navigation';

import HotList from './HotList';
import SoonList from './SoonList';
import SearchInput from './SearchInput';
import Ranking from '../commons/Ranking';
import Swiper from 'react-native-swiper';

const movieInfo = 'https://api.douban.com/v2/movie';

const start = 0;
const { width, height } = Dimensions.get('window');
export default class Seek extends Component {
  constructor(props){
  	super(props);
  	this.state = {
      top250:[],
      weekly:[],
      us_box:[],
      new_movies:[],
      ready:true
    };
  };

  static navigationOptions = {
    header:null
  };

_fetchData = (s=0,type='top250')=>{
let formData = new FormData();
formData.append('apikey','0b2bdeda43b5688921839c8ecb20399b',)
formData.append('city','北京',)
formData.append('client','something',)
formData.append('udid','dddddddddddddddddddddd');

return fetch(`${movieInfo}/${type}?start=${s}`,{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
  },
  body:formData
})
  .then(response=>response.json())
  .then(data=>{
    this.setState({
        ready:false,
      });
    return data.subjects;
  })
  // console.log(6);
}
async  componentDidMount() {
   const json = await this._fetchData();
     this.setState({
         top250:json,
       });
  }

_changeData = async(obj) => {

  const {i} = obj;



  let type = '';
  switch  (i) {
    case 0:
      type = 'top250'
      break;
    case 1:
      type = 'weekly'

      break;
    case 2:
      type = 'us_box'
      break;
    case 3:
      type = 'new_movies'
      break;

  }

if(this.state[type].length != 0)return;
  this.setState({
      ready:true,
    });
  // alert(type)
  console.log(this.state);
  const json = await this._fetchData(0,type);
    this.setState({
        [type]:json,
      });
      // alert(111)
}

_fetchMore = async ()=>{
  // alert('加载更多')
  // console.log(1);
    start++;
  const json = await  this._fetchData(start*20);
  this.setState({
      top250:this.state.top250.concat(json),
    });

}

  render() {
    const { navigate } = this.props.navigation;
    const {top250,weekly,us_box,new_movies} = this.state
        return (//设置轮播组件Swiper的包裹容器高度，使用属性设置，不能通过样式设置
            <View style={{width:width,height:height,paddingTop:25,backgroundColor:'#fff'}}>

            <Swiper style={styles.wrapper} showsButtons={false} height={150} autoplay={true} autoplayTimeout={2.5}>
                <View style={styles.slide1}>
                    <Image
                        style={{width:width,height:150}}
                        resizeMode='stretch'
                        source={require('../img/qqq.png')}
                        />
                </View>
                <View style={styles.slide2}>
                    <Image
                        style={{width:width,height:150}}
                        resizeMode='stretch'
                        source={require('../img/eee.jpg')}
                        />
                </View>
                <View style={styles.slide3}>
                    <Image
                        style={{width:width,height:150}}
                        resizeMode='stretch'
                        source={{uri:'https://img6.pplive.cn/2012/05/23/17330380811.jpg'}}
                        />
                </View>
            </Swiper>
             <ScrollableTabView renderTabBar={() => <DefaultTabBar/>} tabBarUnderlineStyle={{
               backgroundColor: '#000',
               height: 2
             }} tabBarBackgroundColor='#FFFFFF' tabBarActiveTextColor='#000' tabBarInactiveTextColor='#959595' tabBarTextStyle={{
               fontSize: 14
             }}
             locked={false}
              onChangeTab={(i)=>this._changeData(i)}
             >
               <View tabLabel='Top250' style={{marginBottom:50}}>
                 <FlatList
                   data={top250}
                   onEndReached={this._fetchMore}
                   onEndReachedThreshold={0.5}
                   renderItem={({item,index})=>{
                     const {title,id,rating,directors,casts,images} = item;
                     return(
                       <Ranking
                         navigation={this.props.navigation}
                         title={title}
                         average={rating.average}
                         star={rating.stars}
                         directors={directors[0].name}
                         casts={casts}
                         index={index}
                         image={images.large}
                         id={id}
                         />
                     )
                   }}
                  keyExtractor={(item, index) => index}
                   />
                </View>


               <View tabLabel='口碑榜' style={{marginBottom:50}}>
                 {this.state.ready?<ActivityIndicator size="large" style={{marginTop: 100}}/>:
                 <FlatList
                   data={weekly}
                   renderItem={({item,index})=>{
                     const {title,id,rating,directors,casts,images} = item.subject;
                     return(
                       <Ranking
                         navigation={this.props.navigation}
                         title={title}
                         average={rating.average}
                         star={rating.stars}
                         directors={directors[0].name}
                         casts={casts}
                         index={index}
                         image={images.large}
                         id={id}
                         />
                     )
                   }}
                    keyExtractor={(item, index) => index}
                   />
               }
               </View>

               <View tabLabel='北美票房榜' style={{marginBottom:50}}>
                 {this.state.ready?<ActivityIndicator size="large" style={{marginTop: 100}}/>:
                 <FlatList
                   data={us_box}
                   renderItem={({item,index})=>{
                     const {title,id,rating,directors,casts,images} = item.subject;
                     return(
                       <Ranking
                         navigation={this.props.navigation}
                         title={title}
                         average={rating.average}
                         star={rating.stars}
                         directors={directors[0].name}
                         casts={casts}
                         index={index}
                         image={images.large}
                         id={id}
                         />
                     )
                   }}
                    keyExtractor={(item, index) => index}
                   />
               }
               </View>
               <View tabLabel='新片榜' style={{marginBottom:50}}>
                 {this.state.ready?<ActivityIndicator size="large" style={{marginTop: 100}}/>:
                 <FlatList
                   data={new_movies}
                   renderItem={({item,index})=>{
                     const {title,id,rating,directors,casts,images} = item;
                     return(
                       <Ranking
                         navigation={this.props.navigation}
                         title={title}
                         average={rating.average}
                         star={rating.stars}
                         directors={directors[0].name}
                         casts={casts}
                         index={index}
                         image={images.large}
                         id={id}
                         />
                     )
                   }}
                    keyExtractor={(item, index) => index}
                   />
               }
               </View>
             </ScrollableTabView>
          </View>
        );
  }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
