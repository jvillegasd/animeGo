import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
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

  watchEpisode(slug_noEpisode) {
    
  }

  render() {
    if (this.state.feed !== null) {
      let self = this
      let episodes = this.state.feed.map(function (field) {
        let keyButton = field.slug + '(-)' + field.no_episode
        return (
          <TouchableHighlight key={keyButton} onPress={() => { self.watchEpisode(keyButton) }} style={buttons.button} underlayColor="white">
            <View>
              <Text >{field.title + ' - ' + field.no_episode}</Text>
            </View>
          </TouchableHighlight>
        );
      })
      return (
        <View style={optionStyles.container}>
          <ScrollView ScrollView contentContainerStyle={optionStyles.options}>
            {episodes}
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading {global.site} feed...</Text>
        </View>
      );
    }
  }

  async componentDidMount() {
    let feed = await getFeed()
    this.setState({ feed })
  }
}

async function getFeed() {
  const endpoint = `http:///api/${global.site}/feed`
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

const buttons = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: 150,
    height: 33,
    alignItems: 'center',
    backgroundColor: '#72BDA3',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 20,
    marginBottom: 10
  },
  container: {
    marginTop: 20
  }
})

export default Site;