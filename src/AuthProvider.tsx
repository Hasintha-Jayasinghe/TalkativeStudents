import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const authContext = createContext<{
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
  loggedIn: boolean;
}>({ userId: '', login: () => {}, logout: () => {}, loggedIn: false });

interface Props {
  children: any;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <authContext.Provider
      value={{
        userId: userId,
        login: id => {
          setLoggedIn(true);
          setUserId(userId);
        },
        logout: () => {
          AsyncStorage.removeItem('userId');
          setLoggedIn(false);
          setUserId(null);
        },
        loggedIn: loggedIn,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
