/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Header from './src/components/Header';
import Movies from './src/components/Movies';
import MovieDetails from './src/components/MovieDetails';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import _ from 'lodash';

class App extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    isLoading: true,
    dataSource: [],
    fetching_from_server: false,
    filterLanguage: '',
  };

  offset = 1;

  //LifeCycle methods
  componentDidMount() {
    return fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=f9340678aa6a61a60578f56c8f272f61&page=1',
    )
      .then(response => response.json())
      .then(responseJson => {
        this.offset = this.offset + 1;
        this.setState({
          isLoading: false,
          //   dataSource: responseJson.results,
          dataSource: [...this.state.dataSource, ...responseJson.results],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Custom methods
  loadMoreData = () => {
    this.setState({fetching_from_server: true}, () => {
      fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=f9340678aa6a61a60578f56c8f272f61&page=' +
          this.offset,
      )
        .then(response => response.json())
        .then(responseJson => {
          this.offset = this.offset + 1;
          this.setState({
            dataSource: [...this.state.dataSource, ...responseJson.results],
            fetching_from_server: false,
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  sortByKey = key => {
    const {dataSource} = this.state;
    const clonedData = _.orderBy(dataSource, [key], ['desc']);
    this.setState({dataSource: clonedData});
  };

  moviesRender = () => {
    const {dataSource, filterLanguage} = this.state;
    if (filterLanguage == '') {
      return dataSource;
    } else {
      const clonedData = _.filter(
        dataSource,
        item => item.original_language == filterLanguage,
      );
      return _.orderBy(clonedData, ['vote_count'], ['desc']);
    }
  };

  setFilter = key => {
    const filterLanguage = key;
    console.log(key);
    this.setState({filterLanguage});
  };

  render() {
    return (
      <>
        <Header sortByKey={this.sortByKey} setFilter={this.setFilter} />
        <Movies
          navigation={this.props.navigation}
          loadMoreData={this.loadMoreData}
          isLoading={this.state.isLoading}
          movies={this.moviesRender()}
          fetching_from_server={this.state.fetching_from_server}
        />
      </>
    );
  }
}

const AppNavigator = createStackNavigator({
  Home: App,
  Details: MovieDetails,
});

export default createAppContainer(AppNavigator);
