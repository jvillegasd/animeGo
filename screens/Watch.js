import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';


class Watch extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Streaming options',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922'
      }
    }
  }

  constructor(props) {
    super(props)

    global.site = this.props.navigation.getParam('site', 'NO-ID')
    global.slug = this.props.navigation.getParam('slug', 'NO-ID')
    global.no_episode = this.props.navigation.getParam('no_episode', 'NO-ID')
    global.id_episode = this.props.navigation.getParam('id_episode', 'NO-ID')
    this.state = {
      options: null,
      isLoading: true,
      error: false
    }
  }

  streamVideo(link) {
    this.props.navigation.navigate('WebVideoScreen', {
      link: link,
    })
  }

  render() {
    let self = this
    if (!this.state.isLoading && !this.state.error) {
      let streamsOptions = this.state.options.map(function (option) {
        return (
          <View key={option.server_name} style={{width: '90%'}}>
          <TouchableHighlight key={option.server_name} onPress={() => { self.streamVideo(option.link) }} style={buttons.button} underlayColor="white">
            <View>
              <Text >{option.server_name}</Text>
            </View>
          </TouchableHighlight>
          </View>
        );
      })
      return (
        <View>
          <View style={optionStyles.container}>
            <ScrollView ScrollView contentContainerStyle={optionStyles.options}>
              {streamsOptions}
            </ScrollView>
          </View>
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading streaming options...</Text>
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

  async fetchingData(isError) {
    if (isError) {
      this.setState({
        isLoading: true,
        error: false
      })
    }
    let options = await getOptions()
    if (options.hasOwnProperty('message')) {
      this.setState({ 
        error: true,
        isLoading: false
      })
    } else {
      this.setState({
        options: options,
        isLoading: false,
        error: false
      })
    }
  }

  async componentDidMount() {
    this.fetchingData(false)
  }
}

async function getOptions() {
  const endpoint = `http://""api/${global.site}/watch`
  let body = {
      'slug': global.slug,
      'no_episode': global.no_episode
    }
  if (global.id_episode) {
    body = {
      'slug': global.slug,
      'no_episode': global.no_episode,
      'id_episode': global.id_episode
    }
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
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
    marginBottom: 10
  }
})

const buttons = StyleSheet.create({
  button: {
    marginBottom: 10,
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

export default Watch;