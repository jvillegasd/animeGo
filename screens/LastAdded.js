import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, AsyncStorage, FlatList } from 'react-native';
import { Divider, Button, Card, Title } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';

class LastAnimeAdded extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Last anime added',
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
      let animes = this.state.list.map(function (field) {
        let lastId = ''
        if (field.hasOwnProperty('id_episode')) {
          lastId = field.last_id
        }
        return (
          <View key={field.slug} style={{ alignItems: 'center' }}>
            <Card key={field.slug + 'c'} elevation={20} style={{ width: '90%' }}>
              <Card.Cover source={{ uri: field.image }} style={{resizeMode:'stretch'}}/>
              <Card.Content>
                <Title>{field.title}</Title>
              </Card.Content>
              <Card.Actions>
                <Button
                  key={field.slug}
                  onPress={() => { alert('const') }}
                  uppercase={false}
                  color='#C6C6C6'
                >
                  <Text style={{ color: 'black' }}>Go</Text>
                </Button>
              </Card.Actions>
            </Card>
            <Divider key={field.slug + 'b'} style={{ marginBottom: 10 }}></Divider>
          </View>
        );
      })
      return (
        <View>
          <ScrollView>
            {animes}
          </ScrollView>
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={loadingStyles.container}>
          <ActivityIndicator size={60} color='#228922' />
          <Text style={loadingStyles.text}>Loading list...</Text>
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
    let list = await getList()
    if (list.hasOwnProperty('message')) {
      this.setState({
        error: true,
        isLoading: false
      })
    } else {
      this.setState({
        list: list,
        isLoading: false,
        error: false
      })
    }
  }

  async componentDidMount() {
    const site = await AsyncStorage.getItem('site')
    this.props.navigation.setParams({ title: site })
    if (site) {
      global.site = site
      this.fetchingData(false)
    }
  }
}

async function getList() {
  const endpoint = `http:///api/${global.site}/last`
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

export default LastAnimeAdded;