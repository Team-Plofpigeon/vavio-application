var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} = React;
var Camera = require('react-native-camera');

var IntroView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to Vavio!
              </Text>
              <TouchableHighlight onPress={this._switchCamera}>
                <View>
                  <Camera
                    ref="cam"
                    aspect="Stretch"
                    type="Back"
                    orientation="PortraitUpsideDown"
                    style={{height: 200, width: 200}}
                  />
                </View>
              </TouchableHighlight>
            </View>
        );
    },

    _switchCamera: function() {
        this.refs.cam.switch();
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
  xd: {
      fontSize: 40,
      color: 'pink'
  }
});

module.exports = IntroView;
