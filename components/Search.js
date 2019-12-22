import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Search',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922'
      }
    };
  };

  render() {
    return (
      <View>
        <Text>Search</Text>
      </View>
    );
  }

  async componentDidMount() {
    const site = await AsyncStorage.getItem('site')
    this.props.navigation.setParams({ title: site + ' - Search' })
  }
}

export default Search;