// App.js
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigation from './src/AppNavigation';
import theme from './src/styles/theme';

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />

      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </>
  );
}
