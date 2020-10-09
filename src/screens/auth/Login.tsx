import React, { useContext } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../firebase';
import { authContext } from '../../AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';

type Error = {
  email?: string;
  password?: string;
};

const Login = () => {
  const { login } = useContext(authContext);

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
          Welcome back!
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
          Glad to see you back!
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => {
            const { email, password } = values;

            auth
              .signInWithEmailAndPassword(email.replace(/ /g, ''), password)
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
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                values.email.replace(/ /g, '')
              )
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
                  activeOpacity={0.9}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  <Text style={styles.btnText}>Login</Text>
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
    top: '10%',
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
    marginTop: '60%',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Login;
