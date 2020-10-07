import React, { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import ErrorText from '../../components/ErrorText';
import { authContext } from '../../AuthProvider';
import { auth, db } from '../../firebase';
import AsyncStorage from '@react-native-community/async-storage';

type Error = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};

const { width, height } = Dimensions.get('screen');

const Signup = () => {
  const { login } = useContext(authContext);

  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={{ ...styles.signupForm }}>
        <ScrollView
          style={{
            height: height / 2 + 50,
            width: width - 120,
          }}
        >
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            onSubmit={values => {
              setLoading(true);
              const { firstName, lastName, email, password } = values;
              auth
                .createUserWithEmailAndPassword(email, password)
                .then(userData => {
                  const uid = userData.user?.uid;
                  if (uid) {
                    db.collection('users')
                      .doc(String(uid))
                      .set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                      })
                      .then(() => {
                        AsyncStorage.setItem('userId', uid);
                        login(uid);
                      });
                  }
                })
                .catch(err => {
                  if (err.code === 'auth/email-already-in-use') {
                    Alert.alert('ERROR!', 'Email already in use');
                  }
                });
              setLoading(false);
            }}
            validate={values => {
              const errors: Error = {};
              if (!values.firstName) {
                errors.firstName = 'This field is required';
              } else if (!values.lastName) {
                errors.lastName = 'This field is required';
              } else if (!values.email) {
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
                  placeholder="First name"
                  style={styles.textField}
                  placeholderTextColor="white"
                  value={values.firstName}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  selectionColor="white"
                />
                <ErrorText text={errors.firstName} />
                <TextInput
                  placeholder="Last name"
                  style={styles.textField}
                  placeholderTextColor="white"
                  value={values.lastName}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  selectionColor="white"
                />
                <ErrorText text={errors.lastName} />
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
                  style={styles.signupBtn}
                  activeOpacity={0.9}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={styles.btnTxt}>Sign up!</Text>
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
  signupForm: {
    padding: 20,
    margin: 15,
    backgroundColor: 'red',
    borderRadius: 15,
    height: '90%',
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
  signupBtn: {
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

export default Signup;
