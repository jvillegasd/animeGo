import React, {Component} from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
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
      sites: null
    }
  }

  navTo(site) {
    this.props.navigation.navigate('Site', {
      site: site
    })
  }

  render() {
    if (this.state.sites !== null) {
      let sitesObject = this.state.sites
      let self = this
      let spanishOptions = sitesObject.Español.map(function(val) {
        return (
          <TouchableHighlight key={val} onPress={() => {self.navTo({val})}} style={buttons.button} underlayColor="white">
            <View>
              <Text style={buttons.text}>{val}</Text>
            </View>
          </TouchableHighlight>
        );
      })
      let englishOptions = sitesObject.English.map(function(val) {
        return (
          <TouchableHighlight key={val} onPress={() => {alert('Under construction')}} style={buttons.button} underlayColor="white">
            <View>
              <Text style={buttons.text}>{val}</Text>
            </View>
          </TouchableHighlight>
        );
      })
      return (
        <View>
          <View style={optionStyles.container}>
            <Text>Español</Text>
            <View>
              {spanishOptions}
            </View>
          </View>
          <Text>English</Text>
          <View>
            {englishOptions}
          </View>
        </View>
      );
    } else {
      return (
        <View style = {loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading anime sites options...</Text>
        </View>
      );
    }
  }

  async componentDidMount() {
    let sites = await getSites()
    this.setState({sites})
  }
}

async function getSites() {
  const response = await fetch('{ip}/api/', {
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
  }
})

const optionStyles = StyleSheet.create({
  container: {

  }
})

const buttons = StyleSheet.create({
  button: {
    marginBottom: 10,
    width: 150,
    height: 33,
    alignItems: 'center',
    backgroundColor: '#2196F3',
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