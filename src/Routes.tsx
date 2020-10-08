import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './AppTabs';
import { authContext } from './AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParams } from './AuthParams';
import Prompt from './screens/auth/Prompt';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const AuthStack = createStackNavigator<AuthParams>();

const Routes = () => {
  const { loggedIn, login } = useContext(authContext);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    AsyncStorage.getItem('userId').then(val => {
      if (val) {
        login(String(val));
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1350);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={75} color="red" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {loggedIn ? (
        <AppTabs />
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen
            name="prompt"
            component={Prompt}
            options={{ header: () => null }}
          />
          <AuthStack.Screen
            name="login"
            component={Login}
            options={{
              headerTitle: 'Login',
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'red' },
              headerBackTitle: 'Back',
            }}
          />
          <AuthStack.Screen
            name="signup"
            component={Signup}
            options={{
              headerTitle: 'Sign Up',
              headerTintColor: 'white',
              headerStyle: { backgroundColor: 'red' },
              headerBackTitle: 'Back',
            }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
