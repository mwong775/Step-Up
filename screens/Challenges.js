import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import {View, Text, Button, TouchableOpacity} from 'react-native';

export default function LinksScreen() {
  return(
    <View style={{ flex: 1 }}>
    </View>    
    );
}

function linksScreen() {
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView />
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Challenges',
};

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
