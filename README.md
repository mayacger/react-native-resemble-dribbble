# react-native-resemble-dribbble
参照dribbble app 学习的react native demo
原app：https://github.com/catalinmiron/react-native-dribbble-app

  在学习的过程中遇到了一些异常，其中有些是因为react-native-dribbble-app中使用的一些组件的方法过时（fb更新快且文档跟不上）。
  有几个问题解决了，还有几个没有解决。
## IOS

## install
    npm install
    
    进入react-native-dribbble-app/ios 目录打开 resembleDribbble.xcodeproj
    
    command + r
    
    如果遇到Command /bin/sh failed with exit code 127 错误
    
    Go into XCode and go to the Build Phases tab. Remove the last item on the list (the one that runs the script)，进入Build Phases，删除 最后一个列表

## Android 
  无
  
## Plugins used:

react-native-icons 原为：React native vector icons 两者使用方式有不同
    
```javascript
    {Icon, } = require('react-native-icons')
```
```javascript
    <Icon
          name='fontawesome|heart'
          size={24}
          color='#333'
          style={styles.icon} //需要一个样式设置width height
        />
```
react-native-parallax-view<br/>
    //这是一个拖拽时图片放大的效果插件,原js中有bug，Dimensions模块react 已经内置，不需要require. 我改动了原文件，注入Dimensions。
    
    
react-native-htmlview

