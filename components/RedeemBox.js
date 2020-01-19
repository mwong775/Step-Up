import React, {Component, createClass} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView} from "react-native";

export default class RedeemBox extends Component{

render() {
   return (
   	<View>
   	<TouchableOpacity
   	   style = {{backgroundColor: '#DDDDDD'}}
   	   onPress={()=>alert("Donated!")}>
       <ImageBackground 
       source = {{uri: this.props.Pic}}
       style = {{height:100, padding: 10}} >
       <Text style = {{fontSize: 20, color: "white", textAlign: "center", marginTop: 30}}>
	   {this.props.Info}
	   </Text>
       </ImageBackground>
       </TouchableOpacity>
      </View>
   );
  }
}