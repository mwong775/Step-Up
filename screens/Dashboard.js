import React from 'react';
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, ScrollView, Image, Button } from 'react-native';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://csaifiza:step@cluster0-mhxo2.azure.mongodb.net/test?retryWrites=true&w=majority";

_loadClient() {
    Stitch.initializeDefaultAppClient("YOUR APP ID").then(client => {
      this.setState({ client });
      this.state.client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({ currentUserId: user.id });
          this.setState({ currentUserId: client.auth.user.id });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });

export default class App extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0,
    currentPoints: 0,
    // below for tracking more stats eventually 
    totalPointsEarned: 0,
    totalSteps: 0,
    DailyStepsPB: 0,
  };

  componentDidMount() {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Step-Up");
      var query = { name: "Username" };
      dbo.collection("User-Profile").find(query).toArray(function(err, result) {
        if (err) throw err;
        this.setState ({
          currentStepCount: result.steps,
          currentPoints: result.points
      });
        db.close();
      });
    });
    this._subscribe();
  }

  componentWillUnmount() {
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("Step-Up");
      var myquery = { name: "Username" };
      var newvalues = { $set: {steps: this.state.currentStepCount, points: this.state.currentPoints } };
      dbo.collection("User-Profile").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
    });
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      // console.log(result.steps);
      this.setState({
        currentStepCount: result.steps
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
    alert("test function works!");
  }

  _setPoints = () => {
    // TODO: subscribe or something to trigger event and auto compute
    // FORMULA FOR CALCULATING POINTS HERE
    this.setState(prevState => ({currentPoints: prevState.currentPoints + prevState.currentStepCount/10}));
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
