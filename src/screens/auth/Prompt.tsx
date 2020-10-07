import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { AuthParams } from '../../AuthParams';

const { width } = Dimensions.get('screen');

const PROMPT_WIDTH = width - 100;

const Prompt = ({
  navigation,
}: {
  navigation: NavigationProp<AuthParams, 'prompt'>;
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.text}>Login or Sign up</Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('login');
            }}
          >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => {
              navigation.navigate('signup');
            }}
          >
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    margin: 15,
    backgroundColor: 'red',
    borderRadius: 15,
    height: '50%',
    width: PROMPT_WIDTH,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
  },
  btnText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Prompt;
