import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { authContext } from '../AuthProvider';

const ProfileScreen = () => {
  const { profilePic } = useContext(authContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Image source={{ uri: profilePic, width: 150, height: 150 }} />
    </View>
  );
};

export default ProfileScreen;
