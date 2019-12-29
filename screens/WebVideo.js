import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview'

class WebVideo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  constructor(props) {
    super(props)

    global.link = this.props.navigation.getParam('link', 'NO-ID')
  }

  render() {
    return (
      <View style={viewStyles.view}>
        <WebView
          allowsFullscreenVideo={true}
          scrollEnabled = {false}
          style={{ flex: 1}}
          javaScriptEnabled={true}
          source={{ uri: global.link }}
          scalesPageToFit={true}
        />
      </View>

    );
  }
}

const viewStyles = StyleSheet.create({
  view: {
    flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
  }
})

export default WebVideo;