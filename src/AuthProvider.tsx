import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { db } from './firebase';

export const authContext = createContext<{
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
  loggedIn: boolean;
  profilePic: string;
  username: string;
  updateProfile: () => void;
  email: string;
  followers: number;
  updateFollowers: () => void;
}>({
  userId: '',
  login: () => {},
  logout: () => {},
  loggedIn: false,
  profilePic: '',
  username: '',
  updateProfile: () => {},
  email: '',
  followers: 0,
  updateFollowers: () => {},
});

interface Props {
  children: any;
}

type USERDOC = {
  email: string;
  username: string;
  profilePic: string;
  followers: number;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [followers, setFollowers] = useState<number>(0);

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
              setUsername(userD.username);
              setEmail(userD.email);
              setFollowers(userD.followers);
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
        username: username,
        updateProfile: () => {
          db.collection('users')
            .doc(String(userId))
            .get()
            .then(data => {
              const userD = data.data() as USERDOC;
              setProfilePic(userD.profilePic);
            });
        },
        email: email,
        followers: followers,
        updateFollowers: () => {
          db.collection('users')
            .doc(String(userId))
            .get()
            .then(data => {
              const userData = data.data() as USERDOC;
              setFollowers(userData.followers);
            });
        },
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
