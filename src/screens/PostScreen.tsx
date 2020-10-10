import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { HomeParam } from './HomeParams';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { authContext } from '../AuthProvider';
import { Snackbar } from 'react-native-paper';
import { db } from '../firebase';

const { width, height } = Dimensions.get('screen');

type POSTDOC = { img: string; likes: number; dislikes: number; title: string };

const PostScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<HomeParam, 'post'>;
  route: RouteProp<HomeParam, 'post'>;
}) => {
  const { id, title, img, uid } = route.params;
  const [sVisible, setSVisible] = useState<boolean>(false);
  const { userId } = useContext(authContext);

  // Check if you have already liked/disliked the post
  const [liked, setLiked] = useState<boolean>(true);
  const [disliked, setDisliked] = useState<boolean>(true);

  // Get the post as a database reference
  const dbRef = db.collection('posts').doc(id);

  const [like, setLike] = useState<string>(liked ? 'like1' : 'like2');
  const [dislike, setDislike] = useState<string>('dislike2');

  // Ratings of current post
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);

  // Loaded data
  const [loaded, setLoaded] = useState<boolean>(false);

  useMemo(() => {
    dbRef.onSnapshot(snapshot => {
      const data = snapshot.data() as POSTDOC;
      setLikes(data.likes);
      setDislikes(data.dislikes);
    });
    dbRef
      .collection('ratings')
      .doc(String(userId))
      .get()
      .then(val => {
        if (val.exists) {
          const data = val.data();
          if (data?.rating === 'dislike') {
            setDisliked(true);
          } else if (data?.rating === 'like') {
            setLiked(true);
          }
        }
      });
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="ios-arrow-round-back"
          size={44}
          color="white"
          style={{ bottom: '10%' }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
      <Image source={{ uri: img, width: width - 20, height: height / 3 }} />
      <View style={styles.btnPane}>
        <View style={styles.ratingPane}>
          <AntDesign
            name={like}
            color="red"
            size={34}
            onPress={() => {
              if (uid !== userId) {
                // setLike(like === 'like2' ? 'like1' : 'like2');
                if (like === 'like2') {
                  dbRef
                    .collection('ratings')
                    .doc(String(userId))
                    .set({ rating: 'like' });
                  dbRef.update({ likes: likes + 1 });
                  setLike('like1');
                } else {
                  dbRef.collection('ratings').doc(String(userId)).delete();
                  dbRef.update({ likes: likes - 1 });
                  setLike('like2');
                }
              } else {
                setSVisible(true);
              }
            }}
          />
          <Text style={styles.rating}>{likes}</Text>
        </View>
        <View style={styles.ratingPane}>
          <AntDesign
            name={dislike}
            color="red"
            size={34}
            onPress={() => {
              if (uid !== userId) {
                // setDislike(dislike === 'dislike2' ? 'dislike1' : 'dislike2');
                if (dislike === 'dislike2') {
                  setDislike('dislike1');
                  dbRef
                    .collection('ratings')
                    .doc(String(userId))
                    .set({ rating: 'dislike' });
                  dbRef.update({ dislikes: dislikes + 1 });
                } else {
                  setDislike('dislike2');
                  dbRef.collection('ratings').doc(String(userId)).delete();
                  dbRef.update({ dislikes: dislikes - 1 });
                }
              } else {
                setSVisible(true);
              }
            }}
          />
          <Text style={styles.rating}>{dislikes}</Text>
        </View>
      </View>
      <Snackbar visible={sVisible} onDismiss={() => setSVisible(false)}>
        <Text>You can't rate your own post</Text>
      </Snackbar>
      <StatusBar backgroundColor="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  text: {
    alignSelf: 'flex-start',
    padding: 20,
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    bottom: '10%',
  },
  header: {
    padding: 20,
    backgroundColor: 'red',
    width: '100%',
    marginBottom: 20,
    bottom: '4%',
    height: '25%',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  btnPane: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    margin: 20,
    padding: 20,
  },
  rating: {
    fontSize: 16,
    opacity: 0.5,
    color: 'gray',
  },
  ratingPane: {
    alignItems: 'center',
  },
});

export default PostScreen;
