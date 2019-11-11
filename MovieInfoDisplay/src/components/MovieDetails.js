import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Image,
} from 'react-native';

export default class MovieDetails extends Component {
  // static navigationOptions = {
  //   title: this.props.navigation.getParam('title'),
  // };

  // {
  //   imgpath: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
  //   title: movie.title,
  //   desc: movie.overview,
  //   avgvote: movie.vote_average,
  //   release: movie.release_date,
  // }

  render() {
    console.log(this);
    imgsrc = `https://image.tmdb.org/t/p/w500/${this.props.navigation.getParam(
      'poster_path',
    )}`;
    console.log(imgsrc);
    return (
      <View style={styles.container}>
        <View style={styles.row1}>
          <Image source={{imgsrc}} style={styles.image} />
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
    flex: 0.9,
    borderRadius: 20,
    alignItems: 'center',
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
