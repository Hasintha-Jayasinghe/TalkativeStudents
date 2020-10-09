import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { db } from './firebase';

export const authContext = createContext<{
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
  loggedIn: boolean;
  profilePic: string;
}>({
  userId: '',
  login: () => {},
  logout: () => {},
  loggedIn: false,
  profilePic: '',
});

interface Props {
  children: any;
}

type USERDOC = { email: string; username: string; profilePic: string };

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>('');

  return (
    <authContext.Provider
      value={{
        userId: userId,
        login: id => {
          db.collection('users')
            .doc(id)
            .get()
            .then(data => {
              const userD = data.data() as USERDOC;
              setProfilePic(userD.profilePic);
            });
          setLoggedIn(true);
          setUserId(id);
        },
        logout: () => {
          AsyncStorage.removeItem('userId');
          setLoggedIn(false);
          setUserId(null);
        },
        loggedIn: loggedIn,
        profilePic: profilePic,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
