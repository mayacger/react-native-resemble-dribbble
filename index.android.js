/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} = React;

var Tabbar = require('react-native-tabbar'),
    {Icon, } = require('react-native-icons'),
    ListContent = require('./app/page/ruter');
var Item = Tabbar.Item;

var resembleDribbble = React.createClass({
  getInitialState: function () {
    return {
      selected: 'default'
    };
  },

  onTabItemPress: function (name) {
    console.log(`click on ${name} item`);
    this.setState({
      selected: name
    });
  },
  _renderContent: function(category: string, title: ?string) {
    return (

      <Navigator
        initialRoute={{name: title, index: 0}}
        renderScene={(route, navigator) =>
            <ListContent />
        }
      />

    );
  },

  render: function() {
    var state = this.state;

    return (
      <Tabbar style={styles.container} selected={state.selected} onTabItemPress={this.onTabItemPress}>
        <Item name="default">
          <Item.Content>
            {this._renderContent("default", "default")}
          </Item.Content>
          <Item.Icon >
            <Icon
              name='ion|ios-star-outline'
              size={24}
              color='#333'
              style={styles.icon}
            />
          <Text style={{fontSize:12}}>default</Text>
          </Item.Icon>
        </Item>
        <Item name="debuts">
          <Item.Content>
            {this._renderContent("debuts", "debuts")}
          </Item.Content>
          <Item.Icon>
            <Icon
              name='ion|ios-checkmark-outline'
              size={24}
              color='#333'
              style={styles.icon}
            />
              <Text>debuts</Text>
          </Item.Icon>
        </Item>
        <Item name="animated">
          <Item.Content>
            {this._renderContent("animated", "animated")}
          </Item.Content>
          <Item.Icon>
            <Icon
              name='ion|ios-chatbubble-outline'
              size={24}
              color='#333'
              style={styles.icon}
            />
              <Text>animated</Text>
          </Item.Icon>
        </Item>
      </Tabbar>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon: {
    flex: 1,
    width: 40,
    height: 40
  },
});

AppRegistry.registerComponent('resembleDribbble', () => resembleDribbble);
