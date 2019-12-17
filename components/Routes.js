import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Screens
import Home from './Home';
import Site from './Site';

const Project = createStackNavigator({
  Home: {
    screen: Home
  },
  Site: {
    screen: Site
  }
});
export default createAppContainer(Project);