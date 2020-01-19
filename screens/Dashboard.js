import React from 'react';
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import {createAppContainer, StackNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// const Routes = createStackNavigator({
//   redeem: {screen: Redeem},
// });

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
    // below for tracking more stats eventually 
    totalPointsEarned: 0,
    totalSteps: 0,
    DailyStepsPB: 0,
  };

  componentDidMount() {
    this._subscribe();
    setInterval(() => (
      this.setPoints()
    ), 200);
  }

  setPoints = () => {
    if((this.state.currentStepCount !== 0) && this.state.currentStepCount % 5 === 0 && (!this.state.isPointSet)) {
      this.setState(previousState => (
        { currentPoints: previousState.currentPoints + 1 }
      ));
      this.state.isPointSet = true;
    }
    else if(this.state.currentStepCount % 5 === 1) {
      this.state.isPointSet = false;
    }
  } 

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      // console.log(result.steps);
      this.setState({
        currentStepCount: result.step
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
          <Text style={styles.mainStatsText}>My Points: {this.state.currentPoints}</Text>
          <Text style={styles.mainStatsText}>Current Steps: {this.state.currentStepCount}</Text>
          <Text style={styles.pastStepText}>
            Steps taken in the last 24 hours: {this.state.pastStepCount}
          </Text>
          <Text style={styles.asyncText}>
            Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
          </Text>
          <Button
          style={styles.button}
          onPress={this.test}
          title="Test Button"
          />
          <Button
          style={styles.button}
          onPress={ () => this._addSteps() }
          title="Add Steps"
          />
          <Button
          style={styles.button}
          onPress={ () => this._addPoints() }
          title="Add Points"
          />
          <Button
          style={styles.button}
          onPress={ () => this._resetStats() }
          title="Reset Stats"
          />
        </ScrollView>
        <Image
            source={
                require('../assets/images/footprint.jpg')
            }
            style={styles.footprintImage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  mainStatsText: {
    fontSize: 30, 
    textAlign: 'center',
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
    opacity: 0.4,
  },
});
