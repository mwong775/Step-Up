import React, {Component, createClass} from 'react';
import {Text, Alert, View, AsyncStorage, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView} from "react-native";

export default class RedeemBox extends Component{

_message=(Msg)=> {
  // try{  
  //     var points = await AsyncStorage.getItem('points');  
  //     alert(points);  
  //   }  
  //   catch(error){  
  //     alert("failed lol")  
  //   } 
  alert(Msg);
}

render() {
   return (
   	<View>
   	<TouchableOpacity
   	   style = {{backgroundColor: '#DDDDDD'}}
   	   onPress={this._message(this.props.Msg)}>
       <ImageBackground 
       source = {{uri: this.props.Pic}}
       style = {{height:100, padding: 10}} >
       <Text style = {{fontSize: 20, fontWeight: "bold", color: "white", borderColor: "black",textAlign: "center", marginTop: 30}}>
	   {this.props.Info}
	   </Text>
       </ImageBackground>
       </TouchableOpacity>
      </View>
   );
  }
}