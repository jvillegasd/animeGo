import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Site extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Site: ' + navigation.getParam('site', 'NO-ID')['val'],
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922'
      }
    };
  };

  constructor(props) {
    super(props)
    
    global.site = this.props.navigation.getParam('site', 'NO-ID')['val']
    this.state = {
      feed: null
    }
  }

  render() {
    if (this.state.feed !== null) {
      return (
        <View>
          <Text>Feed loaded</Text>
        </View>
      );
    } else {
      return (
        <View style = {loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading {global.site} feed...</Text>
        </View>
      );
    }
  }

  async componentDidMount() {
    let feedSite = await getFeed()
    this.setState({feed:feedSite})
  }
}

async function getFeed() {
  const endpoint = `{ip}/api/${global.site}/feed`
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  const json = await response.json()
  return json
}

const loadingStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
    flexDirection: 'column'
  },
  text: {
    fontSize: 20,
  }
})

export default Site;