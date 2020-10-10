import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { ProfileParam } from './ProfileParams';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { db, uploadPostImage } from '../firebase';
import { authContext } from '../AuthProvider';

const UploadPostScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<ProfileParam, 'postUpload'>;
  route: RouteProp<ProfileParam, 'postUpload'>;
}) => {
  const { uri } = route.params;
  const [title, setTitle] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const { userId } = useContext(authContext);

  if (uploading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <>
      <Image
        source={{ uri: uri, width: 0, height: 0 }}
        style={{ height: '40%', width: '100%' }}
      />
      <View style={styles.pane}>
        <TextInput
          placeholder="Title"
          style={styles.textField}
          selectionColor="red"
          value={title}
          onChangeText={text => {
            setTitle(text);
          }}
        />
        <Text style={{ fontWeight: 'bold' }}>{err}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            if (title !== '') {
              setUploading(true);
              const url = await uploadPostImage(uri);
              db.collection('posts').add({
                title: title,
                url: url,
                uid: userId,
                likes: 0,
                dislikes: 0,
              });
              setUploading(false);
              Alert.alert('DONE', 'You have successfully posted');
              navigation.goBack();
            } else {
              setErr('! This field is required');
            }
          }}
        >
          <Text style={styles.btnText}>Post</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pane: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
  },
  btn: {
    padding: 20,
    backgroundColor: 'red',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textField: {
    padding: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    color: 'red',
    alignItems: 'center',
  },
});

export default UploadPostScreen;
