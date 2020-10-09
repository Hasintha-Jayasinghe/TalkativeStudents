import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import AuthProvider from './src/AuthProvider';
import Routes from './src/Routes';
import { LogBox, Platform } from 'react-native';
import _ from 'lodash';
import * as ImagePicker from 'expo-image-picker';

LogBox.ignoreLogs(['Setting a timer', 'Animated', 'componentWillRecieveProps']);
const _console = _.clone(console);
console.warn = (message: any) => {
  if (
    message.indexOf('Setting a timer') <= -1 ||
    message.indexOf('Animated') <= -1 ||
    message.indexOf('componentWillRecieveProps')
  ) {
    _console.warn(message);
  }
};

export default function App() {
  useEffect(() => {
    const requestRollPermission = async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };
    const requestCamPermission = async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    };
    requestRollPermission();
    requestCamPermission();
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
