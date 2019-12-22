import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Feed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('site', 'NO-ID') + ' - Feed',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922',
        marginBottom: 5
      }
    };
  };

  constructor(props) {
    super(props)

    global.site = this.props.navigation.getParam('site', 'NO-ID')
    this.state = {
      feed: null,
      isLoading: true,
      error: false
    }
  }

  watchEpisode(slug, noEpisode, idEpisode) {
    this.props.navigation.navigate('Watch', {
      site: global.site,
      slug: slug,
      no_episode: noEpisode,
      id_episode: idEpisode
    })
  }

  render() {
    if (!this.state.isLoading && !this.state.error) {
      let self = this
      let episodes = this.state.feed.map(function (field) {
        let keyButton = field.slug + '(-)' + field.no_episode
        let idEpisode = ''
        if (field.hasOwnProperty('id_episode')) {
          idEpisode = field.id_episode
        }
        return (
          <TouchableHighlight key={keyButton} onPress={() => { self.watchEpisode(field.slug, field.no_episode, idEpisode) }} style={buttons.button} underlayColor="white">
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
    } else if (this.state.isLoading) {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading {global.site} feed...</Text>
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
    let feed = await getFeed()
    if (feed.hasOwnProperty('message')) {
      this.setState({ error: true })
    } else {
      this.setState({
        feed: feed,
        isLoading: false,
        error: false
      })
    }
  }

  async componentDidMount() {
    this.fetchingData(false)
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
    marginBottom: 10
  }
})

const buttons = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: 350,
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
    marginTop: 0
  }
})

export default Feed;