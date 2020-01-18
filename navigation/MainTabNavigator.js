import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import Dashboard from '../screens/Dashboard';
import ChallengesScreen from '../screens/Challenges';
import SettingsScreen from '../screens/SettingsScreen';

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
      fontSize: '20',
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

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  topbar,
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  DashStack,
  ChallengesStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
