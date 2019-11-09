import React, {Component} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';

// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {faCoffee} from '@fortawesome/free-solid-svg-icons';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     uri: 'https://upload.wikimedia.org/wikipedia/en/c/c9/Replicas_poster.jpg',
//     title: 'REPLICAS',
//     desc: {
//       time: '1h 50min',
//       genre: 'Thriller/Mystery',
//     },
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     uri: 'https://images-na.ssl-images-amazon.com/images/I/71B6XKhyTaL.jpg',
//     title: 'The Last Song',
//     desc: {
//       time: '1h 45min',
//       genre: 'Tragedy/Romance',
//     },
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     uri: 'https://images-na.ssl-images-amazon.com/images/I/A1c9bOWb6RL.jpg',
//     title: 'The Fault in Our Stars',
//     desc: {
//       time: '1h 30min',
//       genre: 'Tragedy/Romance',
//     },
//   },
// ];

function Item({uri, title, lang, votes, release}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.col1}>
            <Image source={{uri}} style={styles.image} />
          </View>
          <View style={styles.col2}>
            <View style={styles.title}>
              <Text style={styles.boldText}>{title}</Text>
            </View>
            <View style={styles.desc}>
              <Text>{lang}</Text>
              <Text> {votes}</Text>
              <Text> {release}</Text>
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

export default class Movies extends Component {
  renderFooter() {
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
  }

  render() {
    return this.props.isLoading || this.props.dataSource == [] ? (
      <View style={(styles.container, styles.title)}>
        <Text style={styles.boldText}>The Page is Loading</Text>
      </View>
    ) : (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={this.props.moviesRender}
          // renderItem={data => this.props.renderMovies(data)}
          renderItem={({item}) => (
            <Item
              title={item.title}
              lang={item.original_language}
              votes={item.vote_count}
              release={item.release_date}
              uri={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            />
          )}
          keyExtractor={item => item.id}
          ListFooterComponent={this.renderFooter.bind(this)}
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
