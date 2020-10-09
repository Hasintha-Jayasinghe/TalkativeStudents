import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  FlatList,
  RefreshControl,
} from 'react-native';
import Post from '../components/Post';
import { db } from '../firebase';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeParam } from './HomeParams';
import PostScreen from './PostScreen';
import { NavigationProp } from '@react-navigation/native';

type Post = { title: string; img: string; id: string; uid: string };

const HomeStack = createStackNavigator<HomeParam>();

const HomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<HomeParam, 'home'>;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(
        snapshot.docs.map(doc => {
          return {
            title: doc.data()?.title,
            img: doc.data()?.url,
            id: doc.id,
            uid: doc.data()?.uid,
          };
        })
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            colors={['red']}
            refreshing={refreshing}
            onRefresh={() => {
              db.collection('posts').onSnapshot(snapshot => {
                setPosts(
                  snapshot.docs.map(doc => {
                    return {
                      title: doc.data()?.title,
                      img: doc.data()?.url,
                      id: doc.id,
                      uid: doc.data()?.uid,
                    };
                  })
                );
              });
              setRefreshing(false);
            }}
          />
        }
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
                  uid: item.uid,
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
