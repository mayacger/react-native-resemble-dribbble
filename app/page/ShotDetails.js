'use strict';

var React = require('react-native');


var {
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicatorIOS,
  View,
  ListView,
  Component,
  Dimensions,
  Modal
} = React;

var api = require('../common/api'),
    Loading = require('../loading'),
    getImage = require('../common/getImage'),
    CommentItem = require('../page/commentItem'),
    Player = require('../page/player'),
    screen = Dimensions.get('window'),
    {Icon, } = require('react-native-icons'),

    //这是一个拖拽时图片放大的效果插件,原js中有bug，Dimensions模块react 已经内置，不需要require.
    ParallaxView = require('react-native-parallax-view'),
    HTML = require('react-native-htmlview');

var ShotDetails = React.createClass({

  getInitialState: function () {
    return {
      isModalOpen: false,
      isLoading: true,
      animated: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
  },

  selectPlayer: function(player: Object) {
      this.props.navigator.push({
        component: Player,
        passProps: {player},
        title: player.name
      });
  },

  componentDidMount: function() {
    api.getResources(this.props.shot.comments_url).then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData),
        isLoading: false
      });
    }).done();
  },

  openModal: function() {
    this.setState({
      isModalOpen: true
    });
  },

  closeModal: function() {
    this.setState({
      isModalOpen: false
    });
  },

  _renderCommentsList: function () {

    return <View style={styles.sectionSpacing}>
      <View style={styles.separator} />
      <Text style={styles.heading}>Comments</Text>
      <View style={styles.separator} />
        <ListView
          ref="commentsView"
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          automaticallyAdjustContentInsets={false}
        />
    </View>
  },

  _showModalTransition: function(transition) {
    transition("opacity", {
      duration: 200,
      begin: 0,
      end: 1
    });
    transition("height", {
      duration: 200,
      begin: - screen.height * 2,
      end: screen.height
    });
  },

  _hideModalTransition: function(transition) {
    transition("height", {
      duration: 200,
      begin: screen.height,
      end: screen.height * 2,
      reset: true
    });
    transition("opacity", {
      duration: 200,
      begin: 1,
      end: 0
    });
  },

  renderRow: function(comment: Object) {
    return (<CommentItem
      onSelect={() => this.selectPlayer(comment.user)}
      comment={comment} />);
  },

  _renderLoading: function() {
    return <ActivityIndicatorIOS animating={this.state.isLoading}
                                 style={styles.spinner}/>;
  },

  render: function () {
    var player = this.props.shot.user;
    if(!player){
      player = {};
      player.name = "空";
    }
    return (
      <ParallaxView
       backgroundSource={getImage.shotImage(this.props.shot)}
       windowHeight={300}
       header={(
          <TouchableOpacity onPress={this.openModal}>
            <View style={styles.invisibleView}></View>
          </TouchableOpacity>
        )} >

       <View>

        <TouchableHighlight
          onPress={this.openModal}
          underlayColor={"#333"}
          activeOpacity={0.95} >

          <View style={styles.headerContent}>
            <Image
              source={getImage.authorAvatar(player)}
              style={styles.playerAvatar} />
            <Text style={styles.shotTitle}>{this.props.shot.title}</Text>
            <Text style={styles.playerContent}>by<Text style={styles.player}>{player.name}</Text></Text>
          </View>

        </TouchableHighlight>

        <View style={styles.mainSection}>
          <View style={styles.shotDetailsRow}>
            <View style={styles.shotCounter}>
              <Icon
                name='fontawesome|heart'
                size={24}
                color='#333'
                style={styles.icon}
              />
              <Text style={styles.shotCounterText}> {this.props.shot.likes_count} </Text>
            </View>
            <View style={styles.shotCounter}>
                <Icon name='fontawesome|comments' style={styles.icon} size={24} color="#333"/>
                <Text style={styles.shotCounterText}> {this.props.shot.comments_count} </Text>
              </View>
              <View style={styles.shotCounter}>
                <Icon name='fontawesome|eye' style={styles.icon} size={24} color="#333"/>
                <Text style={styles.shotCounterText}> {this.props.shot.views_count} </Text>
              </View>
          </View>
          <View style={styles.separator} />
          <Text>
              <HTML value={this.props.shot.description}
                    stylesheet={styles}/>
          </Text>
          <View>
            {this._renderCommentsList()}
          </View>
        </View>

       </View>

       <Modal visible={this.state.isModalOpen}
         animated={this.state.animated}
         onDismiss={this.closeModal}>

           <TouchableHighlight style={styles.container} onPress={this.closeModal}
             underlayColor={"#333"}
             activeOpacity={0.95} >
             <View style={styles.container}>
               <Image source={getImage.shotImage(this.props.shot)}
                  style={styles.customModalImage}
                  resizeMode="contain"/>
              </View>
          </TouchableHighlight>

       </Modal>

      </ParallaxView>

    );
  }
});

var styles = StyleSheet.create({
  spinner: {
    marginTop: 20,
    width: 50
  },
  a: {
    fontWeight: "300",
    color: "#ea4c89"
  },
  p: {
    marginBottom: 0,
    flexDirection: "row",
    marginTop: 0,
  },
  invisibleView: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right:0
  },
  customModalImage: {
    height: screen.height / 2
  },
  headerContent: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 40,
    alignItems: "center",
    width: screen.width,
    backgroundColor: "#fff"
  },
  shotTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ea4c89",
    lineHeight: 18
  },
  playerContent: {
    fontSize: 12
  },
  player: {
    fontWeight: "900",
    lineHeight: 18
  },
  playerAvatar: {
    borderRadius: 40,
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 60,
    left: screen.width / 2 - 40,
    borderWidth: 2,
    borderColor: "#fff"
  },
  rightPane: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  shotDetailsRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row"
  },
  shotCounter: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-between"
  },
  shotCounterText: {
    color: "#333"
  },
  mainSection: {
    flex: 1,
    alignItems: "stretch",
    padding: 10,
    backgroundColor: "white"
  },
  separator: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 1 / PixelRatio.get(),
    marginVertical: 10,
  },
  sectionSpacing: {
    marginTop: 20
  },
  heading: {
    fontWeight: "700",
    fontSize: 16
  },
  icon: {
    flex: 1,
    width: 40,
    height: 40
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

module.exports = ShotDetails;
