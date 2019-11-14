import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

export default class MovieDetails extends Component {
  // static navigationOptions = {
  //   title: this.props.navigation.getParam('title'),
  // };

  render() {
    uri = `https://image.tmdb.org/t/p/w500/${this.props.navigation.getParam(
      'poster_path',
    )}`;
    console.log(uri);
    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Image source={{uri}} style={styles.image} />
        </View>
        <View style={styles.row2}>
          <View style={styles.title}>
            <Text style={styles.boldText}>
              {this.props.navigation.getParam('title')}
            </Text>
          </View>
          <View style={styles.desc}>
            <Text>{this.props.navigation.getParam('overview')}</Text>
            <Text>
              Avg. Vote: {this.props.navigation.getParam('vote_average')}
            </Text>
            <Text>
              Release Date: {this.props.navigation.getParam('release_date')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row1: {
    flex: 0.4,
    justifyContent: 'center',
  },
  row2: {
    flex: 0.6,
  },
  image: {
    flex: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  title: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  desc: {
    flex: 0.6,
    justifyContent: 'space-evenly',
  },
});
