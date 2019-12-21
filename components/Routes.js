import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Screens
import Home from './Home';
import Feed from './Feed';
import Watch from './Watch';
import WebVideo from './WebVideo';

const Project = createStackNavigator({
  Home: {
    screen: Home
  },
  Feed: {
    screen: Feed
  },
  Watch: {
    screen: Watch
  },
  WebVideo: {
    screen: WebVideo
  }
});

export default createAppContainer(Project);