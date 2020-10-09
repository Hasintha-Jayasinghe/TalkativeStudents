import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Platform, FlatList } from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase';
import * as faker from 'faker';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParam } from './HomeParams';
import PostScreen from './PostScreen';
import { NavigationProp } from '@react-navigation/native';

type Post = { title: string; img: string; id: string };

const HomeStack = createStackNavigator<HomeParam>();

const HomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<HomeParam, 'home'>;
}) => {
  const [posts, setPosts] = useState<Post[]>([
    { title: 'I hate this kind of place', id: '0128', img: faker.image.city() },
    {
      title: 'I am so blessed to have her',
      id: '01d8',
      img: faker.image.animals(),
    },
    { title: 'He is soooo cute', id: '012358', img: faker.image.animals() },
    { title: 'Like for him', id: '0125f', img: faker.image.animals() },
    {
      title: 'Share to get home meds',
      id: '012af',
      img: faker.image.animals(),
    },
  ]);

  /*
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => {
          return { title: doc.data()?.title, img: doc.data()?.img, id: doc.id };
        })
      );
    });
  }, []);
  */

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={{ width: '100%', height: '100%' }}
        data={posts}
        renderItem={({ item }) => {
          return (
            <Post
              title={item.title}
              img={item.img}
              key={item.id}
              onPress={() => {
                navigation.navigate('post', {
                  id: item.id,
                  title: item.title,
                  img: item.img,
                });
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="home"
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <HomeStack.Screen
        name="post"
        component={PostScreen}
        options={{ header: () => null }}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

export default Home;
