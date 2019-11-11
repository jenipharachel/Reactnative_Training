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
  render() {
    return (
      // <View>
      //   <Text>{this.props.navigation.getParam('title')}</Text>
      //   <Button
      //     title="Go to Home"
      //     onPress={() => this.props.navigation.navigate('Home')}
      //   />
      // </View>
      <View style={styles.container}>
        <View style={styles.row1}>
          <Image
            source={`https://image.tmdb.org/t/p/w500/${this.props.navigation.getParam(
              'img',
            )}`}
            style={styles.image}
          />
        </View>
        <View style={styles.row2}>
          <View style={styles.title}>
            <Text style={styles.boldText}>
              {this.props.navigation.getParam('title')}
            </Text>
          </View>
          <View style={styles.desc}>
            <Text>{this.props.navigation.getParam('desc')}</Text>
            <Text>Avg. Vote: {this.props.navigation.getParam('avgvote')}</Text>
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
