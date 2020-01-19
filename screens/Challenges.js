import React, { useState, useEffect, Component } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import RedeemBox from '../components/RedeemBox';

export default class ChallengesScreen extends Component{
   render() {
  return(
  <ScrollView>
    <RedeemBox Msg = "+1000 points" Info = "Stroll in the Park" Pic = "https://upload.wikimedia.org/wikipedia/commons/6/6e/A_Walk_in_the_Park_-_geograph.org.uk_-_546153.jpg" />
    <RedeemBox Msg = "+1000 points" Info = "Walk through the Beach" Pic = "https://4.bp.blogspot.com/_3I0_GEQtQOQ/TBNtIygZHEI/AAAAAAAAAKs/J4iyq_S8zhw/s1600/hd-summer-wallpaper-2560x1600-1006089.jpg"/>
    <RedeemBox Msg = "+1000 points" Info = "Shop around a Mall" Pic = "https://img2.10bestmedia.com/Images/Photos/19492/p-Pacific-Place-Mall_55_660x440_201404181635.jpg" />
    <RedeemBox Msg = "+1000 points" Info = "Take a Hike" Pic = "https://www.bing.com/th?id=OIP.oJtt_QuylhatU0FuU_MgFwHaEo&pid=Api&rs=1" />
    <RedeemBox Msg = "+1000 points" Info = "Explore a museum" Pic = "https://traveldigg.com/wp-content/uploads/2016/06/Louvre-Museum-Inside-Photo.jpg" />
    <RedeemBox Msg = "+1000 points" Info = "Walk around Downtown" Pic = "https://s3.amazonaws.com/luxechicago/wp-content/uploads/2017/01/12145511/HinsdaleChamber_ChristmasWalk_750x397.jpg"/>
    <RedeemBox Msg = "+1000 points" Info = "Run a Marathon" Pic = "https://static.ukrinform.com/photos/2018_10/thumb_files/630_360_1538638597-241.jpg"/>
  </ScrollView>
  );
   }
};

ChallengesScreen.navigationOptions = {
  title: 'Challenges',
};
