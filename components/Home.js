import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

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
          <TouchableHighlight key={val} onPress={() => { self.navTo({ val }) }} style={buttons.button} underlayColor="white">
            <View>
              <Text style={buttons.text}>{val}</Text>
            </View>
          </TouchableHighlight>
        );
      })
      let englishOptions = sitesObject.English.map(function (val) {
        return (
          <TouchableHighlight key={val} onPress={() => { alert('Under construction') }} style={buttons.button} underlayColor="white">
            <View>
              <Text style={buttons.text}>{val}</Text>
            </View>
          </TouchableHighlight>
        );
      })
      return (
        <View>
          <View style={optionStyles.container}>
            <Text style={optionStyles.text}>Español</Text>
            <View style={optionStyles.options}>
              {spanishOptions}
            </View>
          </View>
          <View style={optionStyles.container}>
            <Text style={optionStyles.text}>English</Text>
            <View style={optionStyles.options}>
              {englishOptions}
            </View>
          </View>
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
      this.setState({ error: true })
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
  const response = await fetch('http:///api/', {
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

export default Home;