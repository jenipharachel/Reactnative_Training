/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';

export default class App extends Component {
  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.col1}>
              <Image
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/en/c/c9/Replicas_poster.jpg',
                }}
                style={styles.image}
              />
            </View>
            <View style={styles.col2}>
              <View style={styles.title}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>REPLICAS</Text>
              </View>
              <View style={styles.desc}>
                {/* <FontAwesomeIcon icon={faCoffee} /> */}
                <Text>2h 3min </Text>
                <Text> Thriller/Mystery</Text>
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
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flex: 0.3,
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
