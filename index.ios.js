/**
 * Sample React Native App
 * https://github.com/facebook/react-native
//  */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  WebView,
  NavigatorIOS,
} = React;


// var { Icon, } = require('react-native-icons');
var {TabBarIOS, Icon} = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var ListContent = require('./app/page/ruter');


var dzlProject = React.createClass({

  getInitialState: function () {
    return {
      selectedTab: 'default',
      notifCount: 0,
      press: 0,
    };
  },
  _renderContent: function(category: string, title: ?string) {
    return (

      <NavigatorIOS
        style={styles.wrapper}
        initialRoute={{
          component: ListContent,
          title: title,
          passProps: { filter: category }
      }} />

    );
  },
  render: function() {
    return (
      <TabBarIOS
        tintColor='#C00'
        barTintColor="rgba(240,240,240,0.1)"
        selectedTab= {this.state.selectedTab} >

        <TabBarIOS.Item
          name="default"
          iconName={'ion|ios-star-outline'}
          selectedIconName={'ion|ios-star'}
          title={'default'}
          iconSize={32}
          accessibilityLabel="default Tab"
          selected={this.state.selectedTab === 'default'}
          onPress={() => {
            this.setState({
              selectedTab: 'default',
            });
          }}>
         {this._renderContent("default", "default")}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          name="debuts"
          iconName={'ion|ios-checkmark-outline'}
          selectedIconName={'ion|ios-checkmark'}
          title={'debuts'}
          iconSize={32}
          accessibilityLabel="debuts Tab"
          selected={this.state.selectedTab === 'debuts'}
          onPress={() => {
            this.setState({
              selectedTab: 'debuts',
            });
          }}>
         {this._renderContent("debuts", "debuts")}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          name="animated"
          iconName={'ion|ios-chatbubble-outline'}
          selectedIconName={'ion|ios-chatbubble'}
          title={'animated'}
          iconSize={32}
          accessibilityLabel="animated Tab"
          selected={this.state.selectedTab === 'animated'}
          onPress={() => {
            this.setState({
              selectedTab: 'animated',
            });
          }}>
         {this._renderContent("animated", "animated")}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          name="rebounds"
          iconName={'ion|ios-person-outline'}
          selectedIconName={'ion|ios-person'}
          title={'rebounds'}
          iconSize={32}
          accessibilityLabel="rebounds Tab"
          selected={this.state.selectedTab === 'rebounds'}
          onPress={() => {
            this.setState({
              selectedTab: 'rebounds',
            });
          }}>
         {this._renderContent("rebounds", "rebounds")}
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
});

// var dzlProject = React.createClass({

//     getDefaultProps: function() {
//       return {
//         fadeAnim: new Animated.Value(0),
//       };
//     },

//    componentDidMount: function() {
//      Animated.timing(          // Uses easing functions
//        this.state.fadeAnim,    // The value to drive
//        {toValue: 1},           // Configuration
//      ).start();                // Don't forget start!
//    },
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Animated.Image
//           style={{opacity: this.state.fadeAnim}}
//           source={require('./app/img/icon-60.png')} />

//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// });
//
// var WEBVIEW_REF = 'webview';

// class dzlProject extends React.Component {
//    constructor(props) {
//      super(props);
//      this.state = {
//        fadeAnim: new Animated.Value(0), // init opacity 0
//        url: 'http://www.dazhili.com/question/lists',
//      };
//    }
//    componentDidMount() {
//      Animated.timing(          // Uses easing functions
//        this.state.fadeAnim,    // The value to drive
//        {toValue: 1},           // Configuration
//      ).start();                // Don't forget start!
//    }
//    render() {
//      return (
//       <View style={styles.container}>
//        <Animated.Image
//           style={[{opacity: this.state.fadeAnim},styles.imgRadius]}
//          source={require('./app/img/icon-60.png')} />
//          <WebView
//           ref={WEBVIEW_REF}
//           automaticallyAdjustContentInsets={true}
//           style={styles.webView}
//           startInLoadingState={true}
//           url={this.state.url} />
//       </View>
//       // <WebView
//       //     // ref={WEBVIEW_REF}
//       //     // automaticallyAdjustContentInsets={false}
//       //     style={styles.webView}
//       //     url={this.state.url} />
//           // javaScriptEnabledAndroid={true}
//           // onNavigationStateChange={this.onNavigationStateChange}
//           // onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
//           // startInLoadingState={true}
//           // scalesPageToFit={this.state.scalesPageToFit} />
//      );
//    }
//  };

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#000',
  },
  tabText: {
    color: "white",
    margin: 50,
  },
  wrapper: {
    flex: 1,
  }
});

AppRegistry.registerComponent('dzlProject', () => dzlProject);
