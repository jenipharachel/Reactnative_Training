/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    uri: 'https://upload.wikimedia.org/wikipedia/en/c/c9/Replicas_poster.jpg',
    title: 'REPLICAS',
    desc: {
      time: '1h 50min',
      genre: 'Thriller/Mystery',
    },
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    uri: 'https://images-na.ssl-images-amazon.com/images/I/71B6XKhyTaL.jpg',
    title: 'The Last Song',
    desc: {
      time: '1h 45min',
      genre: 'Tragedy/Romance',
    },
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    uri: 'https://images-na.ssl-images-amazon.com/images/I/A1c9bOWb6RL.jpg',
    title: 'The Fault in Our Stars',
    desc: {
      time: '1h 30min',
      genre: 'Tragedy/Romance',
    },
  },
];

function Item({uri, title, desc}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col1}>
            <Image source={{uri}} style={styles.image} />
          </View>
          <View style={styles.col2}>
            <View style={styles.title}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
            </View>
            <View style={styles.desc}>
              {/* <FontAwesomeIcon icon={faCoffee} /> */}
              <Text>{desc.time}</Text>
              <Text> {desc.genre}</Text>
            </View>
            <View style={styles.screen}>
              <Text style={styles.border}>IMAX</Text>
              <Text style={styles.border}>4D</Text>
              <Text style={styles.border}>3D</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item title={item.title} desc={item.desc} uri={item.uri} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // justifyContent: 'center',
  },
  row: {
    flex: 0.4,
    height: 200,
    flexDirection: 'row',
  },
  col1: {
    flex: 0.4,
    justifyContent: 'center',
  },
  col2: {
    flex: 0.6,
  },
  image: {
    flex: 0.9,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  screen: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  border: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
  },
});
