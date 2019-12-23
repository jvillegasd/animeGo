import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Divider, Button, Card, Title, Paragraph } from 'react-native-paper';

class Feed extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('site', 'NO-ID'),
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#228922'
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
    this.props.navigation.navigate('WatchScreen', {
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
          <View key={keyButton} style={{alignItems: 'center'}}>
            <Card key={keyButton + 'c'} elevation={20} style={{width: '90%'}}>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 115}}/>
              <Card.Content>
                <Title>{field.title}</Title>
                <Paragraph>Episode {field.no_episode}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button
                  key={keyButton}
                  onPress={() => { self.watchEpisode(field.slug, field.no_episode, idEpisode) }}
                  uppercase={false}
                  color='#C6C6C6'
                >
                  <Text style={{color: 'black'}}>Watch</Text>
                </Button>
              </Card.Actions>
            </Card>
            <Divider key={keyButton + 'b'} style={{marginBottom: 10}}></Divider>
          </View>
        );
      })
      return (
        <View>
          <ScrollView>
            {episodes}
          </ScrollView>
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading feed...</Text>
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
      this.setState({ 
        error: true,
        isLoading: false
      })
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
    width: 150,
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

export default Feed;