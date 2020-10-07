import 'react-native-gesture-handler';
import React from 'react';
import AuthProvider from './src/AuthProvider';
import Routes from './src/Routes';
import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message: any) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
