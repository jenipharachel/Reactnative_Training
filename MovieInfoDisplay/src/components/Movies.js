import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import Item from './Item';

export default class Movies extends Component {
  viewMovie = (movie, uri) => {
    console.log('viewing movie detail', movie);
    this.props.navigation.push('Details', {...movie});
  };

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.props.loadMoreData}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {this.props.fetching_from_server ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return this.props.isLoading ? (
      <View style={(styles.container, styles.title)}>
        <ActivityIndicator color="black" style={{alignSelf: 'center'}} />
        <Text style={styles.boldText}>The Page is Loading</Text>
      </View>
    ) : (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          initialNumToRender={10}
          // refreshing={this.state.refreshing}
          // onEndReachedThreshold={0.5}
          onEndThreshold={10}
          onEndReached={({distanceFromEnd}) => {
            console.log('on end reached ', distanceFromEnd);
          }}
          data={this.props.movies}
          renderItem={({item}) => (
            <Item
              viewMovie={this.viewMovie}
              movie={item}
              id={item.id}
              uri={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            />
          )}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListFooterComponent={this.renderFooter}
          //Adding Load More button as footer component
        />
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    resizeMode: 'contain',
  },
  title: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
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
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
