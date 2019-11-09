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

export default class App extends Component {
  state = {
    isLoading: true,
    dataSource: [],
    fetching_from_server: false,
    filterLanguage: '',
  };

  offset = 1;

  //LifeCycle methods
  async componentDidMount() {
    try {
      let response = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=f9340678aa6a61a60578f56c8f272f61&page=1',
      );
      let responseJson = await response.json();
      this.offset = this.offset + 1;
      this.setState({
        isLoading: false,
        //   dataSource: responseJson.results,
        dataSource: [...this.state.dataSource, ...responseJson.results],
      });
    } catch (error) {
      console.error(error);
    }
    // return fetch(
    //   'https://api.themoviedb.org/3/movie/popular?api_key=f9340678aa6a61a60578f56c8f272f61&page=1',
    // )
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.offset = this.offset + 1;
    //     this.setState({
    //       isLoading: false,
    //       //   dataSource: responseJson.results,
    //       dataSource: [...this.state.dataSource, ...responseJson.results],
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
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
    const clonedData = dataSource.map(item => ({...item}));
    clonedData.sort(compare);
    // const clonedData = _.orderBy(dataSource, ['vote_count'], ['desc']);
    this.setState({dataSource: clonedData});

    function compare(a, b) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    }
  };

  moviesRender = () => {
    const {dataSource, filterLanguage} = this.state;
    if (dataSource === []) {
      this.setState({isLoading: true});
    } else {
      if (filterLanguage === '') {
        return dataSource;
      } else {
        const clonedData = dataSource.filter(
          item => item.original_language == filterLanguage,
        );
        return clonedData;
      }
    }
  };

  // filterByKey = key => {
  //   const {dataSource} = this.state;
  //   const clonedData = dataSource.filter(item => item.original_language == key);
  //   // const clonedData = _.orderBy(dataSource, ['vote_count'], ['desc']);
  //   console.log(clonedData);
  //   this.setState({filteredData: clonedData});
  // };

  setFilter = key => {
    const filterLanguage = key;
    this.setState({filterLanguage});
  };

  render() {
    return (
      <>
        <Header sortByKey={this.sortByKey} />
        <Movies
          loadMoreData={this.loadMoreData}
          isLoading={this.state.isLoading}
          dataSource={this.state.dataSource}
          moviesRender={this.state.moviesRender}
          fetching_from_server={this.state.fetching_from_server}
        />
      </>
    );
  }
}
