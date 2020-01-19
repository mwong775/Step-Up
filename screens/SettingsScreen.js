import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, View, Text, FlatList } from 'react-native';
// import Radar from 'react-native-radar';

export default class SettingsScreen extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      latitude: null,
      longitude: null,
      error:null,
      markers: [{
        coordinate: {
          "latitude": 36.9975221,
          "longitude": -122.0544869,
        },
        title: "test",
      }]
    }
  }

  componentDidMount(){
    // // identify the user and request permissions
    // Radar.setUserId(this.state.userId);
    // Radar.requestPermissions(true);

    // // track the user's location once in the foreground
    // Radar.trackOnce().then((result) => {
    //   // do something with result.events, result.user.geofences
    // }).catch((err) => {
    //   // optionally, do something with err
    // });

    // // start tracking the user's location in the background
    // Radar.startTracking();
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  

  render() {
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.9969384062279,
          longitude: -122.05221132051499,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
             {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
         coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
         title={"Your Location"}
       />}
       {this.state.markers.map(marker => (
    <Marker
      coordinate={marker.coordinate}
      title={marker.title}
      // description={marker.description}
    />
  ))}
        </MapView>
        {/* <Text style={styles.text}>Hi</Text> */}
        {/* <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        /> */}
      </View>
    );
  }
}

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
 container: {
   height: height,
   width: width,
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
 text: {
  fontSize: 30, 
  textAlign: 'center',
 }
});

// SettingsScreen.navigationOptions = {
//   title: 'app.json',
// };
