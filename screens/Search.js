import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, AsyncStorage, FlatList, Picker } from 'react-native';
import { Divider, Button, Card, Title, Searchbar } from 'react-native-paper';
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

  constructor(props) {
    super(props)

    global.site = ''
    this.state = {
      list: null,
      isLoading: true,
      error: false,
      querySearch: '',
      type: 'Normal',
      genre: '',
      genreList: null
    }
  }

  render() {
    let self = this
    if (!this.state.isLoading && !this.state.error) {
      if (this.state.type === 'Normal') {
        return (
          <View>
            <View key={'search'} style={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <View key={'first'} style={{ width: '90%', flexDirection: 'row', marginBottom: 5 }}>
                <Searchbar
                  placeholder='Search'
                  onChangeText={query => this.setState({ querySearch: query })}
                  value={this.state.querySearch}
                  style={{ width: '75%' }}
                />
                <Picker
                  selectedValue={this.state.genre}
                  style={{ height: 50, width: '39%' }}
                  onValueChange={currentValue => this.setState({ type: currentValue })}
                >
                  <Picker.Item label='Normal' value='Normal' />
                  <Picker.Item label='By genre' value='Genre' />
                </Picker>
              </View>
              <TouchableHighlight key={'search'} onPress={() => { alert('search') }} style={buttons2.button} underlayColor="white">
                <View>
                  <Text style={buttons.text}>{'Search'}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View key={'animeList'}>
              <ScrollView>
                <Text>Scroll</Text>
              </ScrollView>
            </View>
          </View>
        );
      } else {
        if (this.state.genreList === null) this.setState({error: true})
        let genres = this.state.genreList.map(function(field) {
          return (
            <Picker.Item label={field} value={field} key={field}/>
          );
        })
        return (
          <View>
            <View key={'genres'} style={{ alignItems: 'center', flexWrap: 'wrap' }}>
              <View key={'first'} style={{ width: '90%', flexDirection: 'row', marginBottom: 5, marginLeft: '5%' }}>
                <Picker
                  selectedValue={this.state.genre}
                  style={{ height: 50, width: '39%' }}
                  onValueChange={currentValue => this.setState({ genre: currentValue })}
                >
                  {genres}
                </Picker>
                <Picker
                  selectedValue={this.state.type}
                  style={{ height: 50, width: '39%', marginLeft: '30%' }}
                  onValueChange={currentValue => this.setState({ type: currentValue })}
                >
                  <Picker.Item label='Normal' value='Normal' />
                  <Picker.Item label='By genre' value='Genre' />
                </Picker>
              </View>
              <TouchableHighlight key={'search'} onPress={() => { alert('search') }} style={buttons2.button} underlayColor="white">
                <View>
                  <Text style={buttons.text}>{'Search'}</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View key={'animeList'}>
              <ScrollView>
                <Text>Scroll</Text>
              </ScrollView>
            </View>
          </View>
        );
      }

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
    try {
      let list = await getGenres()
      if (list.hasOwnProperty('message')) {
        this.setState({
          error: true,
          isLoading: false
        })
      } else {
        this.setState({
          genreList: list,
          isLoading: false,
          error: false
        })
      }
    } catch (error) {
      this.setState({
        genreList: null,
        isLoading: false,
        error: true
      })
    }
  }

  async componentDidMount() {
    const site = await AsyncStorage.getItem('site')
    this.props.navigation.setParams({ title: site })
    if (site) {
      global.site = site
      await this.fetchingData(false)
      this.setState({
        isLoading: false,
        error: false
      })
    }

  }
}

async function getGenres() {
  const endpoint = `http://""/api/${global.site}/genre/list`
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

// async function getList() {
//   const endpoint = `http://""/api/${global.site}/search`
//   const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: {
//       'value': 'watashi',
//       'page': 1
//     }
//   })
//   const json = await response.json()
//   return json
// }

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

const buttons2 = StyleSheet.create({
  button: {
    marginBottom: 10,
    marginLeft: '10%',
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

export default Search;