/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Landing from './screens/Landing';
import SignIn from './screens/SignIn';
import Home from './screens/Home';
import ViewMeters from './screens/ViewMeters';
import Users from './screens/Users';
import Notifications from './screens/Notifications';
import PasswordReset from './screens/PasswordReset';
import MeterDetails from './screens/MeterDetails';
import {createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';

class App extends React.Component {
  render(){
  return (
        <AppNavigator />
  );
  };
};
const HomeTab = createStackNavigator({
  HomePage: Home,
});
const MetersTab = createStackNavigator({
  MetersPage: ViewMeters,
  DetailsScreen:MeterDetails,
});const UsersTab = createStackNavigator({
  UsersPage: Users,
});
const NotificationsTab = createStackNavigator({
  NotificationsPage: Notifications,
});
const MainNavigation = createBottomTabNavigator({
  Home:HomeTab,
  Meters:MetersTab,
  Users:UsersTab,
  Notifications:NotificationsTab
})
const AppNavigator = createSwitchNavigator({
  LandingPage: Landing,
  SignInPage: SignIn,
  PasswordResetPage:PasswordReset,
  Main:MainNavigation,

})

export default App;
