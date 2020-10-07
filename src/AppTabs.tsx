import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import { AntDesign, Feather } from '@expo/vector-icons';
import SettingsScreen from './screens/SettingsScreen';

const Tabs = createMaterialBottomTabNavigator<{
  Home: undefined;
  Settings: undefined;
}>();

const AppTabs = () => {
  return (
    <Tabs.Navigator
      activeColor="white"
      inactiveColor="white"
      barStyle={{ backgroundColor: 'red' }}
      shifting
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <AntDesign name="home" size={24} color={color} />;
          },
          tabBarColor: 'red',
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Feather name="settings" size={24} color={color} />
          ),
          tabBarColor: 'green',
        }}
      />
    </Tabs.Navigator>
  );
};

export default AppTabs;
