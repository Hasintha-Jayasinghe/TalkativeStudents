import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './AppTabs';
import { authContext } from './AuthProvider';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParams } from './AuthParams';
import Prompt from './screens/auth/Prompt';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';

const AuthStack = createStackNavigator<AuthParams>();

const Routes = () => {
  const { loggedIn } = useContext(authContext);

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
            }}
          />
          <AuthStack.Screen
            name="signup"
            component={Signup}
            options={{ headerTitle: 'Sign Up' }}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Routes;
