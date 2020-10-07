import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

const Signup = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <View style={{ ...styles.signupForm }}>
        <ScrollView
          style={{
            height: height / 2,
            width: width - 120,
          }}
        >
          <TextInput
            placeholder="First name"
            style={styles.textField}
            placeholderTextColor="white"
            value={firstName}
            onChangeText={text => {
              setFirstName(text);
            }}
          />
          <TextInput
            placeholder="Last name"
            style={styles.textField}
            placeholderTextColor="white"
            value={lastName}
            onChangeText={text => {
              setLastName(text);
            }}
          />
          <TextInput
            placeholder="Email"
            style={styles.textField}
            placeholderTextColor="white"
            textContentType="emailAddress"
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.textField}
            placeholderTextColor="white"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.signupBtn} activeOpacity={0.9}>
        <Text style={styles.btnTxt}>Sign up!</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  signupForm: {
    padding: 20,
    margin: 15,
    backgroundColor: 'red',
    borderRadius: 15,
    height: '50%',
    width: width - 100,
    alignItems: 'center',
    marginBottom: height / 2 - 170,
    alignSelf: 'center',
  },
  textField: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 15,
    margin: 10,
    width: '95%',
    color: 'white',
  },
  signupBtn: {
    padding: 15,
    margin: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 100,
    alignSelf: 'center',
    borderRadius: 10,
    bottom: height - 700,
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Signup;
