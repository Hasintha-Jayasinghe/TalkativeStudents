import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ErrorTextProps {
  text: string | null | undefined;
}

const ErrorText: React.FC<ErrorTextProps> = ({ text }) => {
  return <Text style={styles.err}>! {text}</Text>;
};

const styles = StyleSheet.create({
  err: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ErrorText;
