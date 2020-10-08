import AsyncStorage from '@react-native-community/async-storage';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { authContext } from '../AuthProvider';

const SettingsScreen = () => {
  const { logout } = useContext(authContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => {
          AsyncStorage.removeItem('userId');
          logout();
        }}
      >
        LOGOUT
      </Text>
    </View>
  );
};

export default SettingsScreen;
