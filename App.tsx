import 'react-native-gesture-handler';
import React from 'react';
import AuthProvider from './src/AuthProvider';
import Routes from './src/Routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
