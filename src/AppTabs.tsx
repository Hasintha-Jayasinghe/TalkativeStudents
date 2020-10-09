import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from './screens/HomeScreen';
import { AntDesign, Feather, Ionicons, Entypo } from '@expo/vector-icons';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';

const Tabs = createMaterialBottomTabNavigator<{
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
  Chat: undefined;
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
        component={Home}
        options={{
          tabBarIcon: ({ color }) => {
            return <AntDesign name="home" size={24} color={color} />;
          },
          tabBarColor: 'red',
        }}
      />
      <Tabs.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarColor: 'red',
          tabBarIcon: ({ color }) => {
            return <Entypo name="chat" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => {
            return <Ionicons name="ios-person" size={24} color={color} />;
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
          tabBarColor: 'red',
        }}
      />
    </Tabs.Navigator>
  );
};

export default AppTabs;
