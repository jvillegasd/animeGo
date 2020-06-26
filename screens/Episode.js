import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { Divider, Button, Card, Title, Paragraph } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Episode extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Anime episode lists',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922'
      }
    };
  };

  constructor(props) {
    super(props)

    global.site = ''
    this.state = {
      list: null,
      isLoading: true,
      error: false
    }
  }

  render() {
    let self = this
    if (!this.state.isLoading && !this.state.error) {
      
    } else if (this.state.isLoading) {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading episode list...</Text>
        </View>
      );
    } else if (this.state.error) {
      return (
        <View style={loadingStyles.container}>
          <Text style={loadingStyles.text}>The server throws an unexpected error.</Text>
          <TouchableHighlight key={'error'} onPress={() => { self.fetchingData(true) }} style={buttons.button} underlayColor="white">
            <View>
              <Text style={buttons.text}>{'Refresh'}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }
  }

  async componentDidMount() {
    const site = await AsyncStorage.getItem('site')
    const anime = await AsyncStorage.getItem('anime')
    this.props.navigation.setParams({ title: anime })
    if (site && anime) {
      global.site = site
      await this.fetchingData(false)
    }
  }
}

const optionStyles = StyleSheet.create({
  options: {
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  },
  container: {
    marginTop: 20
  }
})

const loadingStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
    flexDirection: 'column'
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  }
})

const buttons = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: 150,
    marginLeft: '10%',
    height: 33,
    alignItems: 'center',
    backgroundColor: '#C6C6C6',
    borderRadius: 5
  },
  text: {
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 5,
    color: '#ffffff'
  }
})

const buttons2 = StyleSheet.create({
  button: {
    marginBottom: 5,
    height: 33,
    width: 55,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#C6C6C6',
    borderRadius: 5
  },
  button2: {
    marginBottom: 5,
    height: 33,
    alignItems: 'center',
    backgroundColor: '#C6C6C6',
    borderRadius: 5
  },
  text: {
    borderRadius: 20,
    textAlign: 'center',
    marginTop: 5,
    color: '#ffffff'
  }
})

export default Episode;