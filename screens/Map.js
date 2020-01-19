import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, View, Text, FlatList } from 'react-native';
import { GOOGLE_API_KEY } from "react-native-dotenv";

export default class Map extends React.Component {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      lat: null,
      long: null,
      error: null,
      places: [],
      placeType: "park",
    }
  }

  componentDidMount(){
    console.log(this.props);
    console.log(this.state);
    const { navigation } = this.props;
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      console.log("CURRENT LOCATION", lat, long);
      this.setState({
        lat: lat, long: long
      });
      this.getPlaces();
    })
  }

  getPlaces() {
    const { lat, long, placeType } = this.state;
    const markers = [];
    const url = this.getPlacesUrl(lat, long, 1500, placeType, GOOGLE_API_KEY);
    console.log("URL", url);
    fetch(url).then(res => res.json()).then(res => {
      console.log("THIS RES THING", res);  
      res.results.map((element, index) => {
          const marketObj = {};
          marketObj.id = element.id;
          marketObj.name = element.name;
          marketObj.marker = {
            latitude: element.geometry.location.lat,
            longitude: element.geometry.location.lng
          };
          console.log("MARKERS", markers);
          markers.push(marketObj);
        });
        this.setState({places: markers});
      });
      console.log("GOT PLACES", this.state);
  }

  getPlacesUrl(lat, long, radius, type, apiKey) {
    const baseUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const location = `location=${lat},${long}&radius=${radius}`;
    const typeData = `&types=park`;
    const api = `&key=${apiKey}`;
    return `${baseUrl}${location}${typeData}${api}`;
  }
  

  render() {
    return (
      <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 36.9969384062279,
          longitude: -122.05221132051499,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
        {this.state.places.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={{
              latitude: marker.marker.latitude,
              longitude: marker.marker.longitude
            }}
            title={marker.name}
            />
        ))}
        </MapView>
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
