var React = require('react-native');
var {
    StyleSheet,
    Text,
    View
} = React;

var IntroView = React.createClass({
    render: function() {
        return (
            <View style={styles.container}>
              <Text style={styles.welcome}>
                Welcome to Vavio!
              </Text>
              <Text style={styles.instructions}>
                To get started, piemel en plas.
              </Text>
              <Text style={styles.instructions}>
                Press Cmd+R to reload,{'\n'}
                Cmd+Control+Z for dev menu
              </Text>
              <Text style={styles.xd}>
                xD
              </Text>
            </View>
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
  xd: {
      fontSize: 40,
      color: 'pink'
  }
});

module.exports = IntroView;
