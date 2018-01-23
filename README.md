# ReactNative 仿豆瓣电影APP

## 目录结构
```
├── README.mdasd
├── __tests__
│   ├── index.android.js
│   └── index.ios.js
├── android
│   ├── app
│   ├── build
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── app.json
├── index.android.js
├── index.ios.js
├── ios
│   ├── DB_App
│   ├── DB_App-tvOS
│   ├── DB_App-tvOSTests
│   ├── DB_App.xcodeproj
│   ├── DB_AppTests
│   └── build
├── package.json
├── src
│  │   ├── commons
│  │   └── Ranking.js                                       影片排行组件
│  ├── components
│  │   ├── Detail.js                                        影片详情页
│  │   ├── HotList.js                                       热门列表
│  │   ├── My.js                                            我的模块
│  │   ├── PlayList.js                                      播放列表
│  │   ├── SearchIng.js                                     搜索时触发的组件
│  │   ├── SearchInput.js                                   搜索框
│  │   ├── Seek.js                                          正在热映
│  │   ├── SoonList.js                                      即将上映
│  │   └── Star.js                                          星星组件
│  ├── img                                                  效果图
│  │   ├── a.gif
│  │   ├── b.gif
│  │   ├── c.gif
│  │   ├── d.gif
│  │   ├── eee.jpg
│  │   ├── movie.png
│  │   ├── movie.webp
│  │   ├── play-icon.png
│  │   ├── poster.jpg
│  │   ├── qqq.png
│  │   ├── star-empty.png
│  │   ├── star-full.png
│  │   ├── star-half.png
│  │   ├── tianxian.jpg
│  │   └── www.jpg
│  ├── index.js
│  └── uilts
└── yarn.lock
```

## 运行

 - 先确保你已安装好了React Native 所需的依赖环境
 - 在根目录下执行 npm install
 - 在执行 react-native run-ios

## 效果图

![](./src/img/a.gif)

![](./src/img/b.gif)

![](./src/img/c.gif)

![](./src/img/d.gif)



## 待完善

 - 警告提示的问题
 - 功能不完善
 - 暂不适配 android
