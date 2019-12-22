import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Directory extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title: 'Directory',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922'
      }
    };
  };

  render() {
    return (
      <View>
        <Text>Directory</Text>
      </View>
    );
  }

  async componentDidMount() {
    const site = await AsyncStorage.getItem('site')
    this.props.navigation.setParams({title: site + ' - Directory'})
  }
}

export default Directory;