import {View, Text} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigators/MainNavigator';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
