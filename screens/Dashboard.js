import React from 'react';
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, TextInput, AsyncStorage, View, ScrollView, Image, Button, ImageBackground } from 'react-native';import {createAppContainer, StackNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBROP_XYv0IQ-nf72WGAQhGwzMkzqKohxw",
  authDomain: "step-up-2be49.firebaseapp.com",
  databaseURL: "https://step-up-2be49.firebaseio.com",
  storageBucket: "step-up-2be49.appspot.com"
};

// if (!firebase.apps.length) {
//   firebase.initializeApp({firebaseConfig});
// }

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    currentPoints: 0,
    isPointSet: false,
    totalPointsEarned: 0,
    totalSteps: 0,
    DailyStepsPB: 0,
  };

  

  componentDidMount() {
    this.getData("userId");
    this._subscribe();
    setInterval(() => (
      this.setPoints()
    ), 200);
  }

  getData(userId) {
    firebase.database().ref('users/' + userId).on('value',snapshot => {
      const data = snapshot.val();
      this.setState({
        currentPoints: data.points,
        currentStepCount: data.steps,
      })
    }) 
  }

  setPoints = () => {
    if((this.state.currentStepCount !== 0) && this.state.currentStepCount % 5 === 0 && (!this.state.isPointSet)) {
      this.setState(previousState => (
        { currentPoints: previousState.currentPoints + 1 }
      ));
      // this.storeData("userId");
      this.state.isPointSet = true;
    }
    else if(this.state.currentStepCount % 5 === 1) {
      this.state.isPointSet = false;
    }
  } 

  componentWillUnmount() {
    this._unsubscribe();
    this.storeData("userId");
  }

  storeData(userId) {
    console.log("STORING DATA", this.state.currentPoints, this.state.currentStepCount);
    firebase.database().ref('users/' + userId).set({
      points: this.state.currentPoints,
      steps: this.state.currentStepCount,
    });
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      // console.log(result.steps);
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  test() {
    alert("TEST BUTTON WORKS :D");
  }

  _addSteps = () => {
    this.setState(prevState => ({ currentStepCount: prevState.currentStepCount + 1 }));
  }

  _addPoints = () => {
    this.setState(prevState => ({ currentPoints: prevState.currentPoints + 1}));
  }

  _resetStats = () => {
    this.setState(prevState => ({ 
      currentStepCount: 0,
      currentPoints: 0,
    }));
  }

  _passPoints = () => {
     this.props.navigation.setParams({currentPoints: this.state.currentPoints});
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container} style={styles.contentContainer}>
      <ImageBackground source = {{uri: "https://www.future-of-leadership.org/wp-content/uploads/2018/10/green-gradient.png"}} 
      style = {{width : 300, height: 300,marginTop: 70, marginLeft: 30, alignItems: "center", marginHorizaontal: 30, justifyContent: "center"}}>
        <Text style={styles.mainStatsText}>Pace-Os: {this.state.currentPoints}
        </Text>
        <Text style={styles.mainStatsText}>Steps: {this.state.currentStepCount}</Text>
        </ImageBackground>
      </ScrollView>
    </View>    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  mainStatsText: {
    fontSize: 30, 
    fontWeight: "bold",
    textAlign: 'center',
    color: "green"
  },
  pastStepText: {
    textAlign: 'center',
    display: 'none',
  },
  asyncText: {
    textAlign: 'center',
    display: 'none',
  },
  footprintImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.6,
  },
});