import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import SelectImageScreen from './screens/SelectImageScreen';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';


export default function App() {

  // var firebaseConfig = {
  //   apiKey: "AIzaSyBBk3Cu5AgewlBKgAO7myJ55spzhBPy4dY",
  //   authDomain: "mozn-task.firebaseapp.com",
  //   projectId: "mozn-task",
  //   storageBucket: "mozn-task.appspot.com",
  //   messagingSenderId: "235948660880",
  //   appId: "1:235948660880:web:60e70a4762f64d7e562015",
  //   measurementId: "G-SKZCCJDGWD"
  // };
  // firebase.initializeApp(firebaseConfig);
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>

  );
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  SelectImage: {
    screen: SelectImageScreen
  },
}, {
  initialRouteName: "Home"
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});