import React, { useState, useEffect } from 'react';
import {
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import { db } from '../firebase';

const { width, height } = Dimensions.get('screen');

interface Props {
  title: string;
  img: string;
  onPress: () => void;
  id: string;
}

const Post: React.FC<Props> = ({ title, img, onPress, id }) => {
  const [profileUri, setProfileUri] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    db.collection('users')
      .doc(id)
      .get()
      .then(val => {
        setProfileUri(val.data()?.profilePic);
        setUsername(val.data()?.username);
      });
  }, []);

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
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          resizeMode="cover"
          source={{
            uri: img,
            width: width - 70,
            height: height / 2,
          }}
          style={{ alignSelf: 'center' }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: profileUri, width: 50, height: 50 }}
          style={{ borderRadius: 100, margin: 10 }}
        />
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>
          {username}
        </Text>
      </View>
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
