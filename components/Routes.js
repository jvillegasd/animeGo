import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//Screens
import HomeScreen from './Home';
import FeedScreen from './Feed';
import WatchScreen from './Watch';
import WebVideoScreen from './WebVideo';
import SearchScreen from './Search';
import DirectoryScreen from './Directory';

const Feed = createStackNavigator({
  FeedScreen,
  WatchScreen,
  WebVideoScreen
})

const Search = createStackNavigator({
  SearchScreen
})

const Directory = createStackNavigator({
  DirectoryScreen
})

const Site = createMaterialBottomTabNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarIcon: () => <Ionicons size={20} name={'md-search'} color={'white'} />
    }
  },
  Feed: {
    screen: Feed,
    navigationOptions: {
      tabBarIcon: () => <Ionicons size={20} name={'md-paper'} color={'white'} />
    }
  },
  Directory: {
    screen: Directory,
    navigationOptions: {
      tabBarIcon: () => <Ionicons size={20} name={'md-folder'} color={'white'} />
    }
  }
},
  {
    navigationOptions: {
      header: null
    },
    barStyle: {
      backgroundColor: '#454955'
    },
    initialRouteName: 'Feed'
  },
)

const RootNavigator = createStackNavigator({
  HomeScreen,
  Site
})

export default createAppContainer(RootNavigator);