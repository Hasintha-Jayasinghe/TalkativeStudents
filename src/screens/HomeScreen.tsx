import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { authContext } from '../AuthProvider';

const HomeScreen = () => {
  const { logout } = useContext(authContext);

  return (
    <View style={styles.container}>
      <Text
        onPress={() => {
          logout();
        }}
      >
        Home
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
