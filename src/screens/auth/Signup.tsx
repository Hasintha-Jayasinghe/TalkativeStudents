import React, { useContext, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import ErrorText from '../../components/ErrorText';
import { auth, db } from '../../firebase';
import { authContext } from '../../AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';

type Error = {
  email?: string;
  username?: string;
  password?: string;
};

type USERD = {
  email: string;
  username: string;
  profilePic: string;
  followers: number;
};

const Signup = () => {
  const { login } = useContext(authContext);
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            fontWeight: 'bold',
            alignSelf: 'center',
            top: '5%',
          }}
        >
          Hello there!
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center',
            top: '5%',
          }}
        >
          We're happy you decided to join us!
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
          }}
          onSubmit={values => {
            setLoading(true);
            const { email, password, username } = values;

            auth
              .createUserWithEmailAndPassword(email.replace(/ /g, ''), password)
              .then(data => {
                if (data.user?.uid) {
                  AsyncStorage.setItem('userId', data.user?.uid);
                  login(String(data.user?.uid));
                  db.collection('users').doc(String(data.user?.uid)).set({
                    email: email,
                    username: username,
                    followers: 0,
                    profilePic:
                      'https://firebasestorage.googleapis.com/v0/b/talkative-students.appspot.com/o/default.png?alt=media&token=1b25fa41-daeb-4e8c-af06-6bbc81fe6231',
                  });
                }
              })
              .catch(err => {
                console.log(err.code);
                if (err.code === 'auth/email-already-in-use') {
                  Alert.alert('ERROR!', 'Email already in use!');
                }
              });
            setLoading(false);
          }}
          validate={values => {
            const errors: Error = {};
            if (!values.email) {
              errors.email = 'This field is required';
            } else if (!values.username) {
              errors.username = 'This field is required';
            } else if (
              !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                values.email.replace(/ /g, '')
              )
            ) {
              errors.email = 'Enter a valid email';
            } else if (!values.password) {
              errors.password = 'This field is required';
            } else if (values.password.length < 6) {
              errors.password = 'You need 6 characters here';
            }
            db.collection('users')
              .get()
              .then(data => {
                data.docs.map(doc => {
                  const data = doc.data() as USERD;
                  if (data.username === values.username) {
                    Alert.alert('ERROR!', 'This username is already taken');
                  }
                });
              });

            return errors;
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <ScrollView style={styles.form}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                enabled={Platform.OS === 'ios' ? true : false}
              >
                <TextInput
                  style={styles.textField}
                  placeholder="Email"
                  selectionColor="red"
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                {errors.email && <ErrorText text={errors.email} />}
                <TextInput
                  style={{ ...styles.textField, marginTop: 45 }}
                  placeholder="Username"
                  selectionColor="red"
                  onBlur={handleBlur('username')}
                  value={values.username}
                  onChangeText={handleChange('username')}
                />
                {errors.username && <ErrorText text={errors.username} />}
                <TextInput
                  style={{ ...styles.textField, marginTop: 45 }}
                  placeholder="Password"
                  secureTextEntry
                  selectionColor="red"
                  onBlur={handleBlur('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                {errors.password && <ErrorText text={errors.password} />}

                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleSubmit()}
                  activeOpacity={0.5}
                >
                  <Text style={styles.btnText}>Sign up</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          )}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  form: {
    flex: 0.8,
    backgroundColor: 'white',
    top: '15%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 15,
  },
  textField: {
    padding: 8,
    margin: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    color: 'red',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'red',
    marginTop: '30%',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Signup;
