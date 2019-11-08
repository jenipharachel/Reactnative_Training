/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import _ from 'lodash';
import Header from './src/components/Header';
import Movies from './src/components/Movies';

export default class App extends Component {
  state = {
    isLoading: true,
    dataSource: [],
    fetching_from_server: false,
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

  sortByKey = () => {
    // console.log(key);
    const {dataSource} = this.state;
    var clonedData = dataSource.map(item => ({...item}));
    // clonedData.sort(compare);
    clonedData = _.orderBy(clonedData, ['vote_count'], ['desc']);
    this.setState({dataSource: clonedData});

    // function compare(a, b) {
    //   if (a[key] < b[key]) return -1;
    //   if (a[key] > b[key]) return 1;
    //   return 0;
    // }
  };

  // renderData = () => {
  //   const {dataSource} = this.State;
  //   return (
  //     <View>
  //       <Movies value={{value: dataSource}} sortByKey={this.sortByKey} />
  //     </View>
  //   );
  // };

  render() {
    return (
      <>
        <Header sortByKey={this.sortByKey} />
        <Movies
          loadMoreData={this.loadMoreData}
          isLoading={this.state.isLoading}
          dataSource={this.state.dataSource}
          fetching_from_server={this.state.fetching_from_server}
        />
      </>
    );
  }
}
