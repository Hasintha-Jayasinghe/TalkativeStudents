import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { HomeParam } from './HomeParams';
import { Ionicons, AntDesign, Octicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

const PostScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<HomeParam, 'post'>;
  route: RouteProp<HomeParam, 'post'>;
}) => {
  const { id, title, img } = route.params;
  const [like, setLike] = useState<string>('like2');
  const [dislike, setDislike] = useState<string>('dislike2');

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
        <AntDesign
          name={like}
          color="red"
          size={34}
          onPress={() => setLike(like === 'like2' ? 'like1' : 'like2')}
        />
        <AntDesign
          name={dislike}
          color="red"
          size={34}
          onPress={() =>
            setDislike(dislike === 'dislike2' ? 'dislike1' : 'dislike2')
          }
        />
        <Octicons name="report" size={34} color="red" />
      </View>
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
});

export default PostScreen;
