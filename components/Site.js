import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class Site extends Component {
  static navigationOptions = {
    title: 'Site: ',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#228922'
    }
  };
  render() {
    let site = JSON.stringify(navigation.getParams('site', 'site'))
    console.log('site: ' + site)
    return(
      <View>
        <Text>Site page</Text>
      </View>
    );
  }
}
export default Site;