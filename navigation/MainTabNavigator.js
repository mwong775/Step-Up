import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import Dashboard from '../screens/Dashboard';
import ChallengesScreen from '../screens/Challenges';
import Map from '../screens/Map';
import Donate from '../screens/Donate';


const points = 'Points: 1234 :)';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const topbar = { /* The header config from Dashboard is now here */
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#99d6ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
    },
  }
};

const DashStack = createStackNavigator(
  {
    Dashboard: Dashboard,
  },
  topbar,
  config
);

DashStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-stats' : 'ios-stats'
      }
    />
  ),
};

DashStack.path = '';

const ChallengesStack = createStackNavigator(
  {
    Challenges: ChallengesScreen,
  },
  topbar,
  config
);

ChallengesStack.navigationOptions = {
  tabBarLabel: 'Challenges',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-fitness' : 'md-fitness'} />
  ),
};

ChallengesStack.path = '';

const DonateStack = createStackNavigator(
   {
      Donate: Donate,
   },
   topbar,
   config
);

DonateStack.navigationOptions = {
   tabBarLabel: 'Donate',
   tabBarIcon: ({ focused })=> (
      <TabBarIcon focused = {focused} name = "logo-usd" />
   )

};

DonateStack.path = '';

const MapStack = createStackNavigator(
  {
     Map: Map,
  },
  topbar,
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused })=> (
     <TabBarIcon focused = {focused} name = "ios-map" />
  )

};

MapStack.path = '';


const tabNavigator = createBottomTabNavigator({
  DashStack,
  DonateStack,
  ChallengesStack,
  MapStack,
});

tabNavigator.path = '';

export default tabNavigator;
