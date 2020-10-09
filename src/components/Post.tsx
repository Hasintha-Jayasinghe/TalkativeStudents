import React from 'react';
import {
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

interface Props {
  title: string;
  img: string;
  onPress: () => void;
}

const Post: React.FC<Props> = ({ title, img, onPress }) => {
  return (
    <Pressable style={styles.post} onPress={onPress}>
      <Text
        style={{
          color: 'white',
          padding: 10,
          fontSize: 18,
          fontWeight: 'bold',
          paddingBottom: 20,
        }}
      >
        {title}
      </Text>
      <Image
        source={{
          uri: img,
          width: width - 100,
          height: height / 3,
        }}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      />
      <StatusBar backgroundColor="red" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  post: {
    backgroundColor: 'red',
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
});

export default Post;
