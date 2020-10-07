import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../firebase';
import { authContext } from '../../AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';

type Error = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

const { width, height } = Dimensions.get('screen');

const Login = () => {
  const { login } = useContext(authContext);

  return (
    <>
      <View style={{ ...styles.loginForm }}>
        <ScrollView
          style={{
            height: height / 2 + 50,
            width: width - 120,
          }}
        >
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={values => {
              const { email, password } = values;

              auth
                .signInWithEmailAndPassword(email, password)
                .then(data => {
                  if (data.user?.uid) {
                    AsyncStorage.setItem('userId', data.user?.uid);
                    login(String(data.user?.uid));
                  }
                })
                .catch(err => {
                  if (err.code === 'auth/user-not-found') {
                    Alert.alert('ERROR!', 'No user with this email');
                  } else if (err.code === 'auth/wrong-password') {
                    Alert.alert('ERROR!', 'Incorrect password');
                  }
                });
            }}
            validate={values => {
              const errors: Error = {};
              if (!values.email) {
                errors.email = 'This field is required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Enter a valid email';
              } else if (!values.password) {
                errors.password = 'This field is required';
              } else if (values.password.length < 6) {
                errors.password = 'You need 6 characters here';
              }

              return errors;
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <TextInput
                  placeholder="Email"
                  style={styles.textField}
                  placeholderTextColor="white"
                  textContentType="emailAddress"
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onBlur={handleBlur('email')}
                  selectionColor="white"
                />
                <ErrorText text={errors.email} />
                <TextInput
                  placeholder="Password"
                  style={styles.textField}
                  placeholderTextColor="white"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('email')}
                  selectionColor="white"
                />
                <ErrorText text={errors.password} />

                <TouchableOpacity
                  style={styles.loginBtn}
                  activeOpacity={0.9}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={styles.btnTxt}>Login!</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  loginForm: {
    padding: 20,
    margin: 15,
    backgroundColor: 'red',
    borderRadius: 15,
    height: '70%',
    width: width - 100,
    alignItems: 'center',
    marginBottom: height / 2 - 170,
    alignSelf: 'center',
  },
  textField: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    margin: 10,
    width: '95%',
    color: 'white',
    borderRadius: 10,
  },
  loginBtn: {
    padding: 15,
    margin: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    bottom: height - 740,
    width: '90%',
  },
  btnTxt: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default Login;
