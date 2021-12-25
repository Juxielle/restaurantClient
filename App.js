import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from './Navigation/StackNavigator';
import { Provider } from 'react-redux'
import Store from './store/ConfigureStore'

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
}