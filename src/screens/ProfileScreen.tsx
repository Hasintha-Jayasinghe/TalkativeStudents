import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { authContext } from '../AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { db, uploadImg } from '../firebase';

const ProfileScreen = () => {
  const {
    profilePic,
    username,
    userId,
    updateProfile,
    email,
    followers,
    updateFollowers,
  } = useContext(authContext);

  // If uploading we want to display a spinner
  const [uploading, setUploading] = useState<boolean>(false);

  // State of the image load
  const [imgLoaded, setImgLoaded] = useState<boolean>(false);

  // Refreshing state
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const pickImg = async () => {
    setUploading(true);
    setImgLoaded(false);
    let result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (!result.cancelled) {
      const url = await uploadImg(result.uri, String(userId));
      db.collection('users').doc(String(userId)).update({ profilePic: url });
      updateProfile();
      setImgLoaded(true);
    }
    setUploading(false);
  };

  if (uploading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            updateFollowers();
            setRefreshing(false);
          }}
          colors={['red']}
        />
      }
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>
          Profile
        </Text>
      </View>
      <TouchableOpacity
        style={styles.profileImg}
        activeOpacity={0.8}
        onPress={pickImg}
      >
        <Image
          source={{ uri: profilePic, width: 150, height: 150 }}
          borderRadius={260}
          onLoadEnd={() => {
            setImgLoaded(true);
          }}
          onLoadStart={() => {
            setImgLoaded(false);
          }}
        />
        {imgLoaded === false && (
          <View style={{ bottom: '50%' }}>
            <ActivityIndicator color="red" size="large" />
          </View>
        )}
      </TouchableOpacity>
      <View style={{ bottom: '14%', alignItems: 'center' }}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.followers}>Followers: {followers}</Text>
      </View>
      <View style={styles.btnPane}>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>
            Post
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>
            Update status
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.dataPane}>
        <TouchableOpacity style={styles.dataBtn} onPress={() => {}}>
          <Text>Username</Text>
          <Text>{username}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dataBtn} onPress={() => {}}>
          <Text>Email</Text>
          <Text>{email}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
    padding: 20,
    margin: 10,
    width: '100%',
    bottom: '2%',
    height: '20%',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  profileImg: {
    borderRadius: 100,
    bottom: '13%',
    borderWidth: 7,
    borderColor: 'white',
    overflow: 'hidden',
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  btnPane: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    bottom: '10%',
    padding: 20,
  },
  btn: {
    backgroundColor: 'red',
    padding: 20,
    margin: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
  },
  dataPane: {
    width: '100%',
    padding: 20,
    bottom: '10%',
  },
  dataBtn: {
    backgroundColor: '#e6e6e6',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  followers: {
    opacity: 0.8,
    color: 'gray',
    fontSize: 18,
  },
});

export default ProfileScreen;
