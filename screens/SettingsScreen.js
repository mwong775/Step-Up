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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log("wokeeey");
        console.log("pOsItIoN:", position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

    return fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.9969384062279,-122.05221132051499&radius=1500&type=park&key=AIzaSyCBmFQYZJ4AdWV1M5skmCGO6x_0s88DZUM')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
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
  
  // https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=park&inputtype=textquery&fields=photos,formatted_address,name&locationbias=circle:2000@36.9969384062279,-122.05221132051499&key=YOUR_API_KEY

  // https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.9969384062279,-122.05221132051499&radius=1500&type=park&key=YOUR_API_KEY
  // AIzaSyCBmFQYZJ4AdWV1M5skmCGO6x_0s88DZUM

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
        <Text> {this.state.latitude} </Text>
        <Text> {this.state.longitude} </Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }
}

// receive events
// Radar.on('events', (result) => {
//   // do something with result.events, result.user
// });

// // receive location updates
// Radar.on('location', (result) => {
//   // do something with result.location, result.user
// });

// // receive errors
// Radar.on('error', (err) => {
//   // do something with err
// });


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
