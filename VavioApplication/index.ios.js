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
  NavigatorIOS
} = React;

var IntroView = require('./React/Components/IntroView');

var VavioApplication = React.createClass({
  render: () => (
        <NavigatorIOS
            style={styles.navigator}
            tintColor='#e74c3c'
            initialRoute={{
                component: IntroView,
                title: 'Vavio',
                passProps: {myProps: 'foo'}
            }}
        />
    )
});



var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: '#e74c3c'
  },
});

AppRegistry.registerComponent('VavioApplication', () => VavioApplication);
