import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, AsyncStorage, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Divider, Button, Card, Title, Paragraph } from 'react-native-paper';

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: '#ffffff',
    headerStyle: {
      backgroundColor: '#228922'
    }
  };

  constructor(props) {
    super(props)

    this.state = {
      sites: null,
      isLoading: true,
      error: false
    }
  }

  async navTo(site) {
    try {
      await AsyncStorage.setItem('site', site['val'])
      this.props.navigation.navigate('FeedScreen', {
        site: site['val']
      })
    } catch (error) { console.log(error)}
  }

  render() {
    let self = this
    if (!this.state.isLoading && !this.state.error) {
      let sitesObject = this.state.sites
      let spanishOptions = sitesObject.Español.map(function (val) {
        return (
          <View key={val} style={{alignItems: 'center'}}>
            <Card key={val + 'c'} elevation={20} style={{width: '90%'}}>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 115}}/>
              <Card.Content>
                <Title>{val}</Title>
                <Paragraph>Language: Español</Paragraph>
                <Divider key={val + 'd'} style={{marginBottom: 10}}></Divider>
              </Card.Content>
              <Card.Actions>
                <Button
                  key={val}
                  onPress={() => { self.navTo({ val }) }}
                  uppercase={false}
                  color='#C6C6C6'
                >
                  <Text style={{color: 'black'}}>Go</Text>
                </Button>
              </Card.Actions>
            </Card>
            <Divider key={val + 'b'} style={{marginBottom: 10}}></Divider>
          </View>
        );
      })
      let englishOptions = sitesObject.English.map(function (val) {
        return (
          <View key={val} style={{alignItems: 'center'}}>
            <Card key={val + 'c'} elevation={20} style={{width: '90%'}}>
              <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height: 115}}/>
              <Card.Content>
                <Title>{val}</Title>
                <Paragraph>Language: English</Paragraph>
                <Divider key={val + 'd'} style={{marginBottom: 10}}></Divider>
              </Card.Content>
              <Card.Actions>
                <Button
                  key={val}
                  onPress={() => { alert('Under construction') }}
                  uppercase={false}
                  color='#C6C6C6'
                >
                  <Text style={{color: 'black'}}>Go</Text>
                </Button>
              </Card.Actions>
            </Card>
            <Divider key={val + 'b'} style={{marginBottom: 10}}></Divider>
          </View>
        );
      })
      return (
        <View>
          <ScrollView>
            {spanishOptions}
            {englishOptions}
          </ScrollView>
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading anime sites options...</Text>
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
    let sites = await getSites()
    if (sites.hasOwnProperty('message')) {
      this.setState({
        error: true,
        isLoading: false
      })
    } else {
      this.setState({
        sites: sites,
        isLoading: false,
        error: false
      })
    }
  }

  async componentDidMount() {
    this.fetchingData(false)
  }
}

async function getSites() {
  const response = await fetch('http://""api/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  const json = await response.json()
  return json.servers
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

export default Home;